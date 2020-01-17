<template>
  <div class="whiteBack treeEdit">
    <div class="treeList">
      <el-form class="contentSearch" status-icon label-width="90px">
        <el-form-item label="机构名称：">
          <el-input placeholder="输入关键查找" v-model="filterText"></el-input>
        </el-form-item>
      </el-form>
      <el-tree class="el-tree-col" :data="dataList" node-key="id" default-expand-all :filter-node-method="filterNode" :draggable="draggable"
               @node-drop="handleDrop" ref="tree" @node-click="handleNodeClick" :expand-on-click-node="false" :render-content="renderContent">
      </el-tree>
    </div>
    <div class="treeList">
      <div class="titleList">编辑机构</div>
      <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="机构名称：">
          <el-input v-model.trim="ruleForm.companyName" placeholder="请输入机构名称" :disabled="ruleDisabled.companyName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级机构：">
          <el-select class="blockInput" v-model="ruleForm.superior" placeholder="请选择直属上级" :disabled="ruleDisabled.superior" @change="superiorChange" filterable>
            <el-option label="1-一级" value="1"></el-option>
            <el-option label="2-一级" value="2"></el-option>
            <el-option label="3-一级" value="3"></el-option>
            <el-option label="1-二级" value="4"></el-option>
            <el-option label="1-1-三级" value="9"></el-option>
            <el-option label="1-2-三级" value="10"></el-option>
            <el-option label="1-2-四级" value="101"></el-option>
            <el-option label="1-2-五级" value="1011"></el-option>
            <el-option label="1-2-六级" value="10111"></el-option>
            <el-option label="2-1-二级" value="21"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="机构层级：">
          <el-select class="blockInput" v-model="ruleForm.hierarchy" placeholder="请选择机构层级" :disabled="ruleDisabled.hierarchy" filterable>
            <el-option label="一级" value="1"></el-option>
            <el-option label="二级" value="2"></el-option>
            <el-option label="三级" value="3"></el-option>
            <el-option label="四级" value="4"></el-option>
            <el-option label="五级" value="5"></el-option>
            <el-option label="六级" value="6"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="机构类型：">
          <el-select class="blockInput" v-model="ruleForm.status" placeholder="请选择机构类型" :disabled="ruleDisabled.status" filterable>
            <el-option label="社区" value="10"></el-option>
            <el-option label="网格" value="11"></el-option>
            <el-option label="小区" value="12"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input type="textarea" :disabled="ruleDisabled.remark" v-model.trim="ruleForm.remark" placeholder="请输入备注内容" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-show="buttonShow">
          <el-button icon="el-icon-set-up" @click="resetForm('ruleForm')">取消</el-button>
          <el-button type="primary" icon="el-icon-search" @click="submitForm('ruleForm')">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getRenderTree } from '../../../api/slidebar'
