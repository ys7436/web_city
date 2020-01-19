<template>
  <div class="whiteBack">
    <div class="whiteForm editInput">
      <el-form :inline="true" :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="字典名称：">
          <el-input v-model.trim="ruleForm.name" placeholder="请输字典名称" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="字典编码：">
          <el-input v-model.trim="ruleForm.code" placeholder="请输入字典编码" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="submitForm('ruleForm')">查询</el-button>
          <el-button type="success" icon="el-icon-circle-plus" @click="addForm">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="whiteTable">
      <table-colum :loading="loading" :tableHead="tableHead" :tableData="tableData" :status="tableStatus"
                   @handleCheckBox="editCheckBox" @handleRow="editMessage" @deleteRow="deleteRow"></table-colum>
      <page-size :total="total" :currentPage="currentPage" :pageSize="pageSize" @tableDataSize="tableSize" @tableDataPage="tablePage"></page-size>
    </div>
    <el-dialog class="treeDialogList" title="字典添加 / 编辑" :visible.sync="dialogVisible" width="400px" :before-close="handleClose">
      <div class="dialogList inputAuto">
        <el-form :model="ruleDialog" :rules="ruleValidata" status-icon ref="dialogItem" label-width="100px" class="demo-ruleForm">
          <el-form-item label="字典名称：" prop="name">
            <el-input v-model.trim="ruleDialog.name" placeholder="请输入字典名称" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="属性：" prop="keys">
            <el-input v-model.trim="ruleDialog.keys" placeholder="请输入属性" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="标识：" prop="code">
            <el-input v-model.trim="ruleDialog.code" placeholder="请输入标识" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="字典值：" prop="value">
            <el-input v-model.trim="ruleDialog.value" placeholder="请输入字典值" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="字典类型：" prop="status">
            <el-input v-model.trim="ruleDialog.status" placeholder="请输入字典类型" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="是否启用：">
            <el-switch
              v-model="ruleDialog.start"
              active-text="是"
              inactive-text="否">
            </el-switch>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input type="textarea" v-model.trim="ruleDialog.remark" placeholder="请输入备注" autocomplete="off"></el-input>
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
import { languageList } from '../../../utils/validate'
export default {
  name: 'Dictionaries',
  data () {
    return {
      ruleForm: {
        name: '',
        code: ''
      },
      tableHead: [
        { align: 'center', width: '120px', prop: 'name', name: '字典名称' },
        { align: 'center', width: '120px', prop: 'keys', name: '属性' },
        { align: 'center', width: '120px', prop: 'code', name: '字典标识' },
        { align: 'center', width: '120px', prop: 'value', name: '字典值' },
        { align: 'center', width: '120px', prop: 'status', name: '字典类型' },
        { align: 'center', width: '120px', prop: 'addUser', name: '创建用户' },
        { align: 'center', width: '120px', prop: 'addTime', name: '创建时间' },
        { align: 'center', width: '120px', prop: 'updateUser', name: '更新用户' },
        { align: 'center', width: '120px', prop: 'updateTime', name: '更新时间' },
        { align: 'center', width: '120px', prop: 'start', name: '状态' },
        { align: 'left', width: '300px', prop: 'remark', name: '字典备注' }
      ],
      tableData: [
        { name: '王小虎1', keys: 'sys', code: 'sys', value: 'sss', status: 'sys', addUser: '社区管理员', addTime: '2019-12-12', updateUser: '1部门', updateTime: '2019-01-01', start: false, remark: '系统管理员1' },
        { name: '王小虎2', keys: 'sys', code: 'sys', value: 'sss', status: 'sys', addUser: '社区管理员', addTime: '2019-12-12', updateUser: '1部门', updateTime: '2019-01-01', start: false, remark: '系统管理员2' },
        { name: '王小虎3', keys: 'sys', code: 'sys', value: 'sss', status: 'sys', addUser: '社区管理员', addTime: '2019-12-12', updateUser: '1部门', updateTime: '2019-01-01', start: true, remark: '系统管理员3' },
        { name: '王小虎4', keys: null, code: 'sys', value: 'sss', status: 'sys', addUser: '社区管理员', addTime: '2019-12-12', updateUser: '1部门', updateTime: '2019-01-01', start: true, remark: '系统管理员4' },
        { name: '王小虎5', keys: 'sys', code: 'sys', value: 'sss', status: 'sys', addUser: '社区管理员', addTime: '2019-12-12', updateUser: '1部门', updateTime: '2019-01-01', start: false, remark: '系统管理员5' },
        { name: '王小虎6', keys: 'sys', code: 'sys', value: 'sss', status: 'sys', addUser: '社区管理员', addTime: '2019-12-12', updateUser: '1部门', updateTime: '2019-01-01', start: false, remark: '系统管理员6' }
      ],
      tableStatus: '2',
      ruleDialog: {
        name: '',
        keys: '',
        code: '',
        value: '',
        status: '',
        start: false,
        remark: ''
      },
      ruleValidata: {
        name: [{ required: true, message: languageList.dictionariesName, trigger: 'blur' }],
        keys: [{ required: true, message: languageList.dictionariesKey, trigger: 'blur' }],
        code: [{ required: true, message: languageList.dictionariesCode, trigger: 'blur' }],
        value: [{ required: true, message: languageList.dictionariesValue, trigger: 'blur' }],
        status: [{ required: true, message: languageList.dictionariesStatus, trigger: 'blur' }]
      }
    }
  },
  components: {
    TableColum,
    PageSize
  },
  mixins: [tableEvent],
  methods: {
    submitForm (formNode) {
    },
    editMessage (val) {
      console.log(val)
      this.dialogVisible = true
      const { name, keys, code, remark, value, status, start } = val
      this.ruleDialog.name = name
      this.ruleDialog.keys = keys
      this.ruleDialog.code = code
      this.ruleDialog.value = value
      this.ruleDialog.status = status
      this.ruleDialog.start = start
      this.ruleDialog.remark = remark
    },
    deleteRow (val) {
    },
    editDetail (fromNode) {
      this.$refs[fromNode].validate((valid) => {
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
