<template>
  <div class="voice-create-wrapper">
    <div class="voice-create-main">
      <!-- 左侧文本输入区 -->
      <div class="input-panel">
        <div class="input-tip">在此开始输入或粘贴您希望转换成语音的任何文本...</div>
        <el-input
          v-model="inputText"
          type="textarea"
          :rows="14"
          placeholder=""
          class="main-input"
        />
        <div class="credit-info">
          <span>{{ inputText.length }} / 5,000 characters</span>
          <span class="credit">9,864 credits remaining</span>
        </div>
      </div>
      <!-- 右侧参数设置区 -->
      <div class="settings-panel">
        <div class="settings-group">
          <div class="settings-label">Voice</div>
          <el-select v-model="voice" class="voice-select">
            <el-option label="Chris" value="Chris" />
            <el-option label="Emma" value="Emma" />
            <el-option label="Alex" value="Alex" />
          </el-select>
        </div>
        <div class="settings-group">
          <div class="settings-label">Model</div>
          <el-radio-group v-model="model" class="model-radio">
            <el-radio-button label="v2">Eleven Multilingual v2</el-radio-button>
            <el-radio-button label="v3">Eleven v3 (alpha)</el-radio-button>
          </el-radio-group>
          <div class="model-gradient-bar">
            <div class="bar"></div>
            <span class="bar-label">The most expressive Text to Speech</span>
            <el-button v-if="model === 'v2'" class="try-v3-btn" size="small" @click="model = 'v3'"
              >Try v3 (alpha)</el-button
            >
          </div>
        </div>
        <div class="settings-group">
          <div class="slider-row">
            <span>语速</span>
            <el-slider
              v-model="speed"
              :min="0.5"
              :max="2"
              :step="0.01"
              style="flex: 1; margin: 0 12px"
            />
            <span>{{ speed }}</span>
          </div>
          <div class="slider-row">
            <span>稳定性</span>
            <el-slider
              v-model="stability"
              :min="0"
              :max="1"
              :step="0.01"
              style="flex: 1; margin: 0 12px"
            />
            <span>{{ stability }}</span>
          </div>
          <div class="slider-row">
            <span>相似度</span>
            <el-slider
              v-model="similarity"
              :min="0"
              :max="1"
              :step="0.01"
              style="flex: 1; margin: 0 12px"
            />
            <span>{{ similarity }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部操作栏 -->
    <div class="bottom-bar">
      <el-button type="primary" class="generate-btn" :disabled="!inputText" @click="onGenerate">
        Generate speech
      </el-button>
    </div>
    <transition name="fade">
      <div v-if="audioUrl" class="audio-player-bar">
        <div class="audio-info">
          <span class="audio-title">Why don't skeletons fight each other?... ...</span>
          <span class="audio-voice">Chris · Created 现在</span>
        </div>
        <audio :src="audioUrl" controls style="width: 320px; vertical-align: middle" />
        <el-button icon="el-icon-share" circle size="small" class="audio-btn" />
        <el-button icon="el-icon-download" circle size="small" class="audio-btn" />
      </div>
    </transition>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const inputText = ref('')
const voice = ref('Chris')
const model = ref('v2')
const speed = ref(1)
const stability = ref(0.5)
const similarity = ref(0.8)
const audioUrl = ref('')
function onGenerate() {
  audioUrl.value = ''
  setTimeout(() => {
    audioUrl.value = 'https://www.w3schools.com/html/horse.mp3'
  }, 1200)
}
</script>
<style scoped lang="scss">
.voice-create-wrapper {
  min-height: 100vh;
  background: var(--bg-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0 0 0;
  animation: fadeIn 0.7s;
}
.voice-create-main {
  display: flex;
  background: var(--card-color);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(75, 94, 122, 0.13);
  padding: 36px 32px 32px 32px;
  gap: 48px;
  max-width: 1100px;
  width: 100%;
  margin-bottom: 36px;
  animation: slideInUp 0.7s;
  @media (max-width: 900px) {
    flex-direction: column;
    gap: 24px;
    padding: 24px 10px;
  }
}
.input-panel {
  flex: 1.5;
  display: flex;
  flex-direction: column;
  .input-tip {
    font-size: 1.08rem;
    color: var(--sub-color);
    margin-bottom: 16px;
  }
  .main-input {
    font-size: 1.08rem;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(75, 94, 122, 0.07);
    transition: box-shadow 0.3s;
    &:focus-within {
      box-shadow: 0 4px 20px #7bbdf9aa;
    }
  }
  .credit-info {
    display: flex;
    justify-content: space-between;
    color: #aaa;
    font-size: 0.95rem;
    margin-top: 8px;
    .credit {
      color: #4b5e7a;
      font-weight: 500;
    }
  }
}
.settings-panel {
  flex: 1;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(123, 189, 249, 0.1);
  padding: 28px 22px 18px 22px;
  display: flex;
  flex-direction: column;
  min-width: 300px;
  max-width: 340px;
  animation: float 3.5s ease-in-out infinite;
  .settings-group {
    margin-bottom: 28px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .settings-label {
    font-size: 1.08rem;
    font-weight: 600;
    color: var(--main-color);
    margin-bottom: 12px;
    letter-spacing: 1px;
  }
  .voice-select {
    width: 100%;
  }
  .model-radio {
    margin-bottom: 10px;
    .el-radio-button__inner {
      border-radius: 8px;
      font-weight: 500;
      padding: 0 18px;
    }
  }
  .model-gradient-bar {
    display: flex;
    align-items: center;
    margin-top: 6px;
    .bar {
      width: 38px;
      height: 8px;
      border-radius: 6px;
      background: linear-gradient(90deg, #4b5e7a 0%, #6c6f93 100%);
      margin-right: 10px;
    }
    .bar-label {
      font-size: 0.95rem;
      color: #888;
      margin-right: 10px;
    }
    .try-v3-btn {
      background: linear-gradient(90deg, #7bbdf9 0%, #4b5e7a 100%);
      color: #fff;
      border: none;
      border-radius: 12px;
      font-size: 0.9rem;
      padding: 2px 12px;
      margin-left: 8px;
      transition: background 0.3s;
      &:hover {
        background: linear-gradient(90deg, #4b5e7a 0%, #7bbdf9 100%);
      }
    }
  }
  .slider-row {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    font-size: 1rem;
    color: var(--main-color);
    &:last-child {
      margin-bottom: 0;
    }
    span:first-child {
      width: 80px;
    }
    span:last-child {
      width: 48px;
      text-align: right;
      color: #4b5e7a;
    }
  }
}
.bottom-bar {
  width: 100%;
  max-width: 1100px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 24px;
  margin-bottom: 24px;
  .generate-btn {
    font-size: 1.1rem;
    padding: 12px 32px;
    border-radius: 24px;
    background: var(--gradient-main);
    border: none;
    box-shadow: 0 2px 12px #7bbdf933;
    transition:
      background 0.3s,
      box-shadow 0.3s,
      transform 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;
    &:hover {
      background: linear-gradient(90deg, #7bbdf9 0%, #4b5e7a 100%);
      box-shadow: 0 4px 20px #7bbdf966;
      transform: translateY(-2px) scale(1.04);
    }
  }
}
.audio-player-bar {
  width: 100%;
  max-width: 1100px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 12px #7bbdf933;
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 16px 24px;
  margin-bottom: 18px;
  animation: fadeIn 0.7s;
  .audio-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    .audio-title {
      font-size: 1.05rem;
      color: var(--main-color);
      font-weight: 500;
    }
    .audio-voice {
      font-size: 0.92rem;
      color: #4b5e7a;
    }
  }
  .audio-btn {
    margin-left: 4px;
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
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>
