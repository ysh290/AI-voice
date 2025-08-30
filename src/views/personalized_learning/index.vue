<template>
  <div class="pl-root">
    <!-- 顶部学生选择与统计 -->
    <div class="pl-stats">
      <el-select
        v-model="selectedStudent"
        placeholder="选择学生"
        class="student-select"
        @change="onStudentChange"
      >
        <el-option v-for="stu in students" :key="stu.id" :label="stu.name" :value="stu.id" />
      </el-select>
      <el-card class="stat-card" shadow="hover">
        <div class="stat-title">总学习时长</div>
        <div class="stat-value">
          <el-icon><Clock /></el-icon>{{ currentStudent.totalHours }} 小时
        </div>
      </el-card>
      <el-card class="stat-card" shadow="hover">
        <div class="stat-title">答题率</div>
        <div class="stat-value">
          <el-icon><EditPen /></el-icon>{{ currentStudent.answerRate }}%
        </div>
      </el-card>
      <el-card class="stat-card" shadow="hover">
        <div class="stat-title">正确率</div>
        <div class="stat-value">
          <el-icon><DataAnalysis /></el-icon>{{ currentStudent.accuracy }}%
        </div>
      </el-card>
    </div>
    <!-- 课程进度 -->
    <el-card class="pl-card" shadow="hover">
      <div class="pl-title">课程学习进度</div>
      <div class="course-progress">
        <div class="course-row" v-for="item in currentStudent.courses" :key="item.name">
          <div class="course-label">{{ item.name }}</div>
          <el-progress
            :percentage="item.progress"
            :color="getProgressColor(item.progress)"
            :show-text="true"
            :stroke-width="10"
            :striped="true"
            :striped-flow="true"
          />
        </div>
      </div>
    </el-card>
    <!-- 最近学习活动 -->
    <el-card class="pl-card" shadow="hover">
      <div class="pl-title">最近学习活动</div>
      <div class="activity-list">
        <transition-group name="list-fade" tag="div">
          <div class="activity-row" v-for="act in currentStudent.activities" :key="act.id">
            <div class="activity-main">
              <div class="activity-course">{{ act.course }} - {{ act.title }}</div>
              <div class="activity-meta">
                <span>{{ act.time }}</span>
                <span>{{ act.duration }}</span>
                <el-tag
                  :type="
                    act.status === '已完成'
                      ? 'success'
                      : act.status === '进行中'
                        ? 'info'
                        : 'warning'
                  "
                  >{{ act.status }}</el-tag
                >
              </div>
            </div>
          </div>
        </transition-group>
      </div>
    </el-card>
    <!-- 个性化语音参数推荐（核心功能） -->
    <el-card class="pl-card param-card core-card" shadow="hover">
      <div class="core-head">
        <div class="pl-title">智能语音参数推荐</div>
        <!-- <el-tag class="core-badge" type="danger" effect="dark"
          ><span class="pulse-dot"></span>核心功能</el-tag
        > -->
      </div>
      <div class="profile-form">
        <el-form :inline="false" label-width="94px" class="form-body">
          <div class="form-grid">
            <el-form-item label="性别">
              <el-radio-group v-model="profile.gender">
                <el-radio-button label="female">女</el-radio-button>
                <el-radio-button label="male">男</el-radio-button>
                <el-radio-button label="neutral">中性</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="年龄">
              <el-input-number v-model="profile.age" :min="3" :max="80" :step="1" />
            </el-form-item>
            <el-form-item label="认知水平">
              <el-select v-model="profile.cognition" placeholder="选择认知水平">
                <el-option label="基础" value="low" />
                <el-option label="一般" value="mid" />
                <el-option label="较高" value="high" />
              </el-select>
            </el-form-item>
            <el-form-item label="学习节奏">
              <el-select v-model="profile.pace" placeholder="选择学习节奏">
                <el-option label="慢节奏" value="slow" />
                <el-option label="适中" value="medium" />
                <el-option label="快节奏" value="fast" />
              </el-select>
            </el-form-item>
          </div>
          <div class="form-actions">
            <el-button
              type="primary"
              size="large"
              :loading="isGenerating"
              @click="generateRecommendations"
            >
              {{ isGenerating ? '生成中...' : '生成推荐' }}
            </el-button>
            <span class="hint">根据学习者画像生成更贴合的语音参数</span>
          </div>
        </el-form>
      </div>
      <el-divider />
      <div v-if="isGenerating" class="generating">
        <el-progress :percentage="genProgress" type="dashboard" :width="160" :stroke-width="10" />
        <div class="gen-text">正在为你计算个性化参数...</div>
      </div>
      <transition-group name="param-fade" tag="div" class="param-grid" v-else>
        <div v-for="(item, idx) in recommendParams" :key="item.label + idx" class="param-card-item">
          <div class="param-icon" :class="'t-' + item.type">
            <el-icon v-if="item.label.includes('语速')"><MagicStick /></el-icon>
            <el-icon v-else-if="item.label.includes('情感')"><EditPen /></el-icon>
            <el-icon v-else-if="item.label.includes('音色')"><Microphone /></el-icon>
            <el-icon v-else><DataAnalysis /></el-icon>
          </div>
          <div class="param-content">
            <div class="param-title">{{ item.label }}</div>
            <el-tag :type="item.type" effect="light">{{ item.value }}</el-tag>
          </div>
        </div>
      </transition-group>
      <transition name="fade">
        <div v-if="recommendDesc" class="recommend-desc">{{ recommendDesc }}</div>
      </transition>
    </el-card>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { Clock, DataAnalysis, EditPen, MagicStick, Microphone } from '@element-plus/icons-vue'
