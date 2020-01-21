<template>
  <div class="roleManagement bottomNone">
    <div class="title">权限管理</div>
    <div class="roleBtn">
      <template v-if="disabled">
        <el-button type="primary" icon="el-icon-edit" @click="disabled = false">编辑</el-button>
      </template>
      <template v-if="!disabled">
        <el-button type="primary" icon="el-icon-success" @click="putJurisdiction">确定</el-button>
        <el-button type="danger" icon="el-icon-remove-outline" @click="resetJurisdiction('jurisdictionNode')">取消</el-button>
      </template>
    </div>
    <div class="managementDetail">
      <el-form ref="jurisdictionNode" :model="ruleDialog" class="clearfix">
        <div class="JurisdictionList">
          <div class="tip back">功能权限( 红色为敏感数据 )</div>
          <el-scrollbar :native="false" :style="{ 'height': height }" tag="div" class="JurisdictionScroll">
            <div class="items" v-for="(important, key) in jurisdictionList" :key="key">
              <div class="tooptip">{{ compileText(key) }}</div>
              <el-checkbox :indeterminate="indeterminate[key].data" v-model="checkAll[key].data" @change="jurisdictionAll(key)" :disabled="disabled" class="powerList" label="home_whole_1">全选</el-checkbox>
              <div v-for="item in important" :key="item.id" class="emList">
                <template v-if="item.select && item.children">
                  <el-checkbox :disabled="disabled" :indeterminate="indeterminate[key][item.id]" @change="jurisdictionItem(key, item.id, 'all')" v-model="checkAll[key][item.id]" class="powerList" :class="{'redActive': item.danger, 'actived': item.select}" label="home_whole_1_2">
                    <i v-show="item.select && item.children" class="el-icon-caret-bottom"></i>{{ item.name }}
                  </el-checkbox>
                </template>
                <template v-if="!item.select && !item.children">
                  <el-checkbox v-model="ruleDialog[key].data" @change="jurisdictionItem(key)" :disabled="disabled" class="powerList" :class="{'redActive': item.danger}" :label="item.id">{{ item.name }}</el-checkbox>
                </template>
                <div v-if="item.select && item.children" class="subsetChildren">
                  <el-scrollbar :native="false" tag="div" class="subsetChildrenScroll">
                    <el-checkbox-group v-model="ruleDialog[key][item.id]" @change="jurisdictionItem(key, item.id, 'list')">
                      <el-checkbox class="group" v-for="subset in item.children" :key="subset.id" :disabled="disabled" :label="subset.id">{{ subset.name }}</el-checkbox>
                    </el-checkbox-group>
                  </el-scrollbar>
                </div>
              </div>
            </div>
          </el-scrollbar>
        </div>
        <div class="JurisdictionList">
          <div class="tip back">数据权限</div>
          <el-scrollbar :native="false" tag="div" class="JurisdictionScroll" :style="{ 'height': height }">
            <div class="items itemLi">
              <el-radio-group v-model="ruleLevel.level">
                <el-radio @change="jurisdictionData({ name: '本级数据', id: 'all' }, 'level')" :disabled="disabled" class="powerList" label="level_whole_1">全部数据</el-radio>
                <el-radio @change="jurisdictionData(item, 'level')" :disabled="disabled" v-for="item in jurisdictionLevel.level" class="powerList" :class="{'actived': item.select}" :key="item.id" :label="item.id">
                  <i v-show="item.select" class="el-icon-caret-bottom"></i>{{ item.name }}
                </el-radio>
                <el-checkbox :disabled="disabled" v-model="ruleLevel.sensitive" class="powerList" label="disabled_001">禁止访问敏感数据</el-checkbox>
              </el-radio-group>
            </div>
            <div class="JurisdictionTree" v-show="showTree">
              <tree-data
                :expand="expand" :treeData="treeData" :checked="checked" :position="position" :company="ruleLevel.company" leftNumber="100px"
                :strictly="strictly" @checkedChange="checkedCompany" @changeCompany="changeCompany"></tree-data>
            </div>
          </el-scrollbar>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import TreeData from '../../../common/treeData'
