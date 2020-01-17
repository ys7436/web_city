<template>
  <div>
    <el-form-item label="区域：" prop="region">
      <el-select v-model="cascadeList.region" placeholder="请选择区县" @change="regionChange" filterable>
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="street">
      <el-select v-model="cascadeList.street" placeholder="请选择街道" @change="streetChange" filterable>
        <el-option label="街道一" value="j1"></el-option>
        <el-option label="街道二" value="j2"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="community">
      <el-select v-model="cascadeList.community" placeholder="请选择社区" @change="communityChange" filterable>
        <el-option label="社区一" value="s1"></el-option>
        <el-option label="社区二" value="s2"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="grid">
      <el-select v-model="cascadeList.grid" placeholder="请选择网格" @change="gridChange" filterable>
        <el-option label="网格一" value="w1"></el-option>
        <el-option label="网格二" value="w2"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="home">
      <el-select v-model="cascadeList.home" placeholder="请选择小区" @change="homeChange" filterable>
        <el-option label="小区一" value="x1"></el-option>
        <el-option label="小区二" value="x2"></el-option>
      </el-select>
    </el-form-item>
    <template v-if="floorUnit">
      <el-form-item prop="floor">
        <el-select v-model="cascadeList.floor" placeholder="请选择楼栋" @change="floorChange" filterable>
          <el-option label="楼栋一" value="l1"></el-option>
          <el-option label="楼栋二" value="l2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="unit">
        <el-select v-model="cascadeList.unit" placeholder="请选择单元" @change="unitChange" filterable>
          <el-option label="单元一" value="d1"></el-option>
          <el-option label="单元二" value="d2"></el-option>
        </el-select>
      </el-form-item>
    </template>
  </div>
</template>

<script>
/* !!!: 级联下拉 */
export default {
  name: 'cascade',
  props: {
    selectType: {
      type: Boolean,
      default: false
    },
    floorUnit: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      cascadeList: {
        region: '',
        street: '',
        community: '',
        grid: '',
        home: '',
        floor: '',
        unit: ''
      }
    }
  },
  watch: {
    selectType () {
      if (this.selectType) {
        this.cascadeList.region = ''
        this.cascadeList.street = ''
        this.cascadeList.community = ''
        this.cascadeList.grid = ''
        this.cascadeList.home = ''
        if (this.floorUnit) {
          this.cascadeList.floor = ''
          this.cascadeList.unit = ''
        }
      }
    }
  },
  methods: {
    regionChange (val) {
      this.utilsChange()
    },
    streetChange (val) {
      this.utilsChange()
    },
    communityChange (val) {
      this.utilsChange()
    },
    gridChange (val) {
      this.utilsChange()
    },
    homeChange (val) {
      this.utilsChange()
    },
    floorChange (val) {
      this.utilsChange()
    },
    unitChange (val) {
      this.utilsChange()
    },
    utilsChange () {
      const val = this.cascadeList
      if (!this.floorUnit) {
        delete val.floor
        delete val.unit
      }
      this.$emit('changeSelect', val)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
