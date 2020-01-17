<template>
  <div class="groupList">
    <el-menu
      class="el-menu-vertical" @open="handleOpen" @close="handleClose" active-text-color="#2684fe"
      :collapse="isCollapse" background-color="#eaedf1" text-color="#888">
      <el-submenu class="routerThis" v-for="(data, index) in nowList" :key="data.id" :index="index + ''">
        <template slot="title" v-show="data.isParent">
          <i class="el-icon-location"></i>
          <span slot="title">{{ data.name }}</span>
        </template>
        <el-menu-item class="routerUl" v-for="item in data.item" :key="item.id" :index="item.id" v-show="item.link">
          <router-link tag="div" class="divLink" @click.native="nativeBreadcrumb($event, index)" :to="item.link">{{ item.name }}</router-link>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'levellist',
  computed: {
    ...mapGetters(['nowList']),
    ...mapState({
      isCollapse: ({ users }) => users.isCollapse
    })
  },
  methods: {
    ...mapMutations(['setBreadcrumbHtml']),
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    },
    nativeBreadcrumb (e, index) {
      localStorage.setItem('onceBreadcrumbHtml', '0')
      const html = this.$store.state.users.headerBreadcrumbHtml
      const oneInner = this.$store.getters.nowList[Number(index)].name
      const inner = e.target.innerHTML
      const lists = [html, oneInner, inner]
      this.setBreadcrumbHtml({ status: false, data: lists })
      localStorage.setItem('nowLinkList', lists.join(','))
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../../assets/mixin';
  .groupList {
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    font-size: 14px;
    .el-menu-vertical {
      background-color: #eaedf1;
      border-color: #ddd !important;
      .routerThis {
        border-bottom: 1px solid #ddd;
        .el-icon-location {
          font-size: 23px;
        }
        .routerUl {
          background-color: transparent !important;
          padding: 0 !important;
          min-width: auto;
          border-top: 1px solid #ddd;
        }
      }
    }
  }
  .el-menu {
    height: 100%;
  }
  .el-menu-vertical:not(.el-menu--collapse) {
    width: $px260;
    .divLink {
      color: #333;
      padding-left: 40px;
      padding-right: 5px;
      @include transition;
      @include ellipsis;
      &:hover {
        background-color: #fff !important;
        color: #2684fe !important;
      }
    }
  }
</style>
