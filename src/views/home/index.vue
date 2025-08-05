<template>
  <div class="home-container">
    <!-- 欢迎标题区域 -->
    <div class="welcome-section">
      <h1 class="welcome-title">智能语言，让教学更有温度</h1>
      <p class="welcome-subtitle">AI Voice - 让每一次教学都充满温度与智慧</p>
    </div>

    <!-- 功能卡片区域 -->
    <div class="features-section">
      <div class="features-grid">
        <div class="feature-card text-to-speech">
          <div class="card-icon">
            <el-icon size="32">
              <Microphone />
            </el-icon>
          </div>
          <h3>文本转语音</h3>
          <p>将教学文本快速转换为自然流畅的语言，让知识传递更加生动高效</p>
        </div>

        <div class="feature-card voice-cloning">
          <div class="card-icon">
            <el-icon size="32">
              <UserFilled />
            </el-icon>
          </div>
          <h3>声音克隆</h3>
          <p>模仿教师声音生成个性化教学语言，增强学生的学习兴趣和代入感</p>
        </div>

        <div class="feature-card voice-library">
          <div class="card-icon">
            <el-icon size="32">
              <FolderOpened />
            </el-icon>
          </div>
          <h3>语音库管理</h3>
          <p>方便用户管理、分类、收藏和分享生成的教学语言资源</p>
        </div>

        <!-- <div class="feature-card learning-progress">
          <div class="card-icon">
            <el-icon size="32">
              <TrendCharts />
            </el-icon>
          </div>
          <h3>学习进度</h3>
          <p>快速查看总学习时长、知识点掌握率、各科目学习进度条，及最近学习活动</p>
        </div> -->
      </div>
    </div>

    <!-- 数据统计区域 -->
    <div class="stats-section">
      <div class="stats-header">
        <h2>学习数据分析</h2>
        <p>实时监控学习效果，助力教学优化</p>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-number">1,234</div>
          <div class="stat-label">总学习时长(小时)</div>
          <div class="stat-trend positive">
            <el-icon><ArrowUp /></el-icon>
            <span>+12.5%</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-number">85.6%</div>
          <div class="stat-label">知识点掌握率</div>
          <div class="stat-trend positive">
            <el-icon><ArrowUp /></el-icon>
            <span>+8.3%</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-number">156</div>
          <div class="stat-label">生成语音数量</div>
          <div class="stat-trend positive">
            <el-icon><ArrowUp /></el-icon>
            <span>+23.1%</span>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-number">89%</div>
          <div class="stat-label">用户满意度</div>
          <div class="stat-trend positive">
            <el-icon><ArrowUp /></el-icon>
            <span>+5.2%</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 实时波形图区域 -->
    <div class="waveform-section">
      <div class="waveform-header">
        <h2>实时语音特征波形</h2>
        <div class="waveform-legend">
          <span class="legend speed">语速</span>
          <span class="legend pitch">语调</span>
          <span class="legend emotion">情感强度</span>
        </div>
      </div>
      <div class="waveform-card">
        <svg class="waveform-svg" width="100%" height="120" viewBox="0 0 600 120">
          <!-- 语速曲线 -->
          <polyline :points="speedPoints" fill="none" stroke="#409EFF" stroke-width="3" />
          <!-- 语调曲线 -->
          <polyline :points="pitchPoints" fill="none" stroke="#67C23A" stroke-width="3" />
          <!-- 情感强度曲线 -->
          <polyline :points="emotionPoints" fill="none" stroke="#F56C6C" stroke-width="3" />
        </svg>
      </div>
    </div>

    <!-- 图表区域 -->
    <div class="chart-section">
      <div class="chart-header">
        <h2>月度学习趋势</h2>
        <div class="chart-legend">
          <div class="legend-item">
            <div class="legend-color data1"></div>
            <span>学习时长</span>
          </div>
          <div class="legend-item">
            <div class="legend-color data2"></div>
            <span>完成率</span>
          </div>
        </div>
      </div>

      <div class="chart-container">
        <div class="simple-chart">
          <svg width="100%" height="280" viewBox="0 0 800 280">
            <!-- 网格线 -->
            <defs>
              <pattern id="grid" width="80" height="40" patternUnits="userSpaceOnUse">
                <path d="M 80 0 L 0 0 0 40" fill="none" stroke="#e9ecef" stroke-width="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            <!-- Y轴标签 -->
            <text x="30" y="20" fill="#6c757d" font-size="12">100%</text>
            <text x="30" y="60" fill="#6c757d" font-size="12">80%</text>
            <text x="30" y="100" fill="#6c757d" font-size="12">60%</text>
            <text x="30" y="140" fill="#6c757d" font-size="12">40%</text>
            <text x="30" y="180" fill="#6c757d" font-size="12">20%</text>
            <text x="30" y="220" fill="#6c757d" font-size="12">0%</text>

            <!-- X轴标签 -->
            <text x="120" y="260" fill="#6c757d" font-size="12">1月</text>
            <text x="200" y="260" fill="#6c757d" font-size="12">2月</text>
            <text x="280" y="260" fill="#6c757d" font-size="12">3月</text>
            <text x="360" y="260" fill="#6c757d" font-size="12">4月</text>
            <text x="440" y="260" fill="#6c757d" font-size="12">5月</text>
            <text x="520" y="260" fill="#6c757d" font-size="12">6月</text>
            <text x="600" y="260" fill="#6c757d" font-size="12">7月</text>
            <text x="680" y="260" fill="#6c757d" font-size="12">8月</text>
            <text x="760" y="260" fill="#6c757d" font-size="12">9月</text>

            <!-- 数据1线条 (学习时长) -->
            <path
              d="M 120 140 L 200 136 L 280 128 L 360 100 L 440 114 L 520 90 L 600 94 L 680 76 L 760 84"
              fill="none"
              stroke="#FF6B6B"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />

            <!-- 数据1点 -->
            <circle cx="120" cy="140" r="4" fill="#FF6B6B" />
            <circle cx="200" cy="136" r="4" fill="#FF6B6B" />
            <circle cx="280" cy="128" r="4" fill="#FF6B6B" />
            <circle cx="360" cy="100" r="4" fill="#FF6B6B" />
            <circle cx="440" cy="114" r="4" fill="#FF6B6B" />
            <circle cx="520" cy="90" r="4" fill="#FF6B6B" />
            <circle cx="600" cy="94" r="4" fill="#FF6B6B" />
            <circle cx="680" cy="76" r="4" fill="#FF6B6B" />
            <circle cx="760" cy="84" r="4" fill="#FF6B6B" />

            <!-- 数据2线条 (完成率) -->
            <path
              d="M 120 80 L 200 84 L 280 94 L 360 114 L 440 88 L 520 100 L 600 96 L 680 120 L 760 114"
              fill="none"
              stroke="#48CAE4"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />

            <!-- 数据2点 -->
            <circle cx="120" cy="80" r="4" fill="#48CAE4" />
            <circle cx="200" cy="84" r="4" fill="#48CAE4" />
            <circle cx="280" cy="94" r="4" fill="#48CAE4" />
            <circle cx="360" cy="114" r="4" fill="#48CAE4" />
            <circle cx="440" cy="88" r="4" fill="#48CAE4" />
            <circle cx="520" cy="100" r="4" fill="#48CAE4" />
            <circle cx="600" cy="96" r="4" fill="#48CAE4" />
            <circle cx="680" cy="120" r="4" fill="#48CAE4" />
            <circle cx="760" cy="114" r="4" fill="#48CAE4" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Microphone, UserFilled, FolderOpened, TrendCharts, ArrowUp } from '@element-plus/icons-vue'
