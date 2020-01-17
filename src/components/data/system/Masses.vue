<template>
  <div class="whiteBack">
    <div class="editInput">
      <el-form :inline="true" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="username">
          <el-input v-model.trim="ruleForm.username" placeholder="请输入姓名" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证" prop="userId">
          <el-input v-model.trim="ruleForm.userId" placeholder="请输入身份证号" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model.trim="ruleForm.phone" placeholder="请输入身手机号" autocomplete="off"></el-input>
        </el-form-item>
        <cascade :selectType="selectType" @changeSelect="changeSelect"></cascade>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="submitForm('ruleForm')">查询</el-button>
          <el-button type="success" icon="el-icon-download" @click="exportForm('用户数据表')">导出</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="deleteForm('ruleForm')">删除</el-button>
          <el-button icon="el-icon-set-up" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <table-colum :loading="loading" :tableHead="tableHead" :tableData="tableData" :status="tableStatus"
                 @handleCheckBox="editCheckBox" @handleRow="editMessage"></table-colum>
    <page-size :total="total" :currentPage="currentPage" :pageSize="pageSize" @tableDataSize="tableSize" @tableDataPage="tablePage"></page-size>
    <el-dialog title="用户编辑" :visible.sync="dialogVisible" width="840px" :before-close="handleClose">
      <div class="dialogList editInput">
        <el-form :inline="true" ref="dialogItem" class="demo-form-inline" label-width="100px">
          <div class="titleList">在住地址</div>
          <el-form-item label="姓名：">
            <el-input value="李磊" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="手机：">
            <el-input value="15155556666" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="身份证：">
            <el-input value="34012119951010254x" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="区/县：">
            <el-input value="庐阳区" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="乡镇/街道：">
            <el-input value="四里河街道" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="社区：">
            <el-input value="莲花社区" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="网格：">
            <el-input value="1号网格" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="小区：">
            <el-input value="光明橡树湾" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="楼号：">
            <el-input value="15" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="单元：">
            <el-input value="2单元" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="门牌号：">
            <el-input value="1506" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="类型：">
            <el-input value="户主" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="家庭成员">
            <el-checkbox-group v-model="addressItem">
              <el-checkbox v-for="item in personList" :key="item" :label="item" disabled></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <div class="titleList">其他地址</div>
          <el-form-item label="区/县：">
            <el-input value="庐阳区" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="乡镇/街道：">
            <el-input value="四里河街道" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="社区：">
            <el-input value="莲花社区" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="网格：">
            <el-input value="1号网格" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="小区：">
            <el-input value="光明橡树湾" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="楼号：">
            <el-input value="15" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="单元：">
            <el-input value="2单元" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="门牌号：">
            <el-input value="1506" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="类型：">
            <el-input value="住户" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="其他家庭成员" class="bottomNone"></el-form-item>
          <div class="lineTitle"></div>
          <el-form-item label="收货地址1：" class="blockInput">
            <el-input value="收货地址收货地址收货地址收货地址收货地址收货地址" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="收货地址2：" class="blockInput bottomNone">
            <el-input value="收货地址收货地址收货地址收货地址收货地址收货地址" :disabled="true"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import cascade from '../../common/cascade'
import PageSize from '../../common/pageSize'
import { userPhone, userId } from '../../../utils/validate'
import { exportExcel } from '../../../utils/function'
import TableColum from '../../common/tablecolum'
export default {
  name: 'Masses',
  components: {
    cascade,
    PageSize,
    TableColum
  },
  data () {
    return {
      loading: false,
      selectType: false,
      regionList: {},
      ruleForm: {
        username: '',
        userId: '',
        phone: ''
      },
      rules: {
        userId: [{ validator: userId, trigger: 'change' }],
        phone: [{ validator: userPhone, trigger: 'change' }]
      },
      tableHead: [
        { align: 'center', prop: 'name', name: '姓名', width: '120' },
        { align: 'center', prop: 'userId', name: '身份证', width: '200' },
        { align: 'center', prop: 'phone', name: '手机', width: '150' },
        { align: 'left', prop: 'region', name: '区县', width: '120' },
        { align: 'left', prop: 'country', name: '乡镇', width: '120' },
        { align: 'left', prop: 'street', name: '街道', width: '180' },
        { align: 'left', prop: 'community', name: '社区', width: '150' },
        { align: 'center', prop: 'grid', name: '网格', width: '120' },
        { align: 'left', prop: 'road', name: '小区/路段', width: 'auto' },
        { align: 'center', prop: 'floor', name: '楼号', width: '100' },
        { align: 'center', prop: 'unit', name: '单元', width: '100' }
      ],
      tableData: [
        { name: '王小虎1', userId: '340121199512126661', phone: '15155556666', region: '普陀区1', country: '莲花乡1', street: '莲花街道', community: '莲花社区', grid: '1#网格', road: '莲花路', floor: '1号楼', unit: '1单元' },
        { name: '王小虎2', userId: '340121199512126662', phone: '15155557777', region: '普陀区2', country: '莲花乡2', street: '莲花街道', community: '莲花社区', grid: '1#网格', road: '莲花路', floor: '1号楼', unit: '1单元' },
        { name: '王小虎3', userId: '340121199512126663', phone: '15155558888', region: '普陀区3', country: '莲花乡3', street: '莲花街道', community: '莲花社区', grid: '1#网格', road: '莲花路', floor: '1号楼', unit: '1单元' },
        { name: '王小虎4', userId: '340121199512126664', phone: '15155559999', region: '普陀区4', country: '莲花乡4', street: '莲花街道', community: '莲花社区', grid: '1#网格', road: '莲花路', floor: '1号楼', unit: '1单元' },
        { name: '王小虎5', userId: '340121199512126665', phone: '15155550000', region: '普陀区5', country: '莲花乡5', street: '莲花街道', community: '莲花社区', grid: '1#网格', road: '莲花路', floor: '1号楼', unit: '1单元' },
        { name: '王小虎6', userId: '340121199512126666', phone: '15155551111', region: '普陀区6', country: '莲花乡6', street: '莲花街道', community: '莲花社区', grid: '1#网格', road: '莲花路', floor: '1号楼', unit: '1单元' }
      ],
      multipleSelection: null,
      dialogVisible: false,
      personList: ['姚明', '孙悦', '周琦'],
      addressItem: ['姚明', '孙悦'],
      total: 400,
      pageSize: 20,
      currentPage: 1,
      tableStatus: '1'
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // const data = Object.assign(this.ruleForm, this.regionList)
          // console.log(data)
        } else {
          return false
        }
      })
    },
    deleteForm () { // 删除功能
    },
    exportForm () { // 导出功能
      exportExcel('用户数据表', '.table')
    },
    resetForm (formName) {
      this.selectType = true
      this.$refs[formName].resetFields()
    },
    changeSelect (val) {
      this.regionList = val
      this.selectType = false
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        }).catch(_ => {})
    },
    editCheckBox (val) {
      this.multipleSelection = val
    },
    editMessage (val) {
      this.dialogVisible = true
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
  @import '../../../assets/mixin';
  .lineTitle {
    margin-bottom: 15px;
    @include top_color(#ddd);
  }
</style>
