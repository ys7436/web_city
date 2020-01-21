<template>
  <div class="whiteBack">
    <div class="roleManagement">
      <div class="title">角色列表</div>
      <div class="roleBtn">
        <template v-if="personDisabled">
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="dialogVisible = true">添加</el-button>
          <el-button type="danger" icon="el-icon-delete" @click="personDisabled = false">删除</el-button>
        </template>
        <template v-if="!personDisabled">
          <el-button type="primary" icon="el-icon-circle-check" @click="deleteList">确定</el-button>
          <el-button type="info" icon="el-icon-remove-outline" @click="personDisabled = true">取消</el-button>
        </template>
      </div>
      <div class="managementContent">
        <el-scrollbar :native="false" tag="div" class="managementScroll">
          <div class="item back">
            <div class="name">系统级角色：</div>
            <ul class="clearfix">
              <li v-for="item in systemRole" :class="{'active': item.id === active.systemRole}" :key="item.id" class="list" @click="systemRoleEdit(item, 'systemRole')">{{ item.name }}</li>
            </ul>
          </div>
          <div class="item">
            <div class="name">政府单位角色：</div>
            <ul class="clearfix">
              <li v-for="item in governmentRole" :class="{'active': item.id === active.governmentRole, 'noHover': !personDisabled}" :key="item.id" class="list" @click="systemRoleEdit(item, 'governmentRole')">
                <div v-if="personDisabled" key="person1">{{ item.name }}</div>
                <div v-else key="person2" class="personList">
                  <el-checkbox :disabled="personDisabled" v-model="deleteAll.governmentRole" :label="item.id">{{ item.name }}</el-checkbox>
                </div>
              </li>
            </ul>
          </div>
          <div class="item back">
            <div class="name">企业单位角色：</div>
            <ul class="clearfix">
              <li v-for="item in companyRole" :class="{'active': item.id === active.companyRole, 'noHover': !personDisabled}" :key="item.id" class="list" @click="systemRoleEdit(item, 'companyRole')">
                <div v-if="personDisabled" key="person1">{{ item.name }}</div>
                <div v-else key="person2" class="personList">
                  <el-checkbox :disabled="personDisabled" v-model="deleteAll.companyRole" :label="item.id">{{ item.name }}</el-checkbox>
                </div>
              </li>
            </ul>
          </div>
        </el-scrollbar>
      </div>
    </div>
    <management-flag :height="height"></management-flag>
    <el-dialog class="treeDialogList" title="字典添加 / 编辑" :visible.sync="dialogVisible" width="400px" :before-close="handleClose">
      <div class="dialogList inputAuto">
        <el-form :model="addRuleDialog" :rules="ruleValidata" status-icon ref="dialogItem" label-width="100px" class="demo-ruleForm">
          <el-form-item label="角色名称：" prop="name">
            <el-input v-model.trim="addRuleDialog.name" placeholder="请输入角色名称" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色类型：" prop="status">
            <el-select class="blockInput" v-model="addRuleDialog.status" placeholder="请选择角色类型" filterable>
              <el-option label="系统级角色" value="systemRole"></el-option>
              <el-option label="政府单位角色" value="governmentRole"></el-option>
              <el-option label="企业单元角色" value="companyRole"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editDetail('dialogItem')">确 定</el-button>
      </div>
    </el-dialog>
    <div class="updatePerson">创建者：admin 创建时间：2020-01-02 更新者：指挥中心管理员 更新时间：2020-02-05</div>
  </div>
</template>

<script>
import ManagementFlag from './common/ManagementFlag'
export default {
  name: 'RoleManagement',
  data () {
    return {
      systemRole: [
        { name: '超级管理员', id: '1' },
        { name: '户主', id: '2' },
        { name: '住户', id: '3' },
        { name: '租户', id: '4' }
      ],
      governmentRole: [
        { name: '角色1', id: 'g1' },
        { name: '角色2', id: 'g2' },
        { name: '角色3', id: 'g3' },
        { name: '角色4', id: 'g4' },
        { name: '角色5', id: 'g5' },
        { name: '角色6', id: 'g6' },
        { name: '角色7', id: 'g7' },
        { name: '角色8', id: 'g8' },
        { name: '角色9', id: 'g9' },
        { name: '角色10', id: 'g10' },
        { name: '角色11', id: 'g11' },
        { name: '角色12', id: 'g12' },
        { name: '角色13', id: 'g13' },
        { name: '角色14', id: 'g14' },
        { name: '角色15', id: 'g15' },
        { name: '角色16', id: 'g16' },
        { name: '角色17', id: 'g17' },
        { name: '角色18', id: 'g18' },
        { name: '角色19', id: 'g19' },
        { name: '角色20', id: 'g20' }
      ],
      companyRole: [
        { name: '企业1', id: 'c1' },
        { name: '企业2', id: 'c2' },
        { name: '企业3', id: 'c3' },
        { name: '企业4', id: 'c4' },
        { name: '企业5', id: 'c5' }
      ],
      active: {
        systemRole: '',
        governmentRole: '',
        companyRole: ''
      },
      personDisabled: true,
      height: '500px',
      deleteAll: {
        governmentRole: [],
        companyRole: []
      },
      addRuleDialog: {
        name: '',
        status: ''
      },
      ruleValidata: {
        name: [{ required: true, message: '必选', trigger: 'blur' }],
        status: [{ required: true, message: '必选', trigger: 'change' }]
      },
      dialogVisible: false
    }
  },
  mounted () {
    this.height = this.$el.clientHeight - 464 + 'px'
  },
  components: {
    ManagementFlag
  },
  methods: {
    systemRoleEdit (item, key) {
      this.active[key] = item.id
    },
    deleteList () {
      this.$confirm('是否确定删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log(this.deleteAll)
      }).catch(() => {
        this.$message({ type: 'success ', message: '已取消重置' })
      })
    },
    handleClose () {
      this.dialogVisible = false
    },
    editDetail (fromNode) {
      this.$refs[fromNode].validate((valid) => {
        if (valid) {
          console.log(this.addRuleDialog)
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../../assets/mixin";
  .back { background-color: $background; }
  .roleManagement {
    padding-top: 50px;
    position: relative;
    border: 1px solid #ddd;
    margin-bottom: 20px;
    padding-bottom: 20px;
    background-color: #fff;
    .title, .roleBtn {
      height: 50px;
      line-height: 50px;
      position: absolute;
      right: 20px;
      top: 0;
    }
    .title {
      left: 0;
      padding-left: 20px;
      padding-right: 260px;
      font-size: 16px;
      color: #333;
    }
    .managementContent {
      position: relative;
      .managementScroll {
        height: 200px;
        overflow: hidden;
        .item {
          min-height: 50px;
          padding-left: 140px;
          position: relative;
          .name, .list {
            height: 50px;
            line-height: 50px;
            color: #888;
          }
          .name {
            width: 130px;
            font-size: 16px;
            color: #333;
            position: absolute;
            left: 0;
            text-align: right;
            @include ellipsis
          }
          .list {
            min-width: 80px;
            float: left;
            padding: 0 15px;
            cursor: pointer;
            transition: all 0.2s;
            &:hover, &.active {
              background-color: $color;
              color: #fff;
            }
            &.noHover {
              background-color: transparent !important;
            }
          }
        }
      }
    }
  }
  .updatePerson {
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    color: #888;
  }
</style>
