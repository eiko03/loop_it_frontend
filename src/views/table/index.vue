<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @header-click="headerClick"
    >
      <el-table-column align="center" label="ID" width="95" sortable="custom">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="Brand" sortable="custom">
        <template slot-scope="scope">
          {{ scope.row.brand }}
        </template>
      </el-table-column>
      <el-table-column label="Model" width="110" align="center" sortable="custom">
        <template slot-scope="scope">
          <span>{{ scope.row.model }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Created at" width="110" align="center" sortable="custom">
        <template slot-scope="scope">
          {{ scope.row.created_at }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Updated at" width="200" sortable="custom">
        <template slot-scope="scope">
          <span>{{ scope.row.updated_at }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="right"
      >
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="Type to search"
            @keyup.enter.native="onSubmit(scope.$index, scope.row)"
          >
          </el-input>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >Edit</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="total, sizes, prev, pager, next, jumper"
      :page-size="list_total.per_page"
      :current-page="list_total.current_page"
      :total="list_total.total"
      @current-change="setPage"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script>
import { getList, deleteList } from '@/api/table'
import router from '@/router'

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
      search: ' ',
      list: null,
      listLoading: true,
      list_total: {
        total: null,
        current_page: null,
        per_page: null
      },
      page: 1,
      pageSize: 10,
      pager: {}
    }
  },
  computed: {
    pagedTableData() {
      return this.list.slice(this.pageSize * this.page - this.pageSize, this.pageSize * this.page)
    }
  },
  created() {
    this.pager = { 'page': this.page }
    this.fetchData(this.pager)
  },

  methods: {
    onSubmit(data, datar) {
      this.pager = { ...this.pager, 'search': this.search.replaceAll('+', ' ') }
      this.fetchData(this.pager)
    },
    handleSizeChange(data) {
      this.pager = { ...this.pager, 'count_per_page': parseInt(data) }
      this.fetchData(this.pager)
    },
    handleEdit(index, row) {
      router.push({ path: '/form/index', query: { id: row.id }})
    },
    handleDelete(index, row) {
      this.deleteData(row.id)
    },
    headerClick(column, event) {
      let order
      if (column.order === 'descending') {
        order = 'DESC'
      } else if (column.order === 'ascending') {
        order = 'ASC'
      }

      if (column.order) {
        this.fetchData({
          'page': this.page,
          'sort_by': column.label.toLowerCase().replaceAll(' ', '_'),
          'sort': order
        })
      } else {
        this.fetchData({
          'page': this.page
        })
      }
    },
    setPage(val) {
      this.pager.page = val
      this.fetchData(this.pager)
    },
    fetchData(page) {
      this.listLoading = true
      getList(page).then(response => {
        this.list_total = response
        this.list = response.data
        this.listLoading = false
      })
    },
    deleteData(id) {
      this.listLoading = true
      deleteList(id).then(() => {
        this.fetchData({
          'page': this.page
        })
      })
    }
  }
}
</script>