import { ref, onMounted, onUnmounted } from 'vue'

// 波形数据
const speedPoints = ref('')
const pitchPoints = ref('')
const emotionPoints = ref('')
let t = 0
let timer = null

function genWaveData() {
  const N = 60
  let speed = []
  let pitch = []
  let emotion = []
  for (let i = 0; i < N; i++) {
    const x = i * 10
    speed.push(`${x},${60 + 30 * Math.sin((t + i) * 0.18)}`)
    pitch.push(`${x},${60 + 30 * Math.sin((t + i) * 0.18 + 1.5)}`)
    emotion.push(`${x},${60 + 30 * Math.sin((t + i) * 0.18 + 3)}`)
  }
  speedPoints.value = speed.join(' ')
  pitchPoints.value = pitch.join(' ')
  emotionPoints.value = emotion.join(' ')
  t++
}
onMounted(() => {
  genWaveData()
  timer = setInterval(genWaveData, 80)
})
onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style scoped lang="scss">
:root {
  --main-color: #4b5e7a;
  --sub-color: #6c6f93;
  --bg-color: #f5f6fa;
  --card-color: #fff;
  --btn-color: #4b5e7a;
  --hover-bg: #e9ecf3;
  --active-bg: #d6dbe9;
  --gradient-main: linear-gradient(90deg, #4b5e7a 0%, #6c6f93 100%);
  --gradient-orange: linear-gradient(135deg, #ff6b6b 0%, #ffa07a 100%);
  --gradient-pink: linear-gradient(135deg, #ff69b4 0%, #ffb6c1 100%);
  --gradient-cyan: linear-gradient(135deg, #48cae4 0%, #90e0ef 100%);
  --gradient-purple: linear-gradient(135deg, #9b59b6 0%, #e8d5ff 100%);
}
.layout_main,
.home-container {
  min-height: 100vh;
  background: var(--bg-color);
  padding: 24px;
  overflow: auto;
}

.welcome-section {
  text-align: center;
  margin-bottom: 40px;
  padding: 40px 24px;
  background: var(--gradient-main);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(75, 94, 122, 0.15);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    animation: float 6s ease-in-out infinite;
  }

  .welcome-title {
    font-size: 2.5rem;
    font-weight: 700;
    // color: #fff;
    margin-bottom: 16px;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    position: relative;
    z-index: 1;
  }
  .welcome-subtitle {
    font-size: 1.1rem;
    // color: rgba(255, 255, 255, 0.9);
    font-weight: 300;
    position: relative;
    z-index: 1;
  }
}

.features-section {
  margin-bottom: 40px;
  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 24px;
    margin-bottom: 32px;
  }
  .feature-card {
    background: var(--card-color);
    border-radius: 12px;
    padding: 32px 24px;
    text-align: center;
    box-shadow: 0 4px 20px rgba(75, 94, 122, 0.08);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    animation: slideInUp 0.6s ease-out;

    &:nth-child(1) {
      animation-delay: 0.1s;
    }
    &:nth-child(2) {
      animation-delay: 0.2s;
    }
    &:nth-child(3) {
      animation-delay: 0.3s;
    }
    &:nth-child(4) {
      animation-delay: 0.4s;
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
    }

    &.text-to-speech::before {
      background: var(--gradient-orange);
    }
    &.voice-cloning::before {
      background: var(--gradient-pink);
    }
    &.voice-library::before {
      background: var(--gradient-cyan);
    }
    &.learning-progress::before {
      background: var(--gradient-purple);
    }

    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 8px 32px rgba(75, 94, 122, 0.12);
    }

    .card-icon {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;
      // color: #fff;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        border-radius: 50%;
        background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3), transparent);
        animation: rotate 3s linear infinite;
      }
    }

    h3 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 12px;
      color: var(--main-color);
    }
    p {
      color: var(--sub-color);
      line-height: 1.6;
      font-size: 0.95rem;
    }

    &.text-to-speech .card-icon {
      background: var(--gradient-orange);
    }
    &.voice-cloning .card-icon {
      background: var(--gradient-pink);
    }
    &.voice-library .card-icon {
      background: var(--gradient-cyan);
    }
    &.learning-progress .card-icon {
      background: var(--gradient-purple);
    }
  }
}

