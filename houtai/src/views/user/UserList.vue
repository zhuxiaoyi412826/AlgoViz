<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElTable, ElTableColumn, ElButton, ElTag, ElDialog, ElAvatar, ElMessage, ElPagination } from 'element-plus'
import { Search, Refresh } from '@element-plus/icons-vue'
import type { AppUser } from '@/types'

const tableData = ref<AppUser[]>([])
const loading = ref(false)
const detailVisible = ref(false)
const currentUser = ref<AppUser | null>(null)

const searchForm = reactive({ keyword: '', status: '' })
const page = ref(1); const pageSize = ref(10); const total = ref(0)

onMounted(() => loadData())

const loadData = async () => {
  loading.value = true
  try {
    await new Promise(r => setTimeout(r, 500))
    tableData.value = [
      { id: '1', openid: 'o****1', nickname: '用户A', avatar: '', bindTime: '2024-01-01', status: 'active', dsVisits: 45, algoVisits: 32, ojVisits: 78, aiDialogues: 12, lastVisitTime: '2024-03-15' },
      { id: '2', openid: 'o****2', nickname: '用户B', avatar: '', bindTime: '2024-01-15', status: 'active', dsVisits: 23, algoVisits: 56, ojVisits: 120, aiDialogues: 45, lastVisitTime: '2024-03-15' },
      { id: '3', openid: 'o****3', nickname: '用户C', avatar: '', bindTime: '2024-02-01', status: 'disabled', dsVisits: 5, algoVisits: 8, ojVisits: 15, aiDialogues: 2, lastVisitTime: '2024-03-01' }
    ]
    total.value = 3
  } finally { loading.value = false }
}

const handleView = (row: AppUser) => { currentUser.value = row; detailVisible.value = true }
const handleToggleStatus = async (row: AppUser) => { const newStatus = row.status === 'active' ? 'disabled' : 'active'; ElMessage.success(`已${newStatus === 'active' ? '启用' : '禁用'}用户`); loadData() }
</script>

<template>
  <div class="page-container">
    <div class="page-header"><h2>用户列表</h2></div>
    <div class="card-container">
      <div class="filter-bar">
        <el-input v-model="searchForm.keyword" placeholder="昵称/OpenID" clearable style="width:180px" />
        <el-select v-model="searchForm.status" placeholder="状态" clearable style="width:100px"><el-option label="启用" value="active" /><el-option label="禁用" value="disabled" /></el-select>
        <el-button type="primary" :icon="Search">查询</el-button><el-button :icon="Refresh">重置</el-button>
      </div>
      <el-table :data="tableData" v-loading="loading" stripe style="margin-top:16px">
        <el-table-column label="用户" min-width="200"><template #default="{row}"><div style="display:flex;align-items:center;gap:10px"><el-avatar :size="36" :src="row.avatar" icon="User" /><div><div>{{ row.nickname }}</div><div style="font-size:12px;color:#999">{{ row.openid }}</div></div></div></template></el-table-column>
        <el-table-column prop="bindTime" label="绑定时间" width="110" />
        <el-table-column prop="lastVisitTime" label="最后访问" width="110" />
        <el-table-column prop="dsVisits" label="数据结构" width="80" />
        <el-table-column prop="algoVisits" label="算法" width="80" />
        <el-table-column prop="ojVisits" label="OJ" width="80" />
        <el-table-column prop="aiDialogues" label="AI对话" width="80" />
        <el-table-column prop="status" label="状态" width="80"><template #default="{row}"><el-tag :type="row.status==='active'?'success':'danger'" size="small">{{ row.status==='active'?'启用':'禁用' }}</el-tag></template></el-table-column>
        <el-table-column label="操作" width="160"><template #default="{row}"><el-button type="primary" link @click="handleView(row)">详情</el-button><el-button type="warning" link @click="handleToggleStatus(row)">{{ row.status==='active'?'禁用':'启用' }}</el-button></template></el-table-column>
      </el-table>
      <div class="pagination-wrapper"><el-pagination v-model:current-page="page" v-model:page-size="pageSize" :total="total" layout="total,sizes,prev,pager,next" /></div>
    </div>
    <el-dialog v-model="detailVisible" title="用户详情" width="600px">
      <el-descriptions :column="2" border v-if="currentUser">
        <el-descriptions-item label="昵称">{{ currentUser.nickname }}</el-descriptions-item>
        <el-descriptions-item label="OpenID">{{ currentUser.openid }}</el-descriptions-item>
        <el-descriptions-item label="绑定时间">{{ currentUser.bindTime }}</el-descriptions-item>
        <el-descriptions-item label="最后访问">{{ currentUser.lastVisitTime || '-' }}</el-descriptions-item>
        <el-descriptions-item label="数据结构访问" :span="2">{{ currentUser.dsVisits }} 次</el-descriptions-item>
        <el-descriptions-item label="算法访问">{{ currentUser.algoVisits }} 次</el-descriptions-item>
        <el-descriptions-item label="OJ访问">{{ currentUser.ojVisits }} 次</el-descriptions-item>
        <el-descriptions-item label="AI对话">{{ currentUser.aiDialogues }} 次</el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<style scoped>.pagination-wrapper{display:flex;justify-content:flex-end;margin-top:16px}</style>
