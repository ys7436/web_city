<template>
  <div class="whiteBack">
    <div ref="whiteForm" class="whiteForm editInput">
      <el-form :inline="true" :model="ruleForm" :rules="rule" status-icon ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item label="用户：" prop="username">
          <el-input v-model.trim="ruleForm.username" placeholder="请输入用户" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="区域" prop="region">
          <el-input v-model.trim="ruleForm.region" placeholder="请输入区域" autocomplete="off"></el-input>
        </el-form-item>
        <tree-data class="el-form-item el-form-item--feedback" :company="ruleForm.company" :treeData="treeData" leftNumber="100px" @changeCompany="changeCompany"></tree-data>
        <el-form-item label="楼栋" prop="floor">
          <el-select v-model="ruleForm.floor" placeholder="请选择楼栋" filterable>
            <el-option label="楼栋一" value="l1"></el-option>
            <el-option label="楼栋二" value="l2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单元" prop="unit">
          <el-select v-model="ruleForm.unit" placeholder="请选择单元" filterable>
            <el-option label="单元一" value="d1"></el-option>
            <el-option label="单元二" value="d2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="dateForm" label="注册日期：" prop="registerTime">
          <el-date-picker
            value-format="yyyy-MM-DD"
            v-model="ruleForm.registerTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="截止日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="dateForm" label="最后登录日期：" prop="loginTime">
          <el-date-picker
            value-format="yyyy-MM-DD"
            v-model="ruleForm.loginTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="截止日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="submitForm('ruleForm')">查询</el-button>
          <el-button icon="el-icon-refresh" @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="whiteTable">
      <el-table v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" class="table"
                :max-height="heightAll" desc="{prop: 'login', order: 'descending'}" :data="tableData" border style="width: 100%" tooltip-effect="dark" :stripe="true" @selection-change="editCheckBox">
        <el-table-column label="姓名" prop="name" width="120" align="center">
          <template slot-scope="scope">
            <span v-if="scope.column.property === 'name' && scope.row.icon !== ''">
              <img class="scopeImg" :src="scope.row.icon" alt="" /> {{ scope.column.label ? scope.column.label : '' }}
            </span>
            <span v-else>{{ scope.column.label ? scope.column.label : '' }}</span>
          </template>
        </el-table-column>
        <el-table-column :formatter="formatter" label="身份证" prop="userId" width="200" align="center"></el-table-column>
        <el-table-column :formatter="formatter" label="手机" prop="phone" width="150" align="center"></el-table-column>
        <el-table-column :formatter="formatter" label="区域" prop="region" width="120" align="center"></el-table-column>
        <el-table-column :formatter="formatter" label="小区/路段" prop="road" width="auto" align="center"></el-table-column>
        <el-table-column :formatter="formatter" label="户号" prop="floor" width="150" align="center"></el-table-column>
        <el-table-column :formatter="formatter" label="角色" prop="unit" width="100" align="center"></el-table-column>
        <el-table-column :formatter="formatter" sortable label="注册日期" prop="register" width="180" align="center"></el-table-column>
        <el-table-column :formatter="formatter" sortable label="最后登录" prop="login" width="180" align="center"></el-table-column>
        <el-table-column :formatter="formatter" fixed="right" label="操作" width="120" align="center">
          <div slot-scope="scope">
            <el-button icon="el-icon-zoom-in" @click="editMessage(scope.row)" type="primary" size="mini">查看</el-button>
          </div>
        </el-table-column>
      </el-table>
      <page-size :total="total" :currentPage="currentPage" :pageSize="pageSize" @tableDataSize="tableSize" @tableDataPage="tablePage"></page-size>
    </div>
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
import PageSize from '../../common/pageSize'
import TreeData from '../../common/treeData'
import { getTree } from '../../../api/slidebar'
import { height } from '../../../utils/function'
export default {
  name: 'Masses',
  components: {
    PageSize,
    TreeData
  },
  data () {
    return {
      loading: false,
      selectType: false,
      regionList: {},
      ruleForm: {
        username: '',
        region: '',
        floor: '',
        unit: '',
        registerTime: '',
        loginTime: '',
        company: ''
      },
      rule: {},
      tableData: [
        { name: '王小虎1', icon: require('../../../assets/images/t1.png'), userId: '340121199512126661', phone: '15155556666', region: '普陀区1', road: '莲花路', floor: '1号楼1单元', unit: '户主', register: '2019-11-06', login: '2019-12-06' },
        { name: '王小虎2', icon: require('../../../assets/images/t2.png'), userId: '340121199512126662', phone: '15155557777', region: '普陀区2', road: '莲花路', floor: '1号楼1单元', unit: '户主', register: '2019-01-06', login: '2019-01-06' },
        { name: '王小虎3', icon: require('../../../assets/images/t1.png'), userId: '340121199512126663', phone: '15155558888', region: '普陀区3', road: '莲花路', floor: '1号楼1单元', unit: '户主', register: '2019-04-07', login: '2019-10-06' },
        { name: '王小虎4', icon: require('../../../assets/images/t2.png'), userId: '340121199512126664', phone: '15155559999', region: '普陀区4', road: '莲花路', floor: '1号楼1单元', unit: '户主', register: '2019-05-06', login: '2019-08-06' },
        { name: '王小虎5', icon: require('../../../assets/images/t1.png'), userId: '340121199512126665', phone: '15155550000', region: '普陀区5', road: '莲花路', floor: '1号楼1单元', unit: '户主', register: '2019-05-06', login: '2019-09-06' },
        { name: '王小虎2', icon: require('../../../assets/images/t2.png'), userId: '340121199512126662', phone: '15155557777', region: '普陀区2', road: '莲花路', floor: '1号楼1单元', unit: '户主', register: '2019-01-06', login: '2019-01-06' },
        { name: '王小虎3', icon: require('../../../assets/images/t1.png'), userId: '340121199512126663', phone: '15155558888', region: '普陀区3', road: '莲花路', floor: '1号楼1单元', unit: '户主', register: '2019-04-07', login: '2019-10-06' },
        { name: '王小虎4', icon: require('../../../assets/images/t2.png'), userId: '340121199512126664', phone: '15155559999', region: '普陀区4', road: '莲花路', floor: '1号楼1单元', unit: '户主', register: '2019-05-06', login: '2019-08-06' },
        { name: '王小虎5', icon: require('../../../assets/images/t1.png'), userId: '340121199512126665', phone: '15155550000', region: '普陀区5', road: '莲花路', floor: '1号楼1单元', unit: '户主', register: '2019-05-06', login: '2019-09-06' },
        { name: '王小虎6', icon: require('../../../assets/images/t2.png'), userId: '340121199512126666', phone: '15155551111', region: '普陀区6', road: '莲花路', floor: '1号楼1单元', unit: '户主', register: '2019-02-06', login: '2019-02-06' }
      ],
      multipleSelection: null,
      dialogVisible: false,
      personList: ['姚明', '孙悦', '周琦'],
      addressItem: ['姚明', '孙悦'],
      total: 400,
      pageSize: 20,
      currentPage: 1,
      tableStatus: '1',
      treeData: [],
      heightAll: '400px'
    }
  },
  mounted () {
    getTree().then(res => {
      this.treeData = res.data
    }).catch(_ => {
      console.log('树级列表获取出错')
    })
    this.$nextTick(() => {
      this.heightAll = height(this, this.$refs.whiteForm.offsetHeight + 150) + 'px'
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
    changeCompany (val) {
      this.ruleForm.company = val.data.label
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
    },
    formatter (row, column, cellValue) {
      if (cellValue === null) return '无'
      else return cellValue
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
