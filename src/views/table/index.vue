<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="Brand">
        <template slot-scope="scope">
          {{ scope.row.brand }}
        </template>
      </el-table-column>
      <el-table-column label="Model" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.model }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Created at" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.created_at }}
        </template>
      </el-table-column>

      <el-table-column align="center" prop="created_at" label="Updated at" width="200">
        <template slot-scope="scope">

          <span>{{ scope.row.updated_at }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    }
  }
}
</script>
