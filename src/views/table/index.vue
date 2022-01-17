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
    <el-pagination
      layout="total, sizes, prev, pager, next, jumper"
      :page-size="list_total.per_page"
      :current-page="list_total.current_page"
      :total="list_total.total"
      @current-change="setPage"
    >
    </el-pagination>
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
      listLoading: true,
      list_total: {
        total: null,
        current_page: null,
        per_page: null
      },
      page: 1,
      pageSize: 10
    }
  },
  computed: {
    pagedTableData() {
      return this.list.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
    }
  },
  created() {
    this.fetchData({ 'page': this.page })
  },
  methods: {
    setPage(val) {
      this.page = val
      this.fetchData({ 'page': this.page })
    },
    fetchData(page) {
      this.listLoading = true
      getList(page).then(response => {
        this.list_total = response
        this.list = response.data
        this.listLoading = false
      })
    }
  }
}
</script>
