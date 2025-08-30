<template>
  <div class="history-page">
    <div class="header">
      <div class="title-wrap">
        <el-icon><Clock /></el-icon>
        <h2>聊天历史记录</h2>
        <el-tag size="small" type="info">{{ list.length }} 条消息</el-tag>
      </div>
      <div class="header-actions">
        <el-button text type="danger" :icon="Delete" @click="clearAll">清空历史</el-button>
      </div>
    </div>

    <el-card class="history-card" shadow="never">
      <div class="item" v-for="item in list" :key="item.id">
        <div class="item-left">
          <el-avatar size="large" :src="logo" />
          <div class="meta">
            <div class="line">
              <span class="label">对话记录</span>
              <el-tag type="success" size="small">共 {{ item.count }} 条消息</el-tag>
              <el-tag v-if="item.model" type="info" size="small">{{ item.model }}</el-tag>
            </div>
            <span>问:</span>
            <div class="question">{{ item.question }}</div>
            <span>答:</span>
            <div class="preview">{{ item.preview }}</div>
          </div>
        </div>
        <div class="item-right">
          <div class="time">{{ item.time }}</div>
          <div class="ops">
            <el-button link type="primary" @click="view(item.id)">查看详情</el-button>
            <el-button link type="danger" @click="remove(item.id)">删除</el-button>
          </div>
        </div>
      </div>
      <el-empty v-if="list.length === 0" description="暂无历史" />
    </el-card>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { Clock, Delete } from '@element-plus/icons-vue'
import logo from '@/assets/images/logo.jpg'

const list = ref([
  {
    id: '1',
    question: '个性化学习支持模块有什么用',
    preview: '通过学习者画像来个性化生成语音...',
    time: '2025/06/18 10:57',
    count: 2,
    model: 'Deepseek R1',
  },
])

function view(id) {
  // 实际对接路由到问答页并加载该会话
  console.log('view', id)
}
function remove(id) {
  list.value = list.value.filter((i) => i.id !== id)
}
function clearAll() {
  list.value = []
}
</script>
<style scoped lang="scss">
.history-page {
  background: var(--card-color);
  border-radius: 12px;
  box-shadow: 0 6px 24px rgba(75, 94, 122, 0.08);
  padding: 16px;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 4px 12px;
  border-bottom: 1px solid rgba(75, 94, 122, 0.08);
}
.title-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--main-color);
}
.history-card {
  margin-top: 16px;
  border: none;
  background: transparent;
}
.item {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 8px;
  border-bottom: 1px dashed rgba(75, 94, 122, 0.15);
  border-radius: 10px;
  transition:
    background 0.2s,
    transform 0.2s,
    box-shadow 0.2s;
}
.item:hover {
  background: var(--hover-bg);
  box-shadow: 0 4px 16px rgba(0, 123, 255, 0.08);
  transform: translateY(-1px);
}
.item:last-child {
  border-bottom: none;
}
.item-left {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}
.meta {
  max-width: 820px;
}
.line {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}
.label {
  font-weight: 700;
  color: var(--main-color);
}
.preview {
  // display: inline-block;
  color: var(--sub-color);
  line-height: 1.7;
}
.question {
  // display: inline-block;
  color: var(--sub-color);
  line-height: 1.7;
}
.item-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}
.time {
  color: var(--sub-color);
  font-size: 12px;
}
.ops {
  display: flex;
  gap: 10px;
}
</style>
