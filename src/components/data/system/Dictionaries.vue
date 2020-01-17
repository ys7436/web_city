<template>
  <div class="whiteBack">
    <div class="editInput">
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
    <table-colum :loading="loading" :tableHead="tableHead" :tableData="tableData" :status="tableStatus"
                 @handleCheckBox="editCheckBox" @handleRow="editMessage" @deleteRow="deleteRow"></table-colum>
    <page-size :total="total" :currentPage="currentPage" :pageSize="pageSize" @tableDataSize="tableSize" @tableDataPage="tablePage"></page-size>
    <el-dialog class="treeDialogList" title="字典添加 / 编辑" :visible.sync="dialogVisible" width="400px" :before-close="handleClose">
      <div class="dialogList inputAuto">
        <el-form :model="ruleDialog" :rules="ruleValidata" status-icon ref="dialogItem" label-width="100px" class="demo-ruleForm">
          <el-form-item label="字典名称：" prop="name">
            <el-input v-model.trim="ruleDialog.name" placeholder="请输入字典名称" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="键值：" prop="keys">
            <el-input v-model.trim="ruleDialog.keys" placeholder="请输入键值" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="编码：" prop="code">
            <el-input v-model.trim="ruleDialog.code" placeholder="请输入编码" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input v-model.trim="ruleDialog.remark" placeholder="请输入备注" autocomplete="off"></el-input>
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
        { align: 'center', prop: 'name', name: '字典名称', width: '200' },
        { align: 'center', prop: 'keys', name: '键值', width: '200' },
        { align: 'center', prop: 'code', name: '编码', width: '200' },
        { align: 'left', prop: 'remark', name: '备注', width: 'auto' }
      ],
      tableData: [
        { name: '王小虎1', keys: '34012126661', code: '12s4s52ss', remark: '系统管理员1' },
        { name: '王小虎2', keys: '34012126662', code: '12s4s52ss', remark: '系统管理员2' },
        { name: '王小虎3', keys: '34012126663', code: '12s4s52ss', remark: '系统管理员3' },
        { name: '王小虎4', keys: '34012126664', code: '12s4s52ss', remark: '系统管理员4' },
        { name: '王小虎5', keys: '34012126665', code: '12s4s52ss', remark: '系统管理员5' },
        { name: '王小虎6', keys: '34012126666', code: '12s4s52ss', remark: '系统管理员6' }
      ],
      tableStatus: '2',
      ruleDialog: {
        name: '',
        keys: '',
        code: '',
        remark: ''
      },
      ruleValidata: {
        name: [{ required: true, message: languageList.dictionariesName, trigger: 'blur' }],
        keys: [{ required: true, message: languageList.dictionariesKey, trigger: 'blur' }],
        code: [{ required: true, message: languageList.dictionariesCode, trigger: 'blur' }]
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
      this.dialogVisible = true
      const { name, keys, code, remark } = val
      this.ruleDialog.name = name
      this.ruleDialog.keys = keys
      this.ruleDialog.code = code
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
