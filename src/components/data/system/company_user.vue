<template>
  <div class="whiteBack">
    <div class="whiteForm editInput">
      <el-form :inline="true" :model="ruleForm" status-icon ref="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户：" prop="account">
          <el-input v-model.trim="ruleForm.account" placeholder="请输入用户" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色：" prop="role">
          <el-input v-model.trim="ruleForm.role" placeholder="请输入角色" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态：" prop="status">
          <el-select v-model="ruleForm.status" placeholder="请选择状态" filterable>
            <el-option label="启用" value="1"></el-option>
            <el-option label="停用" value="2"></el-option>
          </el-select>
        </el-form-item>
        <tree-data class="el-form-item el-form-item--feedback" :company="ruleForm.company" :treeData="treeData" leftNumber="100px" @changeCompany="changeRole"></tree-data>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="submitForm('ruleForm')">查询</el-button>
          <el-button icon="el-icon-set-up" @click="resetForm('ruleForm')">重置</el-button>
          <el-button type="primary" icon="el-icon-circle-plus" @click="addForm">添加</el-button>
          <el-button type="danger" icon="el-icon-set-up" @click="resetPassword">重置密码</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="deleteForm">删除</el-button>
          <el-button type="success" icon="el-icon-download" @click="exportForm">导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="whiteTable">
      <table-colum :loading="loading" :tableHead="tableHead" :tableData="tableData" :status="tableStatus"
                   @handleCheckBox="editCheckBox" @handleRow="editMessage" @deleteRow="deleteRow"></table-colum>
      <page-size :total="total" :currentPage="currentPage" :pageSize="pageSize" @tableDataSize="tableSize" @tableDataPage="tablePage"></page-size>
    </div>
    <el-dialog class="treeDialogList" title="单位用户编辑" :visible.sync="dialogVisible" width="400px" :before-close="handleClose">
      <div class="dialogList inputAuto">
        <el-form ref="dialogItem" :model="ruleDialog" status-icon :rules="DialogRules" class="demo-form-inline" label-width="100px">
          <el-form-item label="姓名：" prop="name">
            <el-input v-model.trim="ruleDialog.name" placeholder="请输入姓名" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="手机：" prop="phone">
            <el-input v-model.trim="ruleDialog.phone" placeholder="请输入手机号码" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色：" prop="role">
            <el-select class="blockInput" v-model="ruleDialog.role" placeholder="请选择角色" filterable>
              <el-option label="庐阳区城管局管理员" value="10"></el-option>
              <el-option label="逍遥津街道管理员" value="11"></el-option>
              <el-option label="三孝口街道管理员" value="12"></el-option>
              <el-option label="四里河社区管理员" value="13"></el-option>
            </el-select>
          </el-form-item>
          <tree-data :treeData="treeData" :company="ruleDialog.company" leftNumber="100px" @changeCompany="changeCompany"></tree-data>
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
import TreeData from '../../common/treeData'
import { exportExcel } from '../../../utils/function'
import { getTree } from '../../../api/slidebar'
import { languageList } from '../../../utils/validate'
export default {
  name: 'company_user',
  data () {
    return {
      regionList: {},
      ruleForm: {
        account: '',
        status: '',
        role: '',
        company: ''
      },
      rules: {},
      tableHead: [
        { align: 'center', prop: 'name', name: '姓名', width: '200' },
        { align: 'center', prop: 'account_number', name: '账号', width: '200' },
        { align: 'center', prop: 'company', name: '归属机构', width: '200' },
        { align: 'center', prop: 'role', name: '角色', width: '200' },
        { align: 'center', prop: 'status', name: '状态', width: 'auto' }
      ],
      tableData: [
        { name: '王小虎1', account_number: '34012126661', company: '街道办事处', role: '系统管理员1', status: '已分配' },
        { name: '王小虎2', account_number: '34012126662', company: '街道办事处', role: '系统管理员2', status: '已分配' },
        { name: '王小虎3', account_number: '34012126663', company: '街道办事处', role: '系统管理员3', status: '已分配' },
        { name: '王小虎4', account_number: '34012126664', company: '街道办事处', role: '系统管理员4', status: '已分配' },
        { name: '王小虎5', account_number: '34012126665', company: '街道办事处', role: '系统管理员5', status: '已分配' },
        { name: '王小虎6', account_number: '34012126666', company: '街道办事处', role: '系统管理员6', status: '已分配' }
      ],
      loading: false,
      multipleSelection: null,
      total: 400,
      pageSize: 20,
      currentPage: 1,
      tableStatus: '2',
      dialogVisible: false,
      ruleDialog: {
        name: '',
        phone: '',
        company: '',
        role: '',
        resource: '1'
      },
      DialogRules: {
        name: [{ required: true, message: languageList.name, trigger: 'blur' }],
        phone: [{ required: true, message: languageList.rePhone, trigger: 'blur' }],
        company: [{ required: true, message: languageList.mechanism, trigger: 'blur' }],
        role: [{ required: true, message: languageList.role, trigger: 'change' }]
      },
      treeData: []
    }
  },
  components: {
    TableColum,
    PageSize,
    TreeData
  },
  mounted () {
    getTree().then(res => {
      this.treeData = res.data
    }).catch(_ => {
      console.log('树级列表获取出错')
    })
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = Object.assign(this.ruleForm, this.regionList)
          console.log(data)
        } else {
          return false
        }
      })
    },
    addForm () {
      this.dialogVisible = true
      this.ruleDialog.name = ''
      this.ruleDialog.phone = ''
      this.ruleDialog.company = ''
      this.ruleDialog.role = '10'
      this.ruleDialog.resource = '1'
    },
    resetPassword () {
      this.$confirm('此操作将会让密码重置为：123456', '重置提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '密码重置成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消重置'
        })
      })
    },
    deleteForm () {},
    exportForm () {
      exportExcel('单位用户数据表', '.table')
    },
    resetForm (formName) {
      this.selectType = true
      this.$refs[formName].resetFields()
    },
    editCheckBox (val) {
      this.multipleSelection = val
    },
    editMessage (val) {
      this.dialogVisible = true
      this.ruleDialog.name = val.name
      this.ruleDialog.phone = val.account_number
      this.ruleDialog.company = val.company
      this.ruleDialog.role = val.role
    },
    deleteRow (val) {
      console.log('删除此行', val)
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
    handleClose () {
      this.dialogVisible = false
      console.log('关闭弹窗')
    },
    editDetail (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          console.log(this.ruleDialog)
        } else {
          return false
        }
      })
    },
    changeCompany (val) {
      this.ruleDialog.company = val.data.label
    },
    changeRole (val) {
      this.ruleForm.company = val.data.label
    }
  }
}
</script>

<style scoped lang="scss">
  .dialogList {
    overflow: initial;
    overflow: inherit;
    overflow: visible;
  }
</style>
