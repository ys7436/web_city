<template>
  <div class="whiteBack">
    <div class="whiteForm editInput">
      <el-form :inline="true" :model="ruleForm" status-icon ref="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="公司名称：" prop="name">
          <el-input v-model.trim="ruleForm.name" placeholder="请输入公司名称" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="公司类型：" prop="status">
          <el-select v-model="ruleForm.status" placeholder="请选择公司类型" filterable>
            <el-option label="物业公司" value="1"></el-option>
            <el-option label="资源回收公司" value="2"></el-option>
            <el-option label="垃圾清运公司" value="3"></el-option>
            <el-option label="餐厨垃圾处理公司" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="submitForm('ruleForm')">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="whiteTable">
      <table-colum :loading="loading" :tableHead="tableHead" :tableData="tableData" :status="tableStatus"
                   @handleCheckBox="editCheckBox" @handleRow="editMessage" @deleteRow="deleteRow"></table-colum>
      <page-size :total="total" :currentPage="currentPage" :pageSize="pageSize" @tableDataSize="tableSize" @tableDataPage="tablePage"></page-size>
    </div>
    <el-dialog class="treeDialogList" title="单位用户编辑" :visible.sync="dialogVisible" width="420px" :before-close="handleClose">
      <div class="dialogList inputAuto">
        <el-form ref="dialogItem" :model="ruleDialog" status-icon :rules="DialogRules" class="demo-form-inline" label-width="120px">
          <el-form-item label="公司名称：" prop="name">
            <el-input v-model.trim="ruleDialog.name" placeholder="请输入姓名" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="公司类型：" prop="status">
            <el-select  class="blockInput" v-model="ruleDialog.status" placeholder="请选择公司类型" filterable>
              <el-option label="物业公司" value="1"></el-option>
              <el-option label="资源回收公司" value="2"></el-option>
              <el-option label="垃圾清运公司" value="3"></el-option>
              <el-option label="餐厨垃圾处理公司" value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="blockDate" label="合同开始日期：" prop="startTime">
            <el-date-picker v-model="ruleDialog.startTime" type="date" placeholder="选择合同开始日期"></el-date-picker>
          </el-form-item>
          <el-form-item class="blockDate" label="合同结束日期：" prop="endTime">
            <el-date-picker v-model="ruleDialog.endTime" type="date" placeholder="选择合同结束日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="是否启用：" prop="resource" class="bottomNone">
            <el-switch
              v-model="ruleDialog.resource"
              active-text="是"
              inactive-text="否">
            </el-switch>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editDetail('dialogItem')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TableColum from '../../common/tablecolum'
import PageSize from '../../common/pageSize'
import { tableEvent } from '../../../utils/mixin'
export default {
  name: 'Three',
  data () {
    return {
      rules: {},
      ruleForm: {
        name: '',
        status: ''
      },
      tableStatus: '2',
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
      ruleDialog: {
        name: '',
        status: '',
        startTime: '',
        endTime: '',
        resource: false
      },
      DialogRules: {
        name: [{ required: true, message: '请输入公司名称', trigger: 'blur' }],
        status: [{ required: true, message: '请输入公司类型', trigger: 'change' }],
        startTime: [{ required: true, message: '请选择合同开始时间', trigger: 'change' }],
        endTime: [{ required: true, message: '请选择合同结束时间', trigger: 'change' }]
      }
    }
  },
  mixins: [tableEvent],
  components: {
    TableColum,
    PageSize
  },
  methods: {
    submitForm () {
      console.log('查询')
    },
    editCheckBox (val) {
      console.log('1: ', val)
    },
    editMessage (val) {
      this.dialogVisible = true
      console.log('编辑：', val)
    },
    deleteRow (val) {
      console.log('删除：', val)
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
    },
    editDetail (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          console.log(this.ruleDialog)
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
