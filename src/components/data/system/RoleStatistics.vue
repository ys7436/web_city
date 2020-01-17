<template>
  <div class="whiteBack">
    <div>
      <el-form :inline="true" :model="ruleForm" status-icon ref="ruleForm" label-width="80px" class="demo-ruleForm">
        <el-form-item label="角色：">
          <el-input v-model.trim="ruleForm.role" placeholder="请输入角色名称" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="submitForm('ruleForm')">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <table-colum :loading="loading" :tableHead="tableHead" :tableData="tableData" :status="tableStatus"
                 @handleCheckBox="editCheckBox" @handleRow="editMessage"></table-colum>
    <page-size :total="total" :currentPage="currentPage" :pageSize="pageSize" @tableDataSize="tableSize" @tableDataPage="tablePage"></page-size>
  </div>
</template>

<script>
import TableColum from '../../common/tablecolum'
import PageSize from '../../common/pageSize'
import { tableEvent } from '../../../utils/mixin'
export default {
  name: 'RoleStatistics',
  data () {
    return {
      ruleForm: {
        role: ''
      },
      tableHead: [
        { align: 'center', prop: 'role', name: '角色名称', width: 'auto' },
        { align: 'center', prop: 'userNumber', name: '用户数', width: 'auto' }
      ],
      tableData: [
        { role: '王小虎1', userNumber: '35524' },
        { role: '王小虎2', userNumber: '35524' },
        { role: '王小虎3', userNumber: '35524' },
        { role: '王小虎4', userNumber: '35524' }
      ],
      tableStatus: '0'
    }
  },
  mixins: [tableEvent],
  components: {
    TableColum,
    PageSize
  },
  methods: {
    submitForm () {
    },
    editCheckBox (val) {
      console.log(val)
    },
    editMessage (val) {
      console.log(val)
    },
    tableSize (val) {
      this.pageSize = val
      this.tableRender()
    },
    tablePage (val) {
      this.currentPage = val
      this.tableRender()
    },
    tableRender () {
      console.log({ page: this.currentPage, limit: this.pageSize })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