.stats-section {
  margin-bottom: 40px;
  .stats-header {
    text-align: center;
    margin-bottom: 32px;
    h2 {
      font-size: 2rem;
      font-weight: 600;
      color: var(--main-color);
      margin-bottom: 8px;
    }
    p {
      color: var(--sub-color);
      font-size: 1rem;
    }
  }
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
  }
  .stat-card {
    background: var(--card-color);
    border-radius: 10px;
    padding: 24px;
    text-align: center;
    box-shadow: 0 2px 12px rgba(75, 94, 122, 0.08);
    transition: transform 0.3s ease;
    animation: slideInUp 0.6s ease-out;
    position: relative;
    overflow: hidden;

    &:nth-child(1) {
      animation-delay: 0.5s;
    }
    &:nth-child(2) {
      animation-delay: 0.6s;
    }
    &:nth-child(3) {
      animation-delay: 0.7s;
    }
    &:nth-child(4) {
      animation-delay: 0.8s;
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
    }

    &:nth-child(1)::before {
      background: var(--gradient-orange);
    }
    &:nth-child(2)::before {
      background: var(--gradient-cyan);
    }
    &:nth-child(3)::before {
      background: var(--gradient-pink);
    }
    &:nth-child(4)::before {
      background: var(--gradient-purple);
    }

    &:hover {
      transform: translateY(-4px);
    }

    .stat-number {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 8px;
    }

    &:nth-child(1) .stat-number {
      color: #ff6b6b;
    }
    &:nth-child(2) .stat-number {
      color: #48cae4;
    }
    &:nth-child(3) .stat-number {
      color: #ff69b4;
    }
    &:nth-child(4) .stat-number {
      color: #9b59b6;
    }

    .stat-label {
      color: var(--sub-color);
      font-size: 0.9rem;
      margin-bottom: 12px;
    }
    .stat-trend {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      font-size: 0.85rem;
      font-weight: 500;
      &.positive {
        color: #4b5e7a;
      }
      &.negative {
        color: #f56c6c;
      }
    }
  }
}

