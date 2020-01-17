<template>
  <div class="whiteBack">
    <div class="editInput">
      <el-form :inline="true" :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名：" prop="username">
          <el-input v-model.trim="ruleForm.username" placeholder="请输入姓名" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="账号/手机：" prop="phone">
          <el-input v-model.trim="ruleForm.phone" placeholder="请输入账号/手机" autocomplete="off"></el-input>
        </el-form-item>
        <tree-data class="el-form-item el-form-item--feedback" :company="ruleForm.company" :treeData="treeData" leftNumber="100px" @changeCompany="changeCompany"></tree-data>
        <el-form-item label="角色：" prop="role">
          <el-select v-model="ruleForm.role" placeholder="请选择角色" @change="roleChange" filterable>
            <el-option label="街道一" value="j1"></el-option>
            <el-option label="街道二" value="j2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="责任区域：" prop="region">
          <el-select v-model="ruleForm.region" placeholder="请选择责任区域" @change="regionChange" filterable>
            <el-option label="街道一" value="j1"></el-option>
            <el-option label="街道二" value="j2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="submitForm('ruleForm')">查询</el-button>
          <el-button icon="el-icon-set-up" @click="resetForm('ruleForm')">重置</el-button>
          <el-button type="primary" icon="el-icon-circle-plus" @click="addForm">添加</el-button>
          <el-button type="danger" icon="el-icon-set-up" @click="resetPassword">重置密码</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="deleteForm">删除</el-button>
          <el-button type="success" icon="el-icon-download" @click="exportForm('单位用户数据表')">导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <table-colum :loading="loading" :tableHead="tableHead" :tableData="tableData" :status="tableStatus"
                 @handleCheckBox="editCheckBox" @handleRow="editMessage" @deleteRow="deleteRow"></table-colum>
    <page-size :total="total" :currentPage="currentPage" :pageSize="pageSize" @tableDataSize="tableSize" @tableDataPage="tablePage"></page-size>
    <el-dialog class="treeDialogList" title="人员添加 / 编辑" :visible.sync="dialogVisible" width="400px" :before-close="handleClose">
      <div class="dialogList inputAuto">
        <el-form :model="ruleDialog" :rules="ruleValidata" status-icon ref="dialogItem" label-width="100px" class="demo-ruleForm">
          <el-form-item label="姓名：" prop="name">
            <el-input v-model.trim="ruleDialog.name" placeholder="请输入姓名" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="账号/手机：" prop="phone">
            <el-input v-model.trim="ruleDialog.phone" placeholder="请输入账号/手机" autocomplete="off"></el-input>
          </el-form-item>
          <tree-data class="el-form-item el-form-item--feedback" :company="ruleDialog.company" :treeData="treeData" leftNumber="100px" @changeCompany="dialogCompany"></tree-data>
          <el-form-item label="角色：" prop="role">
            <el-select class="blockInput" v-model="ruleDialog.role" placeholder="请选择角色" @change="roleDialog" filterable>
              <el-option label="小区经理" value="1"></el-option>
              <el-option label="小区员工" value="2"></el-option>
              <el-option label="区域经理" value="3"></el-option>
              <el-option label="区域回收员" value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-collapse-transition>
            <div v-if="showSuperior">
              <el-form-item label="直属上级：" prop="superior">
                <el-select class="blockInput" v-model="ruleDialog.superior" placeholder="请选择直属上级" filterable>
                  <el-option label="刘元" value="10"></el-option>
                  <el-option label="澄江" value="11"></el-option>
                  <el-option label="吴浩" value="12"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-collapse-transition>
          <el-form-item label="责任区域：" prop="region">
            <el-select class="blockInput" v-model="ruleDialog.region" placeholder="请选择责任区域" multiple collapse-tags filterable>
              <el-option label="街道一" value="j1"></el-option>
              <el-option label="街道二" value="j2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否启用：" class="bottomNone" prop="isEnable">
            <el-radio-group v-model="ruleDialog.isEnable">
              <el-radio label="1">启用</el-radio>
              <el-radio label="2">停用</el-radio>
            </el-radio-group>
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
import TreeData from '../../common/treeData'
import PageSize from '../../common/pageSize'
import { getTree } from '../../../api/slidebar'
import { tableEvent } from '../../../utils/mixin'
import { languageList } from '../../../utils/validate'
export default {
  name: 'enterprise',
  data () {
    return {
      ruleForm: {
        username: '',
        phone: '',
        company: '',
        region: '',
        role: ''
      },
      tableHead: [
        { align: 'center', prop: 'name', name: '姓名', width: '150' },
        { align: 'center', prop: 'accountNumber', name: '账号', width: '200' },
        { align: 'center', prop: 'company', name: '归属企业', width: '180' },
        { align: 'center', prop: 'role', name: '角色', width: '180' },
        { align: 'left', prop: 'region', name: '责任区域', width: 'auto' },
        { align: 'center', prop: 'status', name: '状态', width: '150' }
      ],
      tableData: [
        { name: '王小虎1', accountNumber: '34012126661', company: '庐阳交警大队', role: '系统管理员1', region: '庐阳区', status: '已分配' },
        { name: '王小虎2', accountNumber: '34012126662', company: '庐阳交警大队', role: '系统管理员2', region: '庐阳区', status: '已分配' },
        { name: '王小虎3', accountNumber: '34012126663', company: '庐阳交警大队', role: '系统管理员3', region: '庐阳区', status: '已分配' },
        { name: '王小虎4', accountNumber: '34012126664', company: '庐阳交警大队', role: '系统管理员4', region: '庐阳区', status: '已分配' },
        { name: '王小虎5', accountNumber: '34012126665', company: '庐阳交警大队', role: '系统管理员5', region: '庐阳区', status: '已分配' },
        { name: '王小虎6', accountNumber: '34012126666', company: '庐阳交警大队', role: '系统管理员6', region: '庐阳区', status: '已分配' }
      ],
      tableStatus: '2',
      treeData: [],
      ruleDialog: {
        name: '',
        phone: '',
        company: '',
        region: [],
        role: '',
        superior: '',
        isEnable: '1'
      },
      ruleValidata: {
        name: [{ required: true, message: languageList.name, trigger: 'blur' }],
        phone: [{ required: true, message: languageList.user, trigger: 'blur' }],
        company: [{ required: true, message: languageList.comapny, trigger: 'blur' }],
        region: [{ required: true, message: languageList.region, trigger: 'change' }],
        role: [{ required: true, message: languageList.role, trigger: 'change' }],
        superior: [{ required: true, message: languageList.superior, trigger: 'change' }],
        isEnable: [{ required: true, message: languageList.isOff, trigger: 'change' }]
      },
      showSuperior: false
    }
  },
  mixins: [tableEvent],
  mounted () {
    getTree().then(res => {
      this.treeData = res.data
    }).catch(_ => {
      console.log('树级列表获取出错')
    })
  },
  components: {
    TableColum,
    TreeData,
    PageSize
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
    roleChange (val) {
      console.log(val)
    },
    regionChange (val) {
      console.log(val)
    },
    editMessage (val) {
      const { name, company, accountNumber } = val
      const roleVal = '2'
      this.dialogVisible = true
      this.ruleDialog.name = name
      this.ruleDialog.company = company
      this.ruleDialog.phone = accountNumber
      this.ruleDialog.region = ['j1', 'j2']
      this.ruleDialog.role = roleVal
      if (roleVal === '1' || roleVal === '3') this.showSuperior = true
      else this.showSuperior = false
    },
    deleteRow (val) {
      console.log('删除此行', val)
    },
    changeCompany (val) {
      this.ruleForm.company = val
    },
    editDetail (fromNode) {
      this.$refs[fromNode].validate((valid) => {
        if (valid) {
          console.log(this.ruleDialog)
        } else {
          return false
        }
      })
    },
    dialogCompany (val) {
      this.ruleDialog.company = val
    },
    roleDialog (val) {
      if (val === '1' || val === '3') this.showSuperior = true
      else this.showSuperior = false
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