const students = [
  {
    id: 1,
    name: '张三',
    totalHours: 45,
    answerRate: 88,
    accuracy: 85,
    courses: [
      { name: '高等数学', progress: 75 },
      { name: '大学英语', progress: 60 },
      { name: '物理', progress: 45 },
      { name: '化学', progress: 30 },
    ],
    activities: [
      {
        id: 1,
        course: '高等数学',
        title: '函数与极限',
        time: '2024-03-15 14:30',
        duration: '45分钟',
        status: '已完成',
      },
      {
        id: 2,
        course: '大学英语',
        title: '单词发音练习',
        time: '2024-03-14 10:15',
        duration: '30分钟',
        status: '已完成',
      },
      {
        id: 3,
        course: '物理',
        title: '力学基础',
        time: '2024-03-13 16:20',
        duration: '60分钟',
        status: '进行中',
      },
    ],
  },
  {
    id: 2,
    name: '李四',
    totalHours: 32,
    answerRate: 72,
    accuracy: 65,
    courses: [
      { name: '高等数学', progress: 55 },
      { name: '大学英语', progress: 80 },
      { name: '物理', progress: 60 },
      { name: '化学', progress: 40 },
    ],
    activities: [
      {
        id: 1,
        course: '大学英语',
        title: '阅读理解',
        time: '2024-03-15 09:00',
        duration: '40分钟',
        status: '已完成',
      },
      {
        id: 2,
        course: '高等数学',
        title: '微积分',
        time: '2024-03-14 15:00',
        duration: '50分钟',
        status: '进行中',
      },
    ],
  },
]
const selectedStudent = ref(students[0].id)
const currentStudent = computed(() => students.find((s) => s.id === selectedStudent.value))
function getProgressColor(val) {
  if (val > 80) return 'linear-gradient(90deg,#67C23A,#409EFF)'
  if (val > 60) return '#409EFF'
  return '#E6A23C'
}
function onStudentChange() {
  // 可扩展：切换学生时动画或提示
}
// 学习者画像与个性化推荐
const profile = ref({ gender: 'female', age: 12, cognition: 'mid', pace: 'medium' })
const recommendParams = ref([])
const recommendDesc = ref('')
const isGenerating = ref(false)
const genProgress = ref(0)

