<template>
  <div class="qa-page">
    <div class="qa-container">
      <div class="qa-main">
        <div class="chat-header">
          <div class="model">
            <el-icon><ChatDotRound /></el-icon>
            <span>AI小助手</span>
          </div>
          <div class="actions">
            <el-select v-model="model" size="small" class="model-select">
              <el-option label="Deepseek R1" value="deepseek" />
            </el-select>
            <el-button class="icon-btn" :icon="Refresh" circle @click="resetConversation" />
          </div>
        </div>

        <el-scrollbar class="chat-body">
          <div class="welcome" v-if="messages.length === 0">
            <h2>开始你的提问</h2>
            <p>描述你的问题或粘贴一段内容，我会给出清晰可用的答案</p>
            <div class="suggestions">
              <el-tag v-for="s in suggestions" :key="s" @click="useSuggestion(s)">{{ s }}</el-tag>
            </div>
          </div>

          <div v-else class="message-list">
            <div v-for="m in messages" :key="m.id" class="message" :class="m.role">
              <div class="avatar">
                <el-icon v-if="m.role === 'assistant'"><ChatDotRound /></el-icon>
                <el-icon v-else><User /></el-icon>
              </div>
              <div class="bubble" v-html="m.content"></div>
            </div>
          </div>
        </el-scrollbar>

        <div class="chat-input">
          <div class="input-box" :class="{ focused: isFocused }">
            <el-input
              v-model="input"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 6 }"
              :placeholder="`尽管问...`"
              @focus="isFocused = true"
              @blur="isFocused = false"
              @keydown.enter.prevent="handleEnter"
            />
            <div class="toolbar">
              <div class="left">
                <el-button text class="round-btn">
                  <el-icon><Connection /></el-icon>
                </el-button>
                <el-button size="small" class="chip-btn">
                  <el-icon><Connection /></el-icon>
                  深度研究
                </el-button>
                <el-upload :show-file-list="false" :auto-upload="false" :on-change="onFileChange">
                  <el-button text class="round-btn">
                    <el-icon><Paperclip /></el-icon>
                  </el-button>
                </el-upload>
              </div>
              <div class="right">
                <!-- <el-select v-model="model" size="small" class="compact-select">
                  <el-option label="K1.5" value="deepseek" />
                  <el-option label="Kimi" value="kimi" />
                </el-select> -->
                <el-switch v-model="stream" />
                <el-button class="send-btn" type="primary" :icon="Promotion" circle @click="send" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import {
  ChatDotRound,
  Refresh,
  Promotion,
  User,
  Paperclip,
  Connection,
} from '@element-plus/icons-vue'
const messages = ref([])
const input = ref('')
const stream = ref(true)
const model = ref('deepseek')
const isFocused = ref(false)
const suggestions = ref([
  '帮我总结这段文本的重点',
  '写一个友好、简洁的公告',
  '把这段代码优化并解释思路',
])

function resetConversation() {
  messages.value = []
}

function useSuggestion(text) {
  input.value = text
}

function handleEnter(e) {
  if (!e.shiftKey) {
    send()
  } else {
    input.value += '\n'
  }
}

function send() {
  if (!input.value.trim()) return
  const userMsg = { id: Date.now() + '-u', role: 'user', content: input.value }
  messages.value.push(userMsg)
  input.value = ''
  // 简单模拟回复
  const reply = {
    id: Date.now() + '-a',
    role: 'assistant',
    content: '这是一个示例回答。实际项目中对接后端/大模型接口即可。',
  }
  messages.value.push(reply)
}

function onFileChange(file) {
  console.log('selected file:', file.name)
}
</script>
<style scoped lang="scss">
.qa-page {
  height: 100%;
  display: flex;
}
.qa-container {
  background: var(--card-color);
  border-radius: 12px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  width: 100%;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.06);
}

.qa-main {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid #eef0f5;
  .model {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--main-color);
    font-weight: 600;
  }
  .actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }
}
.model-select {
  width: 140px;
}

.chat-body {
  padding: 16px;
  flex: 1;
}
.welcome {
  text-align: center;
  margin-top: 8vh;
  h2 {
    color: var(--main-color);
    margin-bottom: 8px;
  }
  p {
    color: var(--sub-color);
  }
  .suggestions {
    margin-top: 16px;
    display: flex;
    gap: 8px;
    justify-content: center;
    flex-wrap: wrap;
  }
}
.message-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.message {
  display: flex;
  gap: 12px;
  &.assistant .bubble {
    background: #f6f8fc;
  }
  &.user {
    flex-direction: row-reverse;
  }
  &.user .bubble {
    background: var(--active-bg);
    color: var(--active-color);
  }
}
.avatar {
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  color: var(--active-icon-color);
}
.bubble {
  max-width: 70%;
  padding: 10px 12px;
  border-radius: 12px;
  line-height: 1.6;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  background: #fff;
}

.chat-input {
  border-top: 1px solid #eef0f5;
  padding: 16px;
}
.input-box {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 16px;
  padding: 16px;
  transition: all 0.2s ease;
}
.input-box.focused {
  border-color: var(--active-border);
  box-shadow: 0 8px 24px rgba(0, 123, 255, 0.12);
}
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
}
.left {
  display: flex;
  align-items: center;
  gap: 8px;
}
.right {
  display: flex;
  align-items: center;
  gap: 12px;
}
.round-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  padding: 0;
  color: #6c757d;
}
.chip-btn {
  background: #e3f2fd;
  color: #1976d2;
  border: none;
  border-radius: 16px;
  padding: 6px 12px;
  font-size: 12px;
}
.compact-select {
  width: 80px;
}
.send-btn {
  width: 36px;
  height: 36px;
  transition: transform 0.2s ease;
}
.send-btn:hover {
  transform: scale(1.05);
}
</style>
