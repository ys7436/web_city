<template>
  <div class="whiteBack">
    <div class="whiteForm editInput">
      <el-form :inline="true" :model="ruleForm" :rules="rules" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="归属位置：" prop="location" class="bottomNone">
          <el-input v-model.trim="ruleForm.location" placeholder="请输入设备归属小区/名称/位置" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="处理状态：" prop="status" class="bottomNone">
          <el-select v-model="ruleForm.status" placeholder="请选择处理状态" filterable>
            <el-option label="已完成" value="1"></el-option>
            <el-option label="维修中" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="报警来源：" prop="source" class="bottomNone">
          <el-select v-model="ruleForm.source" placeholder="请选择报警来源" filterable>
            <el-option label="系统上报" value="1"></el-option>
            <el-option label="人员上报" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="bottomNone">
          <el-button type="primary" icon="el-icon-search" @click="submitForm('ruleForm')">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="whiteTable">
      <table-colum :loading="loading" :tableHead="tableHead" :tableData="tableData" :status="tableStatus"></table-colum>
      <page-size :total="total" :currentPage="currentPage" :pageSize="pageSize" @tableDataSize="tableSize" @tableDataPage="tablePage"></page-size>
    </div>
  </div>
</template>

<script>
import TableColum from '../../common/tablecolum'
import PageSize from '../../common/pageSize'
import { tableEvent } from '../../../utils/mixin'
export default {
  name: 'Fault',
  data () {
    return {
      ruleForm: {
        location: '',
        status: '',
        source: ''
      },
      rules: {},
      tableHead: [
        { align: 'center', prop: 'name', name: '公司名称', width: '200' },
        { align: 'center', prop: 'status', name: '公司类型', width: '200' },
        { align: 'center', prop: 'startTime', name: '合同开始时间', width: '200' },
        { align: 'center', prop: 'endTime', name: '合同结束时间', width: '200' },
        { align: 'center', prop: 'state', name: '状态', width: 'auto' }
      ],
      tableData: [
        { name: '王小虎1', status: '垃圾清运公司', startTime: '2020-01-20', endTime: '2020-01-29', state: '已启用' },
        { name: '王小虎2', status: '垃圾清运公司', startTime: '2020-01-20', endTime: '2020-01-29', state: '已启用' },
        { name: '王小虎3', status: '垃圾清运公司', startTime: '2020-01-20', endTime: '2020-01-29', state: '已启用' },
        { name: '王小虎4', status: '垃圾清运公司', startTime: '2020-01-20', endTime: '2020-01-29', state: '已启用' },
        { name: '王小虎5', status: '垃圾清运公司', startTime: '2020-01-20', endTime: '2020-01-29', state: '已启用' },
        { name: '王小虎6', status: '垃圾清运公司', startTime: '2020-01-20', endTime: '2020-01-29', state: '已启用' }
      ],
      tableStatus: '0'
    }
  },
  components: {
    TableColum,
    PageSize
  },
  mixins: [tableEvent],
  methods: {
    submitForm () {
      console.log(this.ruleForm)
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