function animateProgress(doneCb) {
  genProgress.value = 0
  const timer = setInterval(() => {
    genProgress.value += Math.floor(5 + Math.random() * 12)
    if (genProgress.value >= 100) {
      genProgress.value = 100
      clearInterval(timer)
      doneCb && doneCb()
    }
  }, 120)
}

function generateRecommendations() {
  if (isGenerating.value) return
  isGenerating.value = true
  animateProgress(() => {
    const g = profile.value.gender
    const age = Number(profile.value.age)
    const cog = profile.value.cognition
    const pace = profile.value.pace

    // 基础规则
    let speed = '适中'
    let emotion = '积极'
    let timbre = '自然'
    let pause = '正常停顿'

    if (age <= 8 || cog === 'low') {
      speed = '慢速'
      emotion = '亲切'
      timbre = '温和'
      pause = '较长停顿'
    } else if (age >= 16 && cog === 'high') {
      speed = '偏快'
      emotion = '中性'
      timbre = '标准'
      pause = '短停顿'
    }

    // 性别影响音色
    if (g === 'male') timbre = '稳重'
    if (g === 'female') timbre = '清亮'

    // 学习节奏偏好微调语速
    if (pace === 'slow') speed = '慢速'
    if (pace === 'fast') speed = speed === '慢速' ? '适中' : '偏快'

    recommendParams.value = [
      {
        label: '推荐语速',
        value: speed,
        type: speed === '慢速' ? 'warning' : speed === '偏快' ? 'primary' : 'success',
      },
      { label: '推荐情感', value: emotion, type: emotion === '中性' ? 'info' : 'success' },
      { label: '推荐音色', value: timbre, type: 'info' },
      { label: '停顿策略', value: pause, type: 'primary' },
    ]

    const cogText = cog === 'low' ? '基础' : cog === 'mid' ? '一般' : '较高'
    const paceText = pace === 'slow' ? '慢节奏' : pace === 'fast' ? '快节奏' : '适中节奏'
    const genderText = g === 'male' ? '男' : g === 'female' ? '女' : '中性'
    recommendDesc.value = `已根据性别（${genderText}）、年龄（${age}），认知水平（${cogText}）与学习节奏（${paceText}）生成个性化语音参数，旨在提高专注度与理解力。`

    isGenerating.value = false
  })
}
</script>
<style scoped lang="scss">
.pl-root {
  min-height: 100vh;
  background: var(--bg-color);
  padding: 20px 0 0 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  animation: fadeIn 0.7s;
}
.pl-stats {
  display: flex;
  gap: 24px;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 8px;
  align-items: center;
  .student-select {
    width: 140px;
    margin-right: 18px;
  }
  .stat-card {
    flex: 1;
    border-radius: 14px;
    box-shadow: 0 2px 12px rgba(75, 94, 122, 0.08);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 18px 28px;
    transition:
      box-shadow 0.3s,
      transform 0.3s;
    &:hover {
      box-shadow: 0 8px 32px #7bbdf933;
      transform: translateY(-2px) scale(1.03);
    }
    .stat-title {
      color: var(--sub-color);
      font-size: 1.05rem;
      margin-bottom: 8px;
    }
    .stat-value {
      font-size: 1.35rem;
      font-weight: 600;
      color: var(--main-color);
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }
}
.pl-card {
  background: var(--card-color);
  border-radius: 14px;
  box-shadow: 0 2px 12px rgba(75, 94, 122, 0.08);
  width: 100%;
  max-width: 1200px;
  margin-bottom: 0;
  .pl-title {
    font-size: 1.13rem;
    font-weight: 600;
    color: var(--main-color);
    margin-bottom: 18px;
    letter-spacing: 1px;
  }
}
.course-progress {
  display: flex;
  flex-wrap: wrap;
  gap: 24px 48px;
  .course-row {
    flex: 1 1 320px;
    min-width: 260px;
    margin-bottom: 12px;
    .course-label {
      font-size: 1.05rem;
      color: var(--main-color);
      margin-bottom: 4px;
      font-weight: 500;
    }
    .el-progress {
      transition: width 0.7s cubic-bezier(0.4, 2, 0.6, 1);
      background: linear-gradient(90deg, #f5f6fa 0%, #e9ecf3 100%);
    }
  }
}
.param-card {
  max-width: 100%;
  margin: 0 auto 24px auto;
  .pl-title {
    margin-bottom: 16px;
  }
  .core-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .core-badge {
    border-radius: 999px;
    padding: 4px 10px;
  }
  .profile-form {
    background: #f8fafc;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 12px;
  }
  .form-body {
    width: 100%;
  }
  .form-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(260px, 1fr));
    gap: 14px 24px;
  }
  .form-actions {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 8px;
    .hint {
      color: var(--sub-color);
      font-size: 0.92rem;
    }
  }
  .param-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    .param-item {
      display: flex;
      align-items: center;
      .param-label {
        color: var(--main-color);
        font-weight: 500;
        margin-right: 8px;
      }
    }
  }
  .recommend-desc {
    margin-top: 16px;
    color: #888;
    font-size: 0.98rem;
    animation: fadeIn 0.8s;
  }
}
/* 提升核心卡片视觉权重 */
.core-card {
  border: 2px solid #ecf5ff;
  box-shadow: 0 8px 28px rgba(64, 158, 255, 0.12);
}
.param-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(240px, 1fr));
  gap: 16px;
}
.param-card-item {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #ffffff;
  border: 1px solid #eef2f7;
  border-radius: 12px;
  padding: 12px 14px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}
