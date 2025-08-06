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
    <!-- 个性化语音参数推荐 -->
    <el-card class="pl-card param-card" shadow="hover">
      <div class="pl-title">智能语音参数推荐</div>
      <div class="param-list">
        <div v-for="(item, idx) in recommendParams" :key="idx" class="param-item">
          <span class="param-label">{{ item.label }}：</span>
          <el-tag :type="item.type">{{ item.value }}</el-tag>
        </div>
      </div>
      <transition name="fade">
        <div v-if="recommendDesc" class="recommend-desc">{{ recommendDesc }}</div>
      </transition>
    </el-card>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { Clock, DataAnalysis, EditPen } from '@element-plus/icons-vue'
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
const recommendParams = computed(() => {
  const stu = currentStudent.value
  // 简单规则：高正确率推荐正常语速和中性音色，低答题率推荐慢速和轻松情感
  if (stu.accuracy > 80 && stu.answerRate > 80) {
    return [
      { label: '推荐语速', value: '正常', type: 'success' },
      { label: '推荐情感', value: '中性', type: 'primary' },
      { label: '推荐音色', value: '标准', type: 'info' },
    ]
  } else if (stu.answerRate < 70) {
    return [
      { label: '推荐语速', value: '慢速', type: 'warning' },
      { label: '推荐情感', value: '轻松', type: 'info' },
      { label: '推荐音色', value: '温和', type: 'success' },
    ]
  } else {
    return [
      { label: '推荐语速', value: '适中', type: 'primary' },
      { label: '推荐情感', value: '积极', type: 'success' },
      { label: '推荐音色', value: '自然', type: 'info' },
    ]
  }
})
const recommendDesc = computed(() => {
  const stu = currentStudent.value
  if (stu.accuracy > 80 && stu.answerRate > 80) return '学习表现优异，建议保持当前语音参数。'
  if (stu.answerRate < 70) return '答题率偏低，建议语速放慢、情感轻松，音色温和以减轻学习压力。'
  return '建议适中语速，积极情感，自然音色，助力持续进步。'
})
</script>
<style scoped lang="scss">
.pl-root {
  min-height: 100vh;
  background: var(--bg-color);
  padding: 40px 0 0 0;
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
