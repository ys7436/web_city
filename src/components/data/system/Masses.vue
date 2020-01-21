<template>
  <div class="whiteBack">
    <div v-show="isDetail">
      <div ref="whiteForm" class="whiteForm editInput">
        <el-form :inline="true" :model="ruleForm" :rules="rule" status-icon ref="ruleForm" label-width="120px" class="demo-ruleForm">
          <el-form-item label="用户：" prop="username">
            <el-input v-model.trim="ruleForm.username" placeholder="请输入用户" autocomplete="off"></el-input>
          </el-form-item>
          <tree-data class="el-form-item el-form-item--feedback" :labelName="labelName" :company="ruleForm.company" :treeData="treeData" leftNumber="100px" @changeCompany="changeCompany"></tree-data>
          <el-form-item label="楼栋：" prop="floor">
            <el-select v-model="ruleForm.floor" placeholder="请选择楼栋" filterable>
              <el-option label="楼栋一" value="l1"></el-option>
              <el-option label="楼栋二" value="l2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单元：" prop="unit">
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
          <el-table-column fixed align="center" type="selection" width="40"></el-table-column>
          <el-table-column label="姓名" prop="reaName" width="120" align="center">
            <template slot-scope="scope">
              <span v-if="scope.column.property === 'reaName' && scope.row.icon !== ''">
                <img class="scopeImg" :src="scope.row.avatar ? scope.row.avatar : headImg" alt="" /> {{ scope.column.label ? scope.column.label : '' }}
              </span>
              <span v-else>{{ scope.column.label ? scope.column.label : '' }}</span>
            </template>
          </el-table-column>
          <el-table-column :formatter="formatter" label="身份证" prop="certificate" width="200" align="center"></el-table-column>
          <el-table-column :formatter="formatter" label="手机" prop="phone" width="150" align="center"></el-table-column>
          <el-table-column :formatter="formatter" label="区域" prop="area" width="300"></el-table-column>
          <el-table-column :formatter="formatter" label="小区/路段" prop="office" width="auto" align="center"></el-table-column>
          <el-table-column :formatter="formatter" label="户号" prop="defaultDoor" width="150" align="center"></el-table-column>
          <el-table-column label="角色" prop="residType" width="100" align="center">
            <template slot-scope="scope">
              <span>
                {{ scope.column.label === 0 ? '户主' : ( scope.column.label === 1 ? '住户' : '租户' ) }}
              </span>
            </template>
          </el-table-column>
          <el-table-column :formatter="formatter" sortable label="注册日期" prop="createTime" width="180" align="center"></el-table-column>
          <el-table-column :formatter="formatter" sortable label="最后登录" prop="lastLoginTime" width="180" align="center"></el-table-column>
          <el-table-column :formatter="formatter" fixed="right" label="操作" width="120" align="center">
            <div slot-scope="scope">
              <el-button icon="el-icon-zoom-in" @click="editMessage(scope.row)" type="primary" size="mini">查看</el-button>
            </div>
          </el-table-column>
        </el-table>
        <page-size :total="total" :currentPage="currentPage" :pageSize="pageSize" @tableDataSize="tableSize" @tableDataPage="tablePage"></page-size>
      </div>
    </div>
    <transition mode="out-in" name="slideSwiper">
      <div class="massesDetail" v-if="!isDetail">
        <masses-flag :massesDetail="massesDetail">
          <el-button plain icon="el-icon-back" class="goBack" slot="back" @click="goBack">返回</el-button>
        </masses-flag>
      </div>
    </transition>
  </div>
</template>

<script>
import PageSize from '../../common/pageSize'
import TreeData from '../../common/treeData'
import MassesFlag from './common/massesFlag'
import { getTree } from '../../../api/slidebar'
import { height } from '../../../utils/function'
import { massesTableList } from '../../../api/system/masses'
export default {
  name: 'Masses',
  components: {
    PageSize,
    TreeData,
    MassesFlag
  },
  data () {
    return {
      headImg: require('../../../assets/images/head.png'),
      isDetail: true,
      massesDetail: {},
      labelName: '区域：',
      loading: false,
      selectType: false,
      ruleForm: {
        username: '',
        region: '',
        floor: '',
        unit: '',
        registerTime: [],
        loginTime: [],
        company: ''
      },
      rule: {},
      tableData: [],
      multipleSelection: null,
      dialogVisible: false,
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
    this.initTable()
  },
  methods: {
    initConfig () {
      const that = this.ruleForm
      let data = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        keyword: that.username, // 名称
        officeId: '', //
        building: '',
        unitno: '',
        regBeginDate: that.registerTime[0] || '',
        regEndDate: that.registerTime[1] || '',
        loginBeginDate: that.loginTime[0] || '',
        loginEndDate: that.loginTime[1] || ''
      }
      return data
    },
    initTable () {
      const data = this.initConfig()
      this.loading = true
      massesTableList(data).then(res => {
        console.log(res)
        if (res.code === 0) {
          this.tableData = res.data.rows
          this.total = res.data.total
        } else {
          this.$notify({
            title: '警告',
            message: res.msg,
            type: 'warning'
          })
        }
        this.loading = false
      }).catch(() => {
        this.$notify.error({
          title: '错误',
          message: '服务器获取数据异常'
        })
        this.loading = false
      })
    },
    goBack () {
      this.isDetail = true
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm)
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
    editCheckBox (val) {
      this.multipleSelection = val
    },
    editMessage (val) {
      this.isDetail = false
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
      this.initTable()
    },
    formatter (row, column, cellValue) {
      if (cellValue === null) return ''
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
  .massesDetail {
    position: absolute;
    left: 30px;
    top: 70px;
    right: 30px;
    bottom: 20px;
    z-index: 100;
  }
  .goBack {
    position: absolute;
    right: 20px;
    top: 5px;
  }
</style>
