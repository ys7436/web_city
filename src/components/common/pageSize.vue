<template>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[20, 30, 40, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'pageSize',
  props: {
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 20
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },
  methods: {
    handleSizeChange (val) {
      this.$emit('tableDataSize', val)
    },
    handleCurrentChange (val) {
      this.$emit('tableDataPage', val)
    }
  }
}
</script>

<style scoped lang="scss">
  .block {
    margin-top: 15px;
    .el-pagination {
      font-weight: normal;
    }
  }
</style>
