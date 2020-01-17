import { exportExcel } from './function'
export const tableEvent = {
  data () {
    return {
      selectType: false,
      loading: false,
      multipleSelection: null,
      regionList: {},
      total: 400,
      pageSize: 20,
      currentPage: 1,
      dialogVisible: false
    }
  },
  methods: {
    resetForm (formName) {
      this.selectType = true
      this.ruleForm.company = ''
      this.$refs[formName].resetFields()
    },
    editCheckBox (val) {
      this.multipleSelection = val
    },
    exportForm (val) {
      const title = val.length > 0 ? val : '导出数据表'
      exportExcel(title, '.table')
    },
    addForm () {
      this.dialogVisible = true
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
    }
  }
}
