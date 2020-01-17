<template>
  <div>
    <template>
      <el-table v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" class="table"
                :data="tableData" border style="width: 100%" tooltip-effect="dark" :stripe="true" @selection-change="handleSelectionChange">
        <el-table-column fixed align="center" type="selection" width="40"></el-table-column>
        <el-table-column v-for="(item, index) in tableHead" :key="'item' + index" :label="item.name" :prop="item.prop" :width="item.width" :align="item.align"></el-table-column>
        <el-table-column fixed="right" label="操作" width="180" align="center" v-if="status !== '0'">
          <div v-if="status === '1'" slot-scope="scope">
            <el-button @click="editClick(scope.row)" type="primary" size="mini">查看</el-button>
          </div>
          <div v-else-if="status === '2'" slot-scope="scope">
            <el-button @click="editClick(scope.row)" type="primary" size="mini">编辑</el-button>
            <el-button @click="deleteClick(scope.row)" type="danger" size="mini">删除</el-button>
          </div>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
export default {
  name: 'tablecolum',
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    tableHead: {
      type: Array,
      default: () => []
    },
    status: {
      type: String,
      default: '1'
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.$emit('handleCheckBox', val)
    },
    editClick (row) { // 表格编辑
      this.$emit('handleRow', row)
    },
    deleteClick (row) { // 表格编辑
      this.$emit('deleteRow', row)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
