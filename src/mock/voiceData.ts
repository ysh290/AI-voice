// 模拟语音生成数据
export const mockVoiceData = {
  // 生成步骤配置
  generationSteps: [
    {
      title: '文本预处理',
      description: '正在分析文本内容和结构...',
      status: 'pending' as 'pending' | 'active' | 'completed' | 'error',
      progress: 0,
      details: ''
    },
    {
      title: '特征提取',
      description: '正在提取语音特征和韵律信息...',
      status: 'pending' as 'pending' | 'active' | 'completed' | 'error',
      progress: 0,
      details: ''
    },
    {
      title: '模型推理',
      description: '正在使用Tacotron2生成声学特征...',
      status: 'pending' as 'pending' | 'active' | 'completed' | 'error',
      progress: 0,
      details: ''
    },
    {
      title: '情感迁移',
      description: '正在应用情感迁移技术...',
      status: 'pending' as 'pending' | 'active' | 'completed' | 'error',
      progress: 0,
      details: ''
    },
    {
      title: '音频合成',
      description: '正在合成最终音频文件...',
      status: 'pending' as 'pending' | 'active' | 'completed' | 'error',
      progress: 0,
      details: ''
    }
  ],

  // 性能指标
  performanceMetrics: {
    mosScore: '4.2/5.0',
    accuracy: '95.8',
    latency: '1200',
    throughput: '10 req/s'
  },

  // 训练统计
  trainingStats: {
    epochs: 1000,
    loss: '0.0234',
    accuracy: '96.7',
    trainingTime: '72小时',
    modelVersion: 'v2.1.0'
  },

  // 生成历史
  generationHistory: [
    {
      id: '1',
      text: '欢迎使用AI语音生成系统，这是一个功能强大的语音合成平台。',
      timestamp: '2024-01-15 14:30',
      duration: '00:15',
      audioUrl: '/mock-audio-1.mp3',
      voice: 'female_default',
      emotion: 'neutral'
    },
    {
      id: '2',
      text: '今天天气真不错，适合出去走走。',
      timestamp: '2024-01-15 14:25',
      duration: '00:08',
      audioUrl: '/mock-audio-2.mp3',
      voice: 'male_default',
      emotion: 'happy'
    },
    {
      id: '3',
      text: '学习是一个持续的过程，需要我们保持耐心和毅力。',
      timestamp: '2024-01-15 14:20',
      duration: '00:12',
      audioUrl: '/mock-audio-3.mp3',
      voice: 'female_default',
      emotion: 'encouraging'
    }
  ],

  // 声音选项
  voiceOptions: [
    { label: '默认女声', value: 'female_default', description: '清晰自然的女性声音' },
    { label: '默认男声', value: 'male_default', description: '浑厚有力的男性声音' },
    { label: '儿童声音', value: 'child_voice', description: '活泼可爱的儿童声音' },
    { label: '老年声音', value: 'elder_voice', description: '慈祥温和的老年声音' },
    { label: '新闻播报', value: 'news_anchor', description: '专业标准的播报声音' },
    { label: '故事讲述', value: 'storyteller', description: '富有感染力的讲述声音' }
  ],

  // 情感选项
  emotionOptions: [
    { label: '中性', value: 'neutral', description: '平静自然的语调' },
    { label: '开心', value: 'happy', description: '愉悦欢快的语调' },
    { label: '悲伤', value: 'sad', description: '低沉忧郁的语调' },
    { label: '愤怒', value: 'angry', description: '激烈激动的语调' },
    { label: '鼓励', value: 'encouraging', description: '温暖激励的语调' },
    { label: '温柔', value: 'gentle', description: '柔和细腻的语调' },
    { label: '严肃', value: 'serious', description: '庄重正式的语调' },
    { label: '幽默', value: 'humorous', description: '轻松幽默的语调' }
  ],

  // 技术详情模板
  techDetails: {
    model: 'Tacotron2 + WaveNet',
    processingTime: 0,
    quality: '高质量',
    emotionAnalysis: '积极情绪，语调自然'
  },

  // 生成结果模板
  generationResult: {
    id: '',
    audioUrl: '',
    spectrogramUrl: '/mock-spectrogram.png',
    processingTime: 0,
    model: 'Tacotron2 + WaveNet',
    quality: '高质量',
    emotionAnalysis: '积极情绪，语调自然',
    metadata: {
      textLength: 0,
      featureDimensions: 0,
      emotionIntensity: 0,
      audioQuality: 0
    }
  }
}

// 模拟API响应
export const mockApiResponses = {
  // 生成语音响应
  generateVoice: (params: any) => ({
    id: `voice_${Date.now()}`,
    audioUrl: '/mock-generated-audio.mp3',
    spectrogramUrl: '/mock-spectrogram.png',
    processingTime: Math.random() * 3 + 1,
    model: 'Tacotron2 + WaveNet',
    quality: '高质量',
    emotionAnalysis: '积极情绪，语调自然',
    metadata: {
      textLength: params.text.length,
      featureDimensions: Math.floor(Math.random() * 100) + 50,
      emotionIntensity: Math.floor(Math.random() * 100),
      audioQuality: Math.floor(Math.random() * 20) + 80
    }
  }),

  // 获取进度响应
  getProgress: (id: string) => ({
    status: 'processing',
    progress: Math.floor(Math.random() * 100),
    currentStep: '模型推理',
    details: '正在使用Tacotron2生成声学特征...'
  }),

  // 获取历史响应
  getHistory: () => mockVoiceData.generationHistory,

  // 获取性能指标响应
  getMetrics: () => mockVoiceData.performanceMetrics,

  // 获取训练统计响应
  getTrainingStats: () => mockVoiceData.trainingStats
}

// 模拟延迟
export const mockDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// 定义步骤更新数据类型
interface StepUpdateData {
  status?: 'pending' | 'active' | 'completed' | 'error'
  progress?: number
  details?: string
}

// 模拟生成过程
export const simulateGenerationProcess = async (
  steps: any[], 
  updateStep: (index: number, data: StepUpdateData) => void
) => {
  for (let i = 0; i < steps.length; i++) {
    // 激活当前步骤
    updateStep(i, { status: 'active', progress: 0 })
    
    // 模拟进度更新
    for (let progress = 0; progress <= 100; progress += 10) {
      updateStep(i, { progress })
      await mockDelay(100)
    }
    
    // 完成当前步骤
    updateStep(i, { status: 'completed', progress: 100 })
    
    // 步骤间延迟
    if (i < steps.length - 1) {
      await mockDelay(200)
    }
  }
}
