<template>
  <div class="voice-test-container">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1>AI语音生成测试</h1>
      <p>体验最新的AI语音合成技术，支持声音克隆、情感迁移等功能</p>
    </div>

    <div class="main-content">
      <!-- 左侧：主要功能区域 -->
      <div class="left-panel">
        <!-- 文本输入区域 -->
        <div class="input-section">
          <h3>文本输入</h3>
          <el-input
            v-model="inputText"
            type="textarea"
            :rows="4"
            placeholder="请输入要转换为语音的文本内容..."
            maxlength="500"
            show-word-limit
          />
          <div class="text-actions">
            <el-button type="primary" @click="generateVoice" :loading="isGenerating">
              <el-icon><Microphone /></el-icon>
              生成语音
            </el-button>
            <el-button @click="clearText">清空文本</el-button>
          </div>
        </div>

        <!-- 高级设置面板 -->
        <div class="advanced-settings">
          <el-collapse v-model="activeCollapse">
            <el-collapse-item title="高级设置" name="advanced">
              <div class="settings-grid">
                <!-- 声音选择 -->
                <div class="setting-item">
                  <label>声音选择</label>
                  <el-select v-model="selectedVoice" placeholder="选择声音">
                    <el-option label="默认女声" value="female_default" />
                    <el-option label="默认男声" value="male_default" />
                    <el-option label="儿童声音" value="child_voice" />
                    <el-option label="老年声音" value="elder_voice" />
                  </el-select>
                </div>

                <!-- 情感选择 -->
                <div class="setting-item">
                  <label>情感类型</label>
                  <el-select v-model="selectedEmotion" placeholder="选择情感">
                    <el-option label="中性" value="neutral" />
                    <el-option label="开心" value="happy" />
                    <el-option label="悲伤" value="sad" />
                    <el-option label="愤怒" value="angry" />
                    <el-option label="鼓励" value="encouraging" />
                    <el-option label="温柔" value="gentle" />
                  </el-select>
                </div>

                <!-- 语速调节 -->
                <div class="setting-item">
                  <label>语速调节</label>
                  <el-slider
                    v-model="speechRate"
                    :min="0.5"
                    :max="2.0"
                    :step="0.1"
                    show-input
                    :format-tooltip="(val: number) => `${val}x`"
                  />
                </div>

                <!-- 音调调节 -->
                <div class="setting-item">
                  <label>音调调节</label>
                  <el-slider
                    v-model="pitch"
                    :min="0.5"
                    :max="2.0"
                    :step="0.1"
                    show-input
                    :format-tooltip="(val: number) => `${val}x`"
                  />
                </div>

                <!-- 声音克隆上传 -->
                <div class="setting-item voice-clone">
                  <label>声音克隆样本</label>
                  <el-upload
                    class="voice-upload"
                    drag
                    action="#"
                    :auto-upload="false"
                    :on-change="handleVoiceUpload"
                    accept="audio/*"
                  >
                    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                    <div class="el-upload__text">拖拽音频文件到此处，或 <em>点击上传</em></div>
                    <template #tip>
                      <div class="el-upload__tip">支持 MP3、WAV、M4A 格式，时长建议 10-30 秒</div>
                    </template>
                  </el-upload>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>

        <!-- 生成过程展示 -->
        <div v-if="isGenerating || generationSteps.length > 0" class="generation-process">
          <h3>生成过程</h3>
          <div class="process-timeline">
            <div
              v-for="(step, index) in generationSteps"
              :key="index"
              class="process-step"
              :class="{
                active: step.status === 'active',
                completed: step.status === 'completed',
                error: step.status === 'error',
              }"
            >
              <div class="step-icon">
                <el-icon v-if="step.status === 'completed'"><CircleCheck /></el-icon>
                <el-icon v-else-if="step.status === 'active'"><Loading /></el-icon>
                <el-icon v-else-if="step.status === 'error'"><CircleClose /></el-icon>
                <el-icon v-else><CircleCheckFilled /></el-icon>
              </div>
              <div class="step-content">
                <div class="step-title">{{ step.title }}</div>
                <div class="step-description">{{ step.description }}</div>
                <div v-if="step.progress !== undefined" class="step-progress">
                  <el-progress
                    :percentage="step.progress"
                    :status="step.status === 'error' ? 'exception' : undefined"
                  />
                </div>
                <div v-if="step.details" class="step-details">
                  <small>{{ step.details }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧：结果展示区域 -->
      <div class="right-panel">
        <!-- 音频播放器 -->
        <div v-if="audioUrl" class="audio-player">
          <h3>生成结果</h3>
          <div class="audio-controls">
            <audio ref="audioPlayer" :src="audioUrl" controls></audio>
            <div class="audio-actions">
              <el-button @click="downloadAudio" type="success">
                <el-icon><Download /></el-icon>
                下载音频
              </el-button>
              <el-button @click="shareAudio" type="info">
                <el-icon><Share /></el-icon>
                分享
              </el-button>
            </div>
          </div>
        </div>

        <!-- 技术详情展示 -->
        <div v-if="generationResult" class="tech-details">
          <h3>技术详情</h3>
          <div class="tech-info">
            <div class="tech-item">
              <span class="label">使用模型：</span>
              <span class="value">{{ generationResult.model }}</span>
            </div>
            <div class="tech-item">
              <span class="label">处理时间：</span>
              <span class="value">{{ generationResult.processingTime }}秒</span>
            </div>
            <div class="tech-item">
              <span class="label">音频质量：</span>
              <span class="value">{{ generationResult.quality }}</span>
            </div>
            <div class="tech-item">
              <span class="label">情感分析：</span>
              <span class="value">{{ generationResult.emotionAnalysis }}</span>
            </div>
          </div>
        </div>

        <!-- 声谱图展示 -->
        <div v-if="spectrogramUrl" class="spectrogram">
          <h3>声谱图分析</h3>
          <div class="spectrogram-container">
            <img :src="spectrogramUrl" alt="声谱图" />
            <div class="spectrogram-info">
              <p>声谱图显示了音频的频率分布和时间变化</p>
            </div>
          </div>
        </div>

        <!-- 性能指标 -->
        <div class="performance-metrics">
          <h3>性能指标</h3>
          <div class="metrics-grid">
            <div class="metric-item">
              <div class="metric-value">{{ performanceMetrics.mosScore }}</div>
              <div class="metric-label">MOS评分</div>
            </div>
            <div class="metric-item">
              <div class="metric-value">{{ performanceMetrics.accuracy }}%</div>
              <div class="metric-label">准确率</div>
            </div>
            <div class="metric-item">
              <div class="metric-value">{{ performanceMetrics.latency }}ms</div>
              <div class="metric-label">延迟</div>
            </div>
            <div class="metric-item">
              <div class="metric-value">{{ performanceMetrics.throughput }}</div>
              <div class="metric-label">吞吐量</div>
            </div>
          </div>
        </div>

        <!-- 训练过程可视化 -->
        <div class="training-visualization">
          <h3>模型训练过程</h3>
          <div class="training-chart">
            <div class="chart-container">
              <canvas ref="trainingChart" width="400" height="200"></canvas>
            </div>
            <div class="training-stats">
              <div class="stat-item">
                <span>训练轮次：{{ trainingStats.epochs }}</span>
              </div>
              <div class="stat-item">
                <span>损失值：{{ trainingStats.loss }}</span>
              </div>
              <div class="stat-item">
                <span>准确率：{{ trainingStats.accuracy }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部：历史记录 -->
    <div class="history-section">
      <h3>生成历史</h3>
      <div class="history-list">
        <div
          v-for="(item, index) in generationHistory"
          :key="index"
          class="history-item"
          @click="loadHistoryItem(item)"
        >
          <div class="history-text">{{ item.text.substring(0, 50) }}...</div>
          <div class="history-meta">
            <span>{{ item.timestamp }}</span>
            <span>{{ item.duration }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  Microphone,
  UploadFilled,
  Download,
  Share,
  CircleCheck,
  Loading,
  CircleClose,
  CircleCheckFilled,
} from '@element-plus/icons-vue'
import { mockVoiceData, simulateGenerationProcess } from '@/mock/voiceData'

// 响应式数据
const inputText = ref('')
const isGenerating = ref(false)
const activeCollapse = ref(['advanced'])
const selectedVoice = ref('female_default')
const selectedEmotion = ref('neutral')
const speechRate = ref(1.0)
const pitch = ref(1.0)
const audioUrl = ref('')
const spectrogramUrl = ref('')
const audioPlayer = ref<HTMLAudioElement>()

// 定义步骤状态类型
type StepStatus = 'pending' | 'active' | 'completed' | 'error'

// 定义步骤类型
interface GenerationStep {
  title: string
  description: string
  status: StepStatus
  progress: number
  details: string
}

// 生成步骤
const generationSteps = ref<GenerationStep[]>([...mockVoiceData.generationSteps])

// 生成结果
const generationResult = ref({
  model: 'Tacotron2 + WaveNet',
  processingTime: 0,
  quality: '高质量',
  emotionAnalysis: '积极情绪，语调自然',
})

// 性能指标
const performanceMetrics = reactive({ ...mockVoiceData.performanceMetrics })

// 训练统计
const trainingStats = reactive({ ...mockVoiceData.trainingStats })

// 生成历史
const generationHistory = ref([...mockVoiceData.generationHistory])

// 方法
const generateVoice = async () => {
  if (!inputText.value.trim()) {
    ElMessage.warning('请输入要转换的文本内容')
    return
  }

  isGenerating.value = true
  audioUrl.value = ''
  spectrogramUrl.value = ''

  // 重置步骤状态
  generationSteps.value.forEach((step) => {
    step.status = 'pending'
    step.progress = 0
    step.details = ''
  })

  // 使用模拟生成过程
  await simulateGenerationProcess(generationSteps.value, (index, data) => {
    const step = generationSteps.value[index]
    if (data.status) step.status = data.status
    if (data.progress !== undefined) step.progress = data.progress
    if (data.details) step.details = data.details
    step.details = getStepDetails(index, data.progress || 0)
  })

  // 模拟生成完成
  await new Promise((resolve) => setTimeout(resolve, 500))

  // 设置生成结果
  generationResult.value.processingTime = Math.random() * 3 + 1
  audioUrl.value = '/mock-generated-audio.mp3' // 模拟音频URL
  spectrogramUrl.value = '/mock-spectrogram.png' // 模拟声谱图URL

  // 添加到历史记录
  generationHistory.value.unshift({
    id: `voice_${Date.now()}`,
    text: inputText.value,
    timestamp: new Date().toLocaleString(),
    duration: '00:12',
    audioUrl: audioUrl.value,
    voice: selectedVoice.value,
    emotion: selectedEmotion.value,
  })

  isGenerating.value = false
  ElMessage.success('语音生成完成！')
}

const getStepDetails = (stepIndex: number, progress: number) => {
  const details = {
    0: `文本长度: ${inputText.value.length} 字符`,
    1: `提取特征维度: ${Math.floor(progress * 0.8 + 20)}`,
    2: `模型推理进度: ${progress}%`,
    3: `情感强度: ${Math.floor(progress * 0.6 + 40)}%`,
    4: `音频质量: ${Math.floor(progress * 0.9 + 10)}%`,
  }
  return details[stepIndex as keyof typeof details] || ''
}

const clearText = () => {
  inputText.value = ''
}

const handleVoiceUpload = (file: any) => {
  ElMessage.success(`音频文件 "${file.name}" 上传成功`)
}

const downloadAudio = () => {
  if (audioUrl.value) {
    const link = document.createElement('a')
    link.href = audioUrl.value
    link.download = 'generated-audio.mp3'
    link.click()
    ElMessage.success('音频下载开始')
  }
}

const shareAudio = () => {
  ElMessageBox.alert('分享功能开发中...', '提示', {
    confirmButtonText: '确定',
  })
}

const loadHistoryItem = (item: any) => {
  inputText.value = item.text
  audioUrl.value = item.audioUrl
  ElMessage.info('已加载历史记录')
}

// 绘制训练图表
const trainingChart = ref<HTMLCanvasElement>()

onMounted(() => {
  nextTick(() => {
    if (trainingChart.value) {
      const ctx = trainingChart.value.getContext('2d')
      if (ctx) {
        // 绘制简单的训练损失曲线
        ctx.strokeStyle = '#409EFF'
        ctx.lineWidth = 2
        ctx.beginPath()

        for (let i = 0; i < 100; i++) {
          const x = (i / 100) * 400
          const y = 200 - Math.exp(-i / 20) * 150
          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }

        ctx.stroke()
      }
    }
  })
})
</script>
<style scoped lang="scss">
.voice-test-container {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
  background: #f5f7fa;
  min-height: 100vh;
}

.page-header {
  text-align: center;
  margin-bottom: 30px;

  h1 {
    color: #303133;
    margin-bottom: 10px;
    font-size: 28px;
  }

  p {
    color: #606266;
    font-size: 16px;
  }
}

.main-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 30px;
}

.left-panel,
.right-panel {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.input-section {
  margin-bottom: 20px;

  h3 {
    margin-bottom: 15px;
    color: #303133;
  }

  .text-actions {
    margin-top: 15px;
    display: flex;
    gap: 10px;
  }
}

.advanced-settings {
  margin-bottom: 20px;

  .settings-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .setting-item {
    label {
      display: block;
      margin-bottom: 8px;
      color: #606266;
      font-weight: 500;
    }

    &.voice-clone {
      grid-column: 1 / -1;
    }
  }

  .voice-upload {
    width: 100%;
  }
}

.generation-process {
  h3 {
    margin-bottom: 15px;
    color: #303133;
  }

  .process-timeline {
    .process-step {
      display: flex;
      align-items: flex-start;
      margin-bottom: 20px;
      padding: 15px;
      border-radius: 8px;
      background: #f8f9fa;
      transition: all 0.3s ease;

      &.active {
        background: #e6f7ff;
        border-left: 4px solid #1890ff;
      }

      &.completed {
        background: #f6ffed;
        border-left: 4px solid #52c41a;
      }

      &.error {
        background: #fff2f0;
        border-left: 4px solid #ff4d4f;
      }

      .step-icon {
        margin-right: 15px;
        margin-top: 2px;
        color: #909399;

        .el-icon {
          font-size: 20px;
        }
      }

      .step-content {
        flex: 1;

        .step-title {
          font-weight: 600;
          margin-bottom: 5px;
          color: #303133;
        }

        .step-description {
          color: #606266;
          margin-bottom: 10px;
        }

        .step-progress {
          margin-bottom: 8px;
        }

        .step-details {
          color: #909399;
          font-size: 12px;
        }
      }
    }
  }
}

.audio-player {
  margin-bottom: 20px;

  h3 {
    margin-bottom: 15px;
    color: #303133;
  }

  .audio-controls {
    audio {
      width: 100%;
      margin-bottom: 15px;
    }

    .audio-actions {
      display: flex;
      gap: 10px;
    }
  }
}

.tech-details {
  margin-bottom: 20px;

  h3 {
    margin-bottom: 15px;
    color: #303133;
  }

  .tech-info {
    .tech-item {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #f0f0f0;

      &:last-child {
        border-bottom: none;
      }

      .label {
        color: #606266;
        font-weight: 500;
      }

      .value {
        color: #303133;
      }
    }
  }
}

.spectrogram {
  margin-bottom: 20px;

  h3 {
    margin-bottom: 15px;
    color: #303133;
  }

  .spectrogram-container {
    img {
      width: 100%;
      border-radius: 4px;
      margin-bottom: 10px;
    }

    .spectrogram-info {
      color: #606266;
      font-size: 14px;
    }
  }
}

.performance-metrics {
  margin-bottom: 20px;

  h3 {
    margin-bottom: 15px;
    color: #303133;
  }

  .metrics-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;

    .metric-item {
      text-align: center;
      padding: 15px;
      background: #f8f9fa;
      border-radius: 6px;

      .metric-value {
        font-size: 24px;
        font-weight: bold;
        color: #1890ff;
        margin-bottom: 5px;
      }

      .metric-label {
        color: #606266;
        font-size: 12px;
      }
    }
  }
}

.training-visualization {
  h3 {
    margin-bottom: 15px;
    color: #303133;
  }

  .training-chart {
    .chart-container {
      margin-bottom: 15px;

      canvas {
        width: 100%;
        height: auto;
        border: 1px solid #e4e7ed;
        border-radius: 4px;
      }
    }

    .training-stats {
      display: flex;
      justify-content: space-around;

      .stat-item {
        text-align: center;
        color: #606266;
        font-size: 14px;
      }
    }
  }
}

.history-section {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);

  h3 {
    margin-bottom: 15px;
    color: #303133;
  }

  .history-list {
    .history-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px;
      border-bottom: 1px solid #f0f0f0;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background: #f5f7fa;
      }

      &:last-child {
        border-bottom: none;
      }

      .history-text {
        color: #303133;
        flex: 1;
      }

      .history-meta {
        color: #909399;
        font-size: 12px;
        display: flex;
        gap: 15px;
      }
    }
  }
}

// 响应式设计
@media (max-width: 1200px) {
  .main-content {
    grid-template-columns: 1fr;
  }

  .advanced-settings .settings-grid {
    grid-template-columns: 1fr;
  }

  .performance-metrics .metrics-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 768px) {
  .voice-test-container {
    padding: 10px;
  }

  .performance-metrics .metrics-grid {
    grid-template-columns: 1fr;
  }

  .training-visualization .training-stats {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