.waveform-section {
  background: var(--card-color);
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(75, 94, 122, 0.08);
  margin-bottom: 40px;
  padding: 32px 24px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--gradient-cyan);
  }

  .waveform-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 18px;
    h2 {
      font-size: 1.3rem;
      font-weight: 600;
      color: var(--main-color);
    }
    .waveform-legend {
      display: flex;
      gap: 18px;
      .legend {
        font-size: 0.95rem;
        font-weight: 500;
        &.speed {
          color: #ff6b6b;
        }
        &.pitch {
          color: #48cae4;
        }
        &.emotion {
          color: #ff69b4;
        }
      }
    }
  }
  .waveform-card {
    background: var(--bg-color);
    border-radius: 8px;
    padding: 12px 0;
    border: 1px solid #e9ecef;
    .waveform-svg {
      width: 100%;
      height: 120px;
      display: block;
    }
  }
}

.chart-section {
  background: var(--card-color);
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(75, 94, 122, 0.08);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--gradient-purple);
  }

  .chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
    h2 {
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--main-color);
    }
    .chart-legend {
      display: flex;
      gap: 20px;
      .legend-item {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.9rem;
        color: var(--sub-color);
        .legend-color {
          width: 12px;
          height: 12px;
          border-radius: 2px;
          &.data1 {
            background: #ff6b6b;
          }
          &.data2 {
            background: #48cae4;
          }
        }
      }
    }
  }
  .chart-container {
    height: 300px;
    background: var(--bg-color);
    border-radius: 8px;
    padding: 20px;
    border: 1px solid #e9ecef;
    .simple-chart {
      width: 100%;
      height: 100%;
      svg {
        width: 100%;
        height: 100%;
      }
    }
  }
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

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .home-container {
    padding: 16px;
  }
  .welcome-title {
    font-size: 2rem !important;
  }
  .features-grid {
    grid-template-columns: 1fr !important;
  }
  .stats-grid {
    grid-template-columns: repeat(2, 1fr) !important;
  }
  .chart-header {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start !important;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr !important;
  }
}
</style>
