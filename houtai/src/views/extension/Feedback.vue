<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElTable, ElTableColumn, ElButton, ElTag, ElDialog, ElInput, ElSelect, ElOption, ElMessage, ElPagination } from 'element-plus'
import type { Feedback } from '@/types'

const tableData = ref<Feedback[]>([])
const loading = ref(false)
const replyVisible = ref(false)
const currentFeedback = ref<Feedback | null>(null)
const replyContent = ref('')

const searchForm = reactive({ type: '', status: '' })

const page = ref(1); const pageSize = ref(10); const total = ref(0)

onMounted(() => loadData())

const loadData = async () => {
  loading.value = true
  try {
    await new Promise(r => setTimeout(r, 500))
    tableData.value = [
      { id: '1', userId: '1', userNickname: '用户A', type: 'oj', content: '希望增加更多中等难度的题目', status: 'pending', createTime: '2024-03-15' },
      { id: '2', userId: '2', userNickname: '用户B', type: 'visualization', content: '动画播放速度可以再快一些', status: 'processing', reply: '感谢反馈，已记录', createTime: '2024-03-14' }
    ]
    total.value = 2
  } finally { loading.value = false }
}

const handleReply = (row: Feedback) => { currentFeedback.value = row; replyContent.value = ''; replyVisible.value = true }
const handleSubmitReply = async () => { ElMessage.success('回复成功'); replyVisible.value = false; loadData() }
const handleUpdateStatus = async (row: Feedback, status: string) => { ElMessage.success('状态更新成功'); loadData() }
</script>

<template>
  <div class="page-container">
    <div class="page-header"><h2>反馈管理</h2></div>
    <div class="card-container">
      <div class="filter-bar">
        <el-select v-model="searchForm.type" placeholder="类型" clearable style="width:120px"><el-option label="可视化" value="visualization" /><el-option label="OJ" value="oj" /><el-option label="AI" value="ai" /></el-select>
        <el-select v-model="searchForm.status" placeholder="状态" clearable style="width:120px"><el-option label="待处理" value="pending" /><el-option label="处理中" value="processing" /><el-option label="已解决" value="resolved" /></el-select>
      </div>
      <el-table :data="tableData" v-loading="loading" stripe style="margin-top:16px">
        <el-table-column prop="userNickname" label="用户" width="100" />
        <el-table-column prop="type" label="类型" width="100"><template #default="{row}"><el-tag size="small">{{ row.type === 'visualization' ? '可视化' : row.type === 'oj' ? 'OJ' : row.type === 'ai' ? 'AI' : '其他' }}</el-tag></template></el-table-column>
        <el-table-column prop="content" label="反馈内容" min-width="300" />
        <el-table-column prop="reply" label="回复" min-width="150" show-overflow-tooltip />
        <el-table-column prop="status" label="状态" width="100"><template #default="{row}"><el-tag :type="row.status === 'resolved' ? 'success' : row.status === 'processing' ? 'warning' : 'info'" size="small">{{ row.status === 'resolved' ? '已解决' : row.status === 'processing' ? '处理中' : '待处理' }}</el-tag></template></el-table-column>
        <el-table-column prop="createTime" label="时间" width="110" />
        <el-table-column label="操作" width="160"><template #default="{row}"><el-button type="primary" link @click="handleReply(row)">回复</el-button><el-button type="success" link @click="handleUpdateStatus(row, 'resolved')">完成</el-button></template></el-table-column>
      </el-table>
      <div class="pagination-wrapper"><el-pagination v-model:current-page="page" v-model:page-size="pageSize" :total="total" layout="total,sizes,prev,pager,next" /></div>
    </div>
    <el-dialog v-model="replyVisible" title="回复反馈" width="500px">
      <div class="feedback-content"><strong>用户反馈：</strong>{{ currentFeedback?.content }}</div>
      <el-input v-model="replyContent" type="textarea" :rows="4" placeholder="请输入回复内容" style="margin-top:16px" />
      <template #footer><el-button @click="replyVisible=false">取消</el-button><el-button type="primary" @click="handleSubmitReply">发送回复</el-button></template>
    </el-dialog>
  </div>
</template>

<style scoped>
.pagination-wrapper{display:flex;justify-content:flex-end;margin-top:16px}
.feedback-content{padding:12px;background:#f5f7fa;border-radius:4px}
</style>