.param-card-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(64, 158, 255, 0.12);
}
.param-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f1f5ff;
}
.param-icon.t-success {
  background: #f0f9eb;
}
.param-icon.t-primary {
  background: #ecf5ff;
}
.param-icon.t-info {
  background: #f4f4f5;
}
.param-icon.t-warning {
  background: #fdf6ec;
}
.param-title {
  font-weight: 600;
  color: var(--main-color);
  margin-bottom: 4px;
}
.generating {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px 0 6px 0;
}
.gen-text {
  color: var(--sub-color);
}
.core-badge .pulse-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  background: #f56c6c;
  border-radius: 50%;
  margin-right: 6px;
  box-shadow: 0 0 0 0 rgba(245, 108, 108, 0.6);
  animation: pulse 1.8s infinite;
}
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(245, 108, 108, 0.6);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(245, 108, 108, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(245, 108, 108, 0);
  }
}
.param-fade-enter-active,
.param-fade-leave-active {
  transition: all 0.35s ease;
}
.param-fade-enter-from,
.param-fade-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.98);
}
.activity-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  .activity-row {
    background: #f8fafc;
    border-radius: 8px;
    padding: 14px 18px;
    box-shadow: 0 1px 4px rgba(75, 94, 122, 0.04);
    display: flex;
    flex-direction: column;
    transition:
      box-shadow 0.3s,
      transform 0.3s;
    &:hover {
      box-shadow: 0 4px 16px #7bbdf933;
      transform: translateY(-2px) scale(1.02);
    }
    .activity-main {
      display: flex;
      flex-direction: column;
      gap: 6px;
      .activity-course {
        font-size: 1.08rem;
        color: var(--main-color);
        font-weight: 500;
      }
      .activity-meta {
        display: flex;
        gap: 18px;
        align-items: center;
        font-size: 0.98rem;
        color: var(--sub-color);
        .el-tag {
          font-size: 0.95rem;
          border-radius: 7px;
          padding: 2px 12px;
        }
      }
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.list-fade-enter-active,
.list-fade-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 2, 0.6, 1);
}
.list-fade-enter-from,
.list-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
