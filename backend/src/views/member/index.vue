<template>
  <div class="dashboard-container" id="member-app">
    <div class="container">
      <div class="tableBar">
        <el-input
          v-model="input"
          placeholder="请输入员工姓名"
          style="width: 250px"
          clearable
          @keyup.enter.native="handleQuery"
        >
          <i
            slot="prefix"
            class="el-input__icon el-icon-search"
            style="cursor: pointer"
            @click="handleQuery"
          ></i>
        </el-input>
        <el-button type="primary" @click="addMemberHandle('add')">
          + 添加员工
        </el-button>
      </div>
      <el-table :data="tableData" stripe class="tableBox">
        <el-table-column prop="name" label="员工姓名"></el-table-column>
        <el-table-column prop="username" label="账号"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column label="账号状态">
          <template slot-scope="scope">
            {{ String(scope.row.status) === '0' ? '已禁用' : '正常' }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              class="blueBug"
              @click="addMemberHandle(scope.row.id)"
              :class="{ notAdmin: user !== 'admin' }"
            >
              编辑
            </el-button>
            <el-button
              type="text"
              size="small"
              class="delBut non"
              @click="statusHandle(scope.row)"
              v-if="user === 'admin'"
            >
              {{ scope.row.status == '1' ? '禁用' : '启用' }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pageList"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="counts"
        :current-page.sync="page"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { getMemberList, enableOrDisableEmployee } from '@/api/member'

export default defineComponent({
  name: 'MemberList',
  data() {
    return {
      input: '',
      counts: 0,
      page: 1,
      pageSize: 10,
      tableData: [],
      id: '',
      status: '',
    }
  },
  computed: {},
  created() {
    this.init()
    this.user = JSON.parse(localStorage.getItem('userInfo')).username
  },
  mounted() {},
  methods: {
    async init() {
      const params = {
        page: this.page,
        pageSize: this.pageSize,
        name: this.input ? this.input : undefined,
      }
      await getMemberList(params)
        .then((res) => {
          if (String(res.code) === '1') {
            this.tableData = res.data.records || []
            this.counts = res.data.total
          }
        })
        .catch((err) => {
          this.$message.error('请求出错了：' + err)
        })
    },
    handleQuery() {
      this.page = 1
      this.init()
    },
    // 添加
    addMemberHandle(st) {
      if (st === 'add') {
        this.$store.commit('menu/menuHandle', {
          menuActived: '2',
          headTitle: '添加员工',
          iframeUrl: '/member/op',
          goBackFlag: true,
        })
      } else {
        this.$store.commit('menu/menuHandle', {
          menuActived: '2',
          headTitle: '修改员工',
          iframeUrl: `/member/op?id=${st}`,
          goBackFlag: true,
        })
      }
    },
    //状态修改
    statusHandle(row) {
      this.id = row.id
      this.status = row.status
      this.$confirm('确认调整该账号的状态?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        enableOrDisableEmployee({ id: this.id, status: !this.status ? 1 : 0 })
          .then((res) => {
            console.log('enableOrDisableEmployee', res)
            if (String(res.code) === '1') {
              this.$message.success('账号状态更改成功！')
              this.handleQuery()
            }
          })
          .catch((err) => {
            this.$message.error('请求出错了：' + err)
          })
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.init()
    },
    handleCurrentChange(val) {
      this.page = val
      this.init()
    },
  },
})
</script>

<style>
@import url(@/styles/common.css);
@import url(@/styles/page.css);

#member-app .notAdmin::after {
  border: 0 !important;
}
</style>