import { getTree } from '../../../../api/slidebar'
export default {
  name: 'ManagementFlag',
  props: {
    height: {
      type: String,
      default: '500px'
    }
  },
  components: {
    TreeData
  },
  data () {
    return {
      reserveData: {},
      jurisdictionList: {
        home: [
          { name: '功能1', id: 'home1', danger: false },
          {
            name: '功能15',
            id: 'home1155',
            danger: true,
            select: true,
            children: [
              { name: 'home下拉15', id: 'home1155s1' },
              { name: 'home下拉16', id: 'home1155s2' },
              { name: 'home下拉17', id: 'home1155s3' },
              { name: 'home下拉18', id: 'home1155s4' }
            ]
          },
          { name: '功能2', id: 'home2', danger: false },
          { name: '功能3', id: 'home3', danger: true },
          { name: '功能4', id: 'home4', danger: true },
          {
            name: '功能5',
            id: 'home5',
            danger: false,
            select: true,
            children: [
              { name: 'home下拉1', id: 'hs1' },
              { name: 'home下拉2', id: 'hs2' },
              { name: 'home下拉3', id: 'hs3' },
              { name: 'home下拉4', id: 'hs4' }
            ]
          },
          { name: '功能6', id: 'home6', danger: false },
          { name: '功能7', id: 'home7', danger: false },
          { name: '功能8', id: 'home8', danger: false },
          { name: '功能9', id: 'home9', danger: false }
        ],
        device: [
          { name: '功能1', id: 'device1', danger: false },
          { name: '功能2', id: 'device2', danger: false },
          { name: '功能3', id: 'device3', danger: true },
          { name: '功能4', id: 'device4', danger: false },
          {
            name: '功能5',
            id: 'device5',
            danger: false,
            select: true,
            children: [
              { name: 'device下拉1', id: 'ds1' },
              { name: 'device下拉2', id: 'ds2' },
              { name: 'device下拉3', id: 'ds3' },
              { name: 'device下拉4', id: 'ds4' }
            ]
          },
          { name: '功能6', id: 'device6', danger: false },
          { name: '功能7', id: 'device7', danger: false },
          { name: '功能8', id: 'device8', danger: false },
          { name: '功能9', id: 'device9', danger: false }
        ],
        monitor: [
          { name: '功能1', id: 'monitor1', danger: false },
          { name: '功能2', id: 'monitor2', danger: true },
          { name: '功能3', id: 'monitor3', danger: false },
          { name: '功能4', id: 'monitor4', danger: false },
          {
            name: '功能5',
            id: 'monitor5',
            danger: false,
            select: true,
            children: [
              { name: 'monitor下拉1', id: 'ms1' },
              { name: 'monitor下拉2', id: 'ms2' },
              { name: 'monitor下拉3', id: 'ms3' },
              { name: 'monitor下拉4', id: 'ms4' }
            ]
          },
          { name: '功能6', id: 'monitor6', danger: false },
          { name: '功能7', id: 'monitor7', danger: false },
          { name: '功能8', id: 'monitor8', danger: false },
          { name: '功能9', id: 'monitor9', danger: false }
        ],
        fav: [
          { name: '功能1', id: 'fav1', danger: false },
          { name: '功能2', id: 'fav2', danger: true },
          { name: '功能3', id: 'fav3', danger: false },
          { name: '功能4', id: 'fav4', danger: false },
          {
            name: '功能5',
            id: 'fav5',
            danger: false,
            select: true,
            children: [
              { name: 'fav下拉1', id: 'fs1' },
              { name: 'fav下拉2', id: 'fs2' },
              { name: 'fav下拉3', id: 'fs3' },
              { name: 'fav下拉4', id: 'fs4' }
            ]
          },
          { name: '功能6', id: 'fav6', danger: false },
          { name: '功能7', id: 'fav7', danger: false },
          { name: '功能8', id: 'fav8', danger: false },
          { name: '功能9', id: 'fav9', danger: false }
        ],
        data: [
          { name: '功能1', id: 'data1', danger: false },
          { name: '功能2', id: 'data2', danger: true },
          { name: '功能3', id: 'data3', danger: false },
          { name: '功能4', id: 'data4', danger: false },
          {
            name: '功能5',
            id: 'data5',
            danger: false,
            select: true,
            children: [
              { name: 'data下拉1', id: 'das1' },
              { name: 'data下拉2', id: 'das2' },
              { name: 'data下拉3', id: 'das3' },
              { name: 'data下拉4', id: 'das4' }
            ]
          },
          { name: '功能6', id: 'data6', danger: false },
          { name: '功能7', id: 'data7', danger: false },
          { name: '功能8', id: 'data8', danger: false },
          { name: '功能9', id: 'data9', danger: false }
        ],
        message: [
          { name: '功能1', id: 'message1', danger: false },
          { name: '功能2', id: 'message2', danger: true },
          { name: '功能3', id: 'message3', danger: false },
          { name: '功能4', id: 'message4', danger: false },
          {
            name: '功能5',
            id: 'message15',
            danger: false,
            select: true,
            children: [
              { name: 'message下拉1', id: 'mes1' },
              { name: 'message下拉2', id: 'mes2' },
              { name: 'message下拉3', id: 'mes3' },
              { name: 'message下拉4', id: 'mes4' }
            ]
          },
          { name: '功能6', id: 'message6', danger: false },
          { name: '功能7', id: 'message7', danger: false },
          { name: '功能8', id: 'message8', danger: false },
          { name: '功能9', id: 'message9', danger: true }
        ],
        system: [
          { name: '功能1', id: 'system1', danger: false },
          { name: '功能2', id: 'system2', danger: true },
          { name: '功能3', id: 'system3', danger: false },
          { name: '功能4', id: 'system4', danger: false },
          {
            name: '功能5',
            id: 'system100',
            danger: false,
            select: true,
            children: [
              { name: 'system下拉1', id: 'ss1' },
              { name: 'system下拉2', id: 'ss2' },
              { name: 'system下拉3', id: 'ss3' },
              { name: 'system下拉4', id: 'ss4' }
            ]
          },
          { name: '功能6', id: 'system6', danger: false },
          { name: '功能7', id: 'system7', danger: false },
          { name: '功能8', id: 'system8', danger: false },
          { name: '功能9', id: 'system9', danger: true }
        ]
      },
      jurisdictionLevel: {
        level: [
          { name: '本级数据', id: 'l1' },
          { name: '本级及以上', id: 'l2', select: true },
          { name: '同级数据', id: 'l3', select: true },
          { name: '同级及以下', id: 'l4', select: true },
          { name: '自定义', id: 'l5', select: true }
        ]
      },
      ruleDialog: {
        home: { data: [] },
        device: { data: [] },
        monitor: { data: [] },
        fav: { data: [] },
        data: { data: [] },
        message: { data: [] },
        system: { data: [] }
      },
      ruleLevel: {
        level: '',
        company: '',
        sensitive: []
      },
      checkAll: {
        home: { data: false },
        device: { data: false },
        monitor: { data: false },
        fav: { data: false },
        data: { data: false },
        message: { data: false },
        system: { data: false }
      },
      indeterminate: {
        home: { data: false },
        device: { data: false },
        monitor: { data: false },
        fav: { data: false },
        data: { data: false },
        message: { data: false },
        system: { data: false }
      },
      disabled: true,
      treeData: [],
      checked: true,
      position: false,
      showTree: false,
      oldCount: {},
      expand: true,
      strictly: true
    }
  },
  created () {
    const list = this.jurisdictionList
    for (let i in list) {
      this.reserveData[i] = { data: [] }
      this.oldCount[i] = 0
      if (i !== 'level') {
        for (let j = 0; j < list[i].length; j++) {
          if (list[i][j].select && list[i][j].children && list[i][j].children.length > 0) {
            this.$set(this.ruleDialog[i], list[i][j].id, [])
            this.$set(this.checkAll[i], list[i][j].id, false)
            this.$set(this.indeterminate[i], list[i][j].id, false)
            this.$set(this.reserveData[i], list[i][j].id, [])
            for (let e = 0; e < list[i][j].children.length; e++) {
              if (this.reserveData[i].data && this.reserveData[i].data instanceof Array) {
                this.reserveData[i][list[i][j].id].push(list[i][j].children[e].id)
              } else {
                this.reserveData[i][list[i][j].id] = [list[i][j].children[e].id]
              }
              this.oldCount[i]++
            }
          } else {
            this.oldCount[i]++
            this.reserveData[i].data.push(list[i][j].id)
          }
        }
      }
    }
    getTree().then(res => {
      this.treeData = res.data
    }).catch(_ => {
      console.log('树级列表获取出错')
    })
  },
  methods: {
    checkedCompany (val) {
      console.log(val)
    },
    changeCompany (val) {
      console.log(val)
    },
    jurisdictionData (item, name) {
      if (item.select && name === 'level') {
        this.showTree = true
      } else if (!item.select && name === 'level') {
        this.showTree = false
      }
    },
    jurisdictionAll (name) {
      const status = this.checkAll[name].data
      if (status) {
        // this.ruleDialog[name] = this.listAllPush(name)
        this.ruleDialog[name] = Object.assign({}, this.reserveData[name])
        for (let j in this.indeterminate[name]) {
          if (j !== 'data') {
            this.indeterminate[name][j] = false
            this.checkAll[name][j] = true
          }
        }
      } else {
        for (let i in this.ruleDialog[name]) {
          this.ruleDialog[name][i] = []
          if (i !== 'data') {
            this.indeterminate[name][i] = false
            this.checkAll[name][i] = false
          }
        }
      }
      this.indeterminate[name].data = false
    },
    jurisdictionItem (name, child, drop) {
      let newCount = 0
      if (typeof drop !== 'undefined' && drop === 'list') {
        const childCount = this.ruleDialog[name][child].length
        this.indeterminate[name][child] = childCount > 0 && childCount < this.reserveData[name][child].length
        this.checkAll[name][child] = childCount === this.reserveData[name][child].length
      } else if (typeof drop !== 'undefined' && drop === 'all') {
        this.indeterminate[name][child] = false
        this.ruleDialog[name][child] = []
        if (this.checkAll[name][child]) this.ruleDialog[name][child] = this.reserveData[name][child]
      }
      for (let i in this.ruleDialog[name]) {
        if (this.ruleDialog[name][i] instanceof Array) newCount += this.ruleDialog[name][i].length
      }
      this.indeterminate[name].data = newCount > 0 && newCount < this.oldCount[name]
      this.checkAll[name].data = newCount === this.oldCount[name]
    },
    listAllPush (id) {
      const list = this.jurisdictionList[id]
      let count = { data: [] }
      for (let i = 0; i < list.length; i++) {
        if (list[i].select && list[i].children && list[i].children.length > 0) {
          for (let j = 0; j < list[i].children.length; j++) {
            if (count[list[i].id] instanceof Array) {
              count[list[i].id].push(list[i].children[j].id)
            } else {
              count[list[i].id] = [list[i].children[j].id]
            }
          }
        } else {
          count.data.push(list[i].id)
        }
      }
      return count
    },
    compileText (key) {
      let name = '未知'
      switch (key) {
        case key = 'home':
          name = '首页'
          break
        case key = 'device':
          name = '设备管理'
          break
        case key = 'monitor':
          name = '环境监测'
          break
        case key = 'fav':
          name = '积分管理'
          break
        case key = 'data':
          name = '数据分析'
          break
        case key = 'message':
          name = '信息管理'
          break
        case key = 'system':
          name = '系统设置'
          break
        default:
          name = '未知'
          break
      }
      return name
    },
    putJurisdiction () {
      console.log(this.ruleDialog)
      console.log(this.ruleLevel)
    },
    resetJurisdiction (formName) {
      this.$confirm('取消后所选权限会立即重置!', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.disabled = true
        const data = this.ruleDialog
        for (let i in data) {
          for (let j in data[i]) {
            data[i][j] = []
            this.checkAll[i][j] = false
            this.indeterminate[i][j] = false
          }
        }
        this.ruleLevel.level = ''
        this.ruleLevel.company = ''
        this.ruleLevel.sensitive = []
        this.showTree = false
      }).catch(() => {
        this.$message({ type: 'success ', message: '已取消重置' })
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../../../assets/mixin";
  .back { background-color: $background; }
  .redActive { color: $red !important; }
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
  }
  .managementDetail {
    padding: 0 10px;
    .clearfix {
      display: flex;
      flex-flow: row nowrap;
    }
    .JurisdictionList {
      width: 50%;
      padding-top: 40px;
      margin: 0 10px;
      flex: 1;
      box-sizing: border-box;
      position: relative;
      .tip {
        height: 40px;
        line-height: 40px;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        padding-left: 15px;
        font-size: 16px;
        color: #333;
        @include ellipsis
      }
      .JurisdictionScroll {
        overflow: hidden;
        position: relative;
        border: 1px solid #ddd;
        border-top: 0;
        .subsetChildren {
          position: absolute;
          width: 120px;
          left: 0;
          top: 30px;
          background-color: #fff;
          z-index: 10;
          border: 1px solid #ddd;
          border-radius: 3px;
          overflow: hidden;
          padding: 5px 10px;
          visibility: hidden;
          opacity: 0;
          transition: all 0.2s;
          .subsetChildrenScroll {
            height: 150px;
            overflow: hidden;
            .group {
              height: 26px;
              line-height: 26px;
              padding: 2px 0;
              margin-right: 0;
            }
          }
        }
        .emList {
          margin-right: 10px;
          display: inline-block;
          vertical-align: top;
          *zoom: 1;
          *display: inline;
          position: relative;
          &:last-child { margin-right: 0 }
          &:hover .subsetChildren {
            visibility: initial;
            visibility: inherit;
            visibility: visible;
            opacity: 1;
          }
        }
        .JurisdictionTree {
          margin-top: 15px;
          position: relative;
          padding: 0 20px;
        }
        .items {
          min-height: 50px;
          padding: 5px 0 5px 100px;
          position: relative;
          border-bottom: 1px solid #ddd;
          &:last-child {
            border-bottom: 0;
          }
          &.itemLi {
            padding: 5px 15px;
          }
          .powerList {
            min-width: 65px;
            height: 25px;
            line-height: 25px;
            margin-top: 3px;
            margin-bottom: 3px;
            font-size: 14px;
            color: #333;
            &.actived {
              padding-right: 25px;
              position: relative;
            }
          }
          .tooptip {
            width: 85px;
            height: 50px;
            line-height: 50px;
            position: absolute;
            left: 15px;
            top: 50%;
            margin-top: -25px;
            font-size: 14px;
          }
        }
      }
    }
  }
  .el-icon-caret-bottom {
    position: absolute;
    right: 8px;
    top: 2px;
    font-size: 18px;
  }
  .powerAuto {
    width: auto !important;
    min-width: auto !important;
    cursor: pointer;
    &.disable {
      color: #C0C4CC !important;
    }
  }
</style>