export default {
  name: 'Mechanism',
  data () {
    return {
      item: '',
      dataList: [],
      newId: 2000,
      filterText: '',
      ruleForm: {
        companyName: '',
        superior: '',
        hierarchy: '',
        status: '',
        remark: ''
      },
      ruleDisabled: {
        companyName: true,
        superior: true,
        hierarchy: true,
        status: true,
        remark: true
      },
      buttonShow: false,
      count: 1,
      dataChildren: null,
      treeStatus: null,
      level: '',
      draggable: false,
      draggableSuccess: true
    }
  },
  mounted () {
    this.getTree()
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    getTree () {
      getRenderTree().then(res => {
        this.item = JSON.stringify(res.data)
        this.dataList = res.data
      }).catch(() => {
        console.log('获取出错')
      })
    },
    append (node, data, e) {
      e.preventDefault()
      e.stopPropagation()
      this.draggable = false
      this.treeStatus = '1'
      this.dataChildren = data
      this.buttonShow = true
      for (let item in this.ruleDisabled) {
        if (item === 'superior' || item === 'hierarchy') {
          this.ruleDisabled[item] = true
        } else {
          this.ruleDisabled[item] = false
        }
      }
      this.ruleForm.status = ''
      this.ruleForm.companyName = ''
      this.utilTree(node, true)
    },
    edit (node, data, e) {
      e.preventDefault()
      e.stopPropagation()
      this.draggable = true
      this.buttonShow = false
      this.treeStatus = '2'
      this.dataChildren = data
      this.utilTree(node)
      for (let item in this.ruleDisabled) {
        if (item === 'hierarchy' || item === 'superior') {
          this.ruleDisabled[item] = true
        } else {
          this.ruleDisabled[item] = false
        }
      }
      this.ruleForm.status = '10'
      this.ruleForm.companyName = node.label
    },
    superiorChange (val) {
      if (this.treeStatus === '2' && val !== '') {
        this.loopDataList(this.dataList, val)
        const nowCount = this.count + 1
        if (nowCount > 6) {
          this.$alert('当前层级不可超过6级', '提示', { confirmButtonText: '确定', type: 'warning' })
          this.ruleForm.superior = ''
          this.ruleForm.hierarchy = ''
          return false
        } else this.ruleForm.hierarchy = nowCount.toString()
      }
    },
    loopDataList (data, val) {
      for (let i = 0; i < data.length; i++) {
        for (let key in data[i]) {
          if (String(data[i].id) === val) {
            this.count = Number(data[i].hierarchy)
            return false
          }
          if (key === 'id' && data[i].children && data[i].children.length > 0) {
            this.loopDataList(data[i].children, this.ruleForm.superior)
          }
        }
      }
    },
    submitForm (formName) {
      const that = this.treeStatus
      const title = that === '1' ? '是否立即添加下级结构' : '是否立即修改当前结构'
      const message = that === '1' ? '添加' : '修改'
      this.$confirm(title, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = this.dataChildren
        const name = this.ruleForm.companyName === '' ? '最新节点' : this.ruleForm.companyName
        if (that === '1') {
          const newChild = { id: this.newId++, label: name, children: [] }
          if (!data.children) this.$set(data, 'children', [])
          data.children.push(newChild)
        } else if (that === '2') {
          data.data.label = this.ruleForm.companyName
        }
        this.$message({ type: 'success', message: `${message}成功!` })
      }).catch(() => {
        this.$message({ type: 'info', message: `已取消${message}` })
      })
    },
    remove (node, data, e) {
      e.preventDefault()
      e.stopPropagation()
      this.draggable = false
      this.treeStatus = ''
      this.$confirm('是否确定删除此节点', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const parent = node.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex(d => d.id === data.id)
        children.splice(index, 1)
        this.$message({ type: 'success', message: '删除成功!' })
      }).catch(() => {
        this.$message({ type: 'success', message: '已取消删除' })
      })
    },
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleNodeClick (val, node) {
      this.utilTree(node)
      this.draggable = false
      this.treeStatus = ''
      this.buttonShow = false
      for (let item in this.ruleDisabled) { this.ruleDisabled[item] = true }
      this.ruleForm.status = '10'
      this.ruleForm.companyName = node.label
    },
    utilTree (node, boolern) {
      this.count = boolern ? (node.level + 1) : node.level
      // 当前层级
      this.ruleForm.hierarchy = this.count.toString()
      // 父级层级
      if (this.treeStatus === '1' && node && node.key) this.ruleForm.superior = node.key.toString()
      else {
        if (node.parent && node.parent.key && node.parent !== null && node.parent.parent !== null) this.ruleForm.superior = node.parent.key.toString()
        else this.ruleForm.superior = ''
      }
    },
    handleDrop (draggingNode, dropNode, dropType, ev) {
      if (dropNode.level >= 6) {
        this.$alert('当前层级不可超过6级', '提示', { confirmButtonText: '确定', type: 'warning' })
        this.dataList = []
        this.draggableSuccess = false
        this.buttonShow = false
        this.dataList = JSON.parse(this.item)
      } else this.droploop(dropNode.childNodes)
      if (this.draggableSuccess) {
        this.dataChildren = draggingNode
        this.ruleForm.companyName = draggingNode.data.label
        if ((dropNode.previousSibling && dropNode.previousSibling.data && dropNode.previousSibling.data.id === draggingNode.data.id) ||
          (dropNode.nextSibling && dropNode.nextSibling.data && dropNode.nextSibling.data.id === draggingNode.data.id)) {
          if (dropNode.parent && dropNode.parent.level) {
            this.ruleForm.hierarchy = (dropNode.parent.level + 1).toString()
            this.ruleForm.superior = String(dropNode.parent.data.id)
          } else {
            this.ruleForm.hierarchy = '1'
            this.ruleForm.superior = ''
          }
        } else {
          this.ruleForm.hierarchy = (dropNode.level + 1).toString()
          this.ruleForm.superior = String(dropNode.data.id)
        }
      }
    },
    droploop (node) {
      this.draggableSuccess = true
      this.buttonShow = true
      for (let i = 0; i < node.length; i++) {
        for (let j in node[i]) {
          if (j === 'level' && node[i].level > 6) {
            this.$alert('当前层级不可超过6级', '提示', { confirmButtonText: '确定', type: 'warning' })
            this.dataList = []
            this.dataList = JSON.parse(this.item)
            this.draggableSuccess = false
            this.buttonShow = false
            return false
          } else if (j === 'level' && node[i].childNodes.length > 0) {
            this.droploop(node[i].childNodes)
          }
        }
      }
    },
    renderContent (h, { node, data, store }) {
      data.hierarchy = node.level
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button size="mini" title="编辑" icon="el-icon-document" type="primary" on-click={ (e) => this.edit(node, data, e) }></el-button>
            { node.level < 6 ? <el-button size="mini" title="添加" icon="el-icon-circle-plus-outline" type="success" on-click={ (e) => this.append(node, data, e) }></el-button> : '' }
            <el-button size="mini" title="删除" icon="el-icon-delete" type="danger" on-click={ (e) => this.remove(node, data, e) }></el-button>
          </span>
        </span>
      )
    }
  }
}
</script>

<style scoped lang="scss">
  .contentSearch {
    margin-bottom: 15px;
  }
</style>
