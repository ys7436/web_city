<template>
  <div class="is100">
    <group-list></group-list>
    <div class="content">
      <div class="label-item">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item v-for="(item, index) in breadcrumbHtml" :key="'crumb' + index">{{ item }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <transition mode="out-in" name="slideSwiper">
        <router-view/>
      </transition>
    </div>
  </div>
</template>

<script>
import GroupList from '../../components/slidebar/levellist'
export default {
  name: 'catlog',
  components: {
    GroupList
  },
  computed: {
    breadcrumbHtml () {
      return this.$store.state.users.breadcrumbHtml
    }
  }
}
</script>

<style scoped lang="scss">
  .label-item {
    position: absolute;
    top: 0;
    left: 1px;
    right: 0;
    background-color: #f0f0f0;
    border-bottom: 1px solid #ddd;
    .el-breadcrumb {
      height: 50px;
      line-height: 50px;
      padding: 0 15px;
    }
  }
</style>
