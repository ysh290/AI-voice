import request from '@/utils/request'

// 语音生成接口
export interface VoiceGenerationParams {
  text: string
  voice?: string
  emotion?: string
  speechRate?: number
  pitch?: number
  voiceCloneFile?: File
}

export interface VoiceGenerationResult {
  id: string
  audioUrl: string
  spectrogramUrl?: string
  processingTime: number
  model: string
  quality: string
  emotionAnalysis: string
  metadata: {
    textLength: number
    featureDimensions: number
    emotionIntensity: number
    audioQuality: number
  }
}

// 生成语音
export const generateVoice = (params: VoiceGenerationParams): Promise<VoiceGenerationResult> => {
  const formData = new FormData()
  formData.append('text', params.text)
  formData.append('voice', params.voice || 'female_default')
  formData.append('emotion', params.emotion || 'neutral')
  formData.append('speechRate', params.speechRate?.toString() || '1.0')
  formData.append('pitch', params.pitch?.toString() || '1.0')
  
  if (params.voiceCloneFile) {
    formData.append('voiceCloneFile', params.voiceCloneFile)
  }

  return request({
    url: '/api/voice/generate',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 获取生成进度
export const getGenerationProgress = (id: string): Promise<{
  status: 'pending' | 'processing' | 'completed' | 'error'
  progress: number
  currentStep: string
  details: string
}> => {
  return request({
    url: `/api/voice/progress/${id}`,
    method: 'get'
  })
}

// 获取生成历史
export interface GenerationHistoryItem {
  id: string
  text: string
  timestamp: string
  duration: string
  audioUrl: string
  voice: string
  emotion: string
}

export const getGenerationHistory = (): Promise<GenerationHistoryItem[]> => {
  return request({
    url: '/api/voice/history',
    method: 'get'
  })
}

// 删除历史记录
export const deleteHistoryItem = (id: string): Promise<void> => {
  return request({
    url: `/api/voice/history/${id}`,
    method: 'delete'
  })
}

// 获取性能指标
export interface PerformanceMetrics {
  mosScore: string
  accuracy: string
  latency: string
  throughput: string
}

export const getPerformanceMetrics = (): Promise<PerformanceMetrics> => {
  return request({
    url: '/api/voice/metrics',
    method: 'get'
  })
}

// 获取训练统计
export interface TrainingStats {
  epochs: number
  loss: string
  accuracy: string
  trainingTime: string
  modelVersion: string
}

export const getTrainingStats = (): Promise<TrainingStats> => {
  return request({
    url: '/api/voice/training-stats',
    method: 'get'
  })
}

// 下载音频文件
export const downloadAudio = (id: string, filename?: string): Promise<Blob> => {
  return request({
    url: `/api/voice/download/${id}`,
    method: 'get',
    responseType: 'blob'
  }).then((response: any) => {
    // 创建下载链接
    const url = window.URL.createObjectURL(response)
    const link = document.createElement('a')
    link.href = url
    link.download = filename || `voice-${id}.mp3`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
    return response
  })
}

// 分享音频
export interface ShareParams {
  id: string
  platform: 'wechat' | 'qq' | 'weibo' | 'link'
  title?: string
  description?: string
}

export const shareAudio = (params: ShareParams): Promise<{ shareUrl: string }> => {
  return request({
    url: '/api/voice/share',
    method: 'post',
    data: params
  })
}
