<template>
  <div class="home-container">
    <!-- 欢迎标题区域 -->
    <div class="welcome-section">
      <h1 class="welcome-title">智能语言，让教学更有温度</h1>
      <p class="welcome-subtitle">AI VoiceEduGen - 让每一次教学都充满温度与智慧</p>
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
              stroke="#409EFF"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />

            <!-- 数据1点 -->
            <circle cx="120" cy="140" r="4" fill="#409EFF" />
            <circle cx="200" cy="136" r="4" fill="#409EFF" />
            <circle cx="280" cy="128" r="4" fill="#409EFF" />
            <circle cx="360" cy="100" r="4" fill="#409EFF" />
            <circle cx="440" cy="114" r="4" fill="#409EFF" />
            <circle cx="520" cy="90" r="4" fill="#409EFF" />
            <circle cx="600" cy="94" r="4" fill="#409EFF" />
            <circle cx="680" cy="76" r="4" fill="#409EFF" />
            <circle cx="760" cy="84" r="4" fill="#409EFF" />

            <!-- 数据2线条 (完成率) -->
            <path
              d="M 120 80 L 200 84 L 280 94 L 360 114 L 440 88 L 520 100 L 600 96 L 680 120 L 760 114"
              fill="none"
              stroke="#67C23A"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />

            <!-- 数据2点 -->
            <circle cx="120" cy="80" r="4" fill="#67C23A" />
            <circle cx="200" cy="84" r="4" fill="#67C23A" />
            <circle cx="280" cy="94" r="4" fill="#67C23A" />
            <circle cx="360" cy="114" r="4" fill="#67C23A" />
            <circle cx="440" cy="88" r="4" fill="#67C23A" />
            <circle cx="520" cy="100" r="4" fill="#67C23A" />
            <circle cx="600" cy="96" r="4" fill="#67C23A" />
            <circle cx="680" cy="120" r="4" fill="#67C23A" />
            <circle cx="760" cy="114" r="4" fill="#67C23A" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Microphone, UserFilled, FolderOpened, TrendCharts, ArrowUp } from '@element-plus/icons-vue'
</script>

<style scoped lang="scss">
.home-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 24px;
  color: #333;
  animation: fadeIn 0.8s ease-in-out;
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

.welcome-section {
  text-align: center;
  margin-bottom: 40px;
  padding: 40px 0;

  .welcome-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: white;
    margin-bottom: 16px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .welcome-subtitle {
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 300;
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
    background: white;
    border-radius: 16px;
    padding: 32px 24px;
    text-align: center;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
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
      background: linear-gradient(90deg, #ff6b6b, #4ecdc4);
    }

    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
    }

    .card-icon {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;
      color: white;
    }

    h3 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 12px;
      color: #2c3e50;
    }

    p {
      color: #7f8c8d;
      line-height: 1.6;
      font-size: 0.95rem;
    }

    &.text-to-speech .card-icon {
      background: linear-gradient(135deg, #ff6b6b, #ee5a24);
    }

    &.voice-cloning .card-icon {
      background: linear-gradient(135deg, #feca57, #ff9ff3);
    }

    &.voice-library .card-icon {
      background: linear-gradient(135deg, #48dbfb, #0abde3);
    }

    &.learning-progress .card-icon {
      background: linear-gradient(135deg, #1dd1a1, #10ac84);
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
      color: white;
      margin-bottom: 8px;
    }

    p {
      color: rgba(255, 255, 255, 0.8);
      font-size: 1rem;
    }
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
  }

  .stat-card {
    background: white;
    border-radius: 12px;
    padding: 24px;
    text-align: center;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    animation: slideInUp 0.6s ease-out;

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

    &:hover {
      transform: translateY(-4px);
    }

    .stat-number {
      font-size: 2.5rem;
      font-weight: 700;
      color: #2c3e50;
      margin-bottom: 8px;
    }

    .stat-label {
      color: #7f8c8d;
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
        color: #27ae60;
      }

      &.negative {
        color: #e74c3c;
      }
    }
  }
}

.chart-section {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  animation: slideInUp 0.6s ease-out;
  animation-delay: 0.9s;
  animation-fill-mode: both;

  .chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;

    h2 {
      font-size: 1.5rem;
      font-weight: 600;
      color: #2c3e50;
    }

    .chart-legend {
      display: flex;
      gap: 20px;

      .legend-item {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.9rem;
        color: #7f8c8d;

        .legend-color {
          width: 12px;
          height: 12px;
          border-radius: 2px;

          &.data1 {
            background: #409eff;
          }

          &.data2 {
            background: #67c23a;
          }
        }
      }
    }
  }

  .chart-container {
    height: 300px;
    background: #f8f9fa;
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
