<template>
  <div class="voice-db-root">
    <div class="voice-db-card">
      <div class="voice-db-filters">
        <el-input v-model="search" placeholder="搜索语音名称" class="filter-input" clearable />
        <el-select v-model="course" placeholder="全部课程" class="filter-select">
          <el-option label="全部课程" value="" />
          <el-option label="高等数学" value="高等数学" />
          <el-option label="大学英语" value="大学英语" />
        </el-select>
        <el-select v-model="emotion" placeholder="全部情感" class="filter-select">
          <el-option label="全部情感" value="" />
          <el-option label="中性" value="中性" />
          <el-option label="严肃" value="严肃" />
          <el-option label="轻松" value="轻松" />
        </el-select>
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          class="filter-date"
        />
      </div>
      <el-table :data="filteredData" class="voice-db-table" stripe border>
        <el-table-column prop="name" label="语音名称" min-width="120">
          <template #default="scope">
            <el-link type="primary">{{ scope.row.name }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="course" label="课程" min-width="100" />
        <el-table-column prop="date" label="生成时间" min-width="140" />
        <el-table-column prop="duration" label="时长" min-width="70" />
        <el-table-column prop="speed" label="语速" min-width="80">
          <template #default="scope">
            <el-tag :type="scope.row.speed === '正常' ? 'success' : 'warning'">{{
              scope.row.speed
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="emotion" label="情感" min-width="80">
          <template #default="scope">
            <el-tag :type="scope.row.emotion === '严肃' ? 'danger' : 'info'">{{
              scope.row.emotion
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="140">
          <template #default="scope">
            <el-link type="primary" @click="onCollect(scope.row)">收藏</el-link>
            <el-tooltip content="下载" placement="top">
              <el-button circle size="small" class="op-btn" @click="onDownload(scope.row)">
                <el-icon><Download /></el-icon>
              </el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button
                circle
                size="small"
                class="op-btn delete-btn"
                @click="onDelete(scope.$index)"
              >
                <el-icon><Delete /></el-icon>
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <div class="voice-db-pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="filteredData.length"
          :page-size="5"
          :current-page.sync="page"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Download, Delete } from '@element-plus/icons-vue'
const search = ref('')
const course = ref('')
const emotion = ref('')
const dateRange = ref([])
const page = ref(1)
const tableData = ref([
  {
    name: '数学函数讲解',
    course: '高等数学',
    date: '2024-03-15 14:30',
    duration: '5:30',
    speed: '正常',
    emotion: '严肃',
    url: 'https://www.w3schools.com/html/horse.mp3',
  },
  {
    name: '英语单词发音',
    course: '大学英语',
    date: '2024-03-14 10:15',
    duration: '3:45',
    speed: '慢速',
    emotion: '轻松',
    url: 'https://www.w3schools.com/html/horse.mp3',
  },
])
const filteredData = computed(() => {
  let data = tableData.value
  if (search.value) data = data.filter((i) => i.name.includes(search.value))
  if (course.value) data = data.filter((i) => i.course === course.value)
  if (emotion.value) data = data.filter((i) => i.emotion === emotion.value)
  // 日期筛选略
  return data
})
function onCollect(row) {
  ElMessage.success(`已收藏：${row.name}`)
}
function onDownload(row) {
  if (!row.url) return ElMessage.warning('暂无音频可下载')
  const a = document.createElement('a')
  a.href = row.url
  a.download = row.name + '.mp3'
  a.click()
  ElMessage.success('下载成功')
}
function onDelete(index) {
  ElMessageBox.confirm('确定要删除该语音记录吗？', '提示', {
    confirmButtonText: '删除',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      tableData.value.splice(index, 1)
      ElMessage.success('删除成功')
    })
    .catch(() => {})
}
</script>
<style scoped lang="scss">
.voice-db-root {
  min-height: 100vh;
  background: var(--bg-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0 0 0;
  animation: fadeIn 0.7s;
}
.voice-db-card {
  background: var(--card-color);
  border-radius: 16px;
  box-shadow: 0 6px 24px rgba(75, 94, 122, 0.1);
  padding: 28px 22px 18px 22px;
  width: 100%;
  max-width: 1100px;
  margin-bottom: 36px;
  animation: slideInUp 0.7s;
}
.voice-db-filters {
  display: flex;
  gap: 14px;
  margin-bottom: 16px;
  .filter-input {
    width: 200px;
  }
  .filter-select {
    width: 130px;
  }
  .filter-date {
    width: 220px;
  }
}
.voice-db-table {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(75, 94, 122, 0.07);
  margin-bottom: 14px;
  background: #fff;
  font-size: 15px;
  .el-table__row:hover {
    background: var(--hover-bg);
    transition: background 0.2s;
  }
  .el-link {
    font-weight: 500;
    font-size: 1.04rem;
    padding: 0 2px;
  }
  .el-tag {
    font-size: 0.97rem;
    border-radius: 7px;
    padding: 2px 12px;
  }
  .op-btn {
    margin-left: 4px;
    transition: box-shadow 0.18s;
    background: #f5f6fa;
    color: var(--main-color);
    border: none;
    &:hover {
      background: #28a745;
      // background: #007bff;
      color: #fff;
      box-shadow: 0 2px 8px #7bbdf966;
    }
  }
  .delete-btn {
    &:hover {
      background: #ff6b6b;
      color: #fff;
    }
  }
}
.voice-db-pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 6px;
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
</style>
