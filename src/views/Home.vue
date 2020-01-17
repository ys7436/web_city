<template>
  <div class="home">
    <headers class="header"></headers>
    <div :class="{'groupClass': !isCollapse}" class="groupContent">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Headers from '../components/headers'
export default {
  name: 'home',
  computed: {
    isCollapse () {
      return this.$store.state.users.isCollapse
    }
  },
  components: {
    Headers
  }
}
</script>
<style lang="scss" scoped>
  @import '../assets/mixin';
  .home {
    height: 100%;
    padding-left: $px70;
    position: relative;
    box-sizing: border-box;
  }
  .header {
    width: $px70;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    line-height: $px70;
    z-index: 10;
    text-align: center;
  }
  .groupContent {
    height: 100%;
    position: relative;
    transition: all 0.3s;
    padding-left: 65px;
  }
  .groupClass {
    padding-left: $px260;
  }
</style>
