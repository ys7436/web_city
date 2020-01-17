<template>
  <div class="headerMain">
    <div class="header-list">
      <el-switch
        v-model="isCollapse"
        active-text=""
        inactive-color="#222"
        active-color="#515151"
        inactive-text="">
      </el-switch>
    </div>
    <div class="logo">LOGO</div>
    <ul class="headerItem clearfix">
      <router-link tag="li" v-for="item in list" :key="item.id" @click.native="isActiveLink" :to="item.link">
        <i class="headerI" :class="item.icon"></i>{{ item.name }}
      </router-link>
    </ul>
    <div class="loginStatus">
      <div class="loginSet" :class="{'router-link-active': btnActive === '1'}" @click="topSet"><i class="headerI el-icon-setting"></i>设置</div>
      <div class="loginSet" :class="{'router-link-active': btnActive === '2'}" @click="topMessage"><i class="headerI el-icon-message-solid"></i>消息</div>
      <div class="loginSet" :class="{'router-link-active': btnActive === '3'}" @click="loginOuts"><i class="headerI el-icon-error"></i>退出</div>
      <div class="loginAdmin">
        <i class="el-icon-s-custom"></i>
        <div class="text">ADMIN</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import { getSlideBar } from '../api/slidebar'
export default {
  name: 'headers',
  data () {
    return {
      isCollapse: this.$store.state.isCollapse,
      list: [
        {
          id: '1',
          name: '首页',
          link: '/index/home',
          icon: 'el-icon-s-home'
        },
        {
          id: '2',
          name: '设备',
          link: '/index/device',
          icon: 'el-icon-menu'
        },
        {
          id: '3',
          name: '监测',
          link: '/index/monitor',
          icon: 'el-icon-s-platform'
        },
        {
          id: '4',
          name: '积分',
          link: '/index/integral',
          icon: 'el-icon-s-claim'
        },
        {
          id: '5',
          name: '数据',
          link: '/index/analysis',
          icon: 'el-icon-s-data'
        },
        {
          id: '6',
          name: '信息',
          link: '/index/message',
          icon: 'el-icon-s-comment'
        },
        {
          id: '7',
          name: '系统',
          link: '/index/system',
          icon: 'el-icon-set-up'
        }
      ],
      activeClass: '',
      defaultActive: [],
      isActive: '',
      btnActive: ''
    }
  },
  mounted () {
    this.isActive = this.$route.params.catlog
    this.showActive(this.isActive)
  },
  watch: {
    isCollapse () {
      this.$store.commit('setCollapse', this.isCollapse)
    },
    $route (oldHref, newHref) {
      this.isActive = this.$route.params.catlog
      localStorage.setItem('newHref', this.isActive)
      this.showActive(this.isActive)
    }
  },
  methods: {
    ...mapActions(['loginOut', 'mutationsActive']),
    ...mapMutations(['setBreadcrumbHtml', 'setHeaderBreadcrumbHtml']),
    async tabSlideBar (item, status) {
      if (status) {
        await getSlideBar().then(res => {
          this.mutationsActive({ key: item, data: res[item] })
          const link = res[item][0].item[0].link
          const oldHerf = localStorage.getItem('newHref')
          if (oldHerf !== item) {
            link && this.$router.push(link)
          }
        })
      }
      setTimeout(() => {
        const linklist = localStorage.getItem('nowLinkList').split(',')
        const lists = this.$store.state.users.activeList
        const html = this.list.filter(res => res.link.indexOf(item) !== -1)[0].name
        this.setHeaderBreadcrumbHtml(html)
        if (localStorage.getItem('onceBreadcrumbHtml') === '1' || linklist.length < 0) {
          const oneInner = lists[item][0].name
          const inner = lists[item][0].item[0].name
          this.setBreadcrumbHtml({ status: true, data: [html, oneInner, inner] })
        } else {
          this.setBreadcrumbHtml({ status: true, data: linklist })
        }
      }, 200)
    },
    isActiveLink () {
      localStorage.setItem('onceBreadcrumbHtml', '1')
      // 默认跳转第一个路由
      setTimeout(() => {
        const lists = this.$store.state.users.activeList
        if (lists) {
          const link = lists[this.isActive][0].item[0].link
          if (link) {
            this.$router.push(link)
          }
        }
      }, 200)
    },
    showActive (item) {
      this.$store.commit('setNowActive', item)
      let status = false
      if (this.defaultActive.length > 0) {
        if (this.defaultActive.indexOf(item) === -1) {
          this.defaultActive.push(item)
          status = true
        }
      } else {
        this.defaultActive.push(item)
        status = true
      }
      this.tabSlideBar(item, status)
    },
    loginOuts () {
      this.btnActive = '3'
      this.$confirm('此操作将退出当前系统, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.loginOut(this)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    },
    topSet () {
      this.btnActive = '1'
    },
    topMessage () {
      this.btnActive = '2'
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../assets/mixin';
  .headerMain {
    background-color: #333;
    .headerI {
      width: 25px;
      height: $px46;
      line-height: $px46;
      text-align: center;
      position: absolute;
      left: 0;
      top: 0;
      font-size: 16px;
    }
    .loginStatus {
      width: 70px;
      position: absolute;
      left: 0;
      bottom: 0;
      .loginAdmin {
        color: #fff;
        font-size: 14px;
        text-align: center;
        height: 50px;
        background-color: #515151;
        .text {
          height: 25px;
          line-height: 25px;
          @include ellipsis
        }
        i.el-icon-s-custom {
          display: block;
          height: 25px;
          line-height: 25px;
          font-size: 18px;
        }
      }
      .loginSet {
        height: $px46;
        line-height: $px46;
        color: #fff;
        font-size: 14px;
        cursor: pointer;
        padding: 0 10px 0 25px;
        position: relative;
        @include transition;
        &:hover {
          background-color: #222;
        }
      }
    }
  }
  .header-list {
    height: $px46;
    line-height: $px46;
  }
  .logo{
    height: 50px;
    line-height: 50px;
    text-align: center;
    overflow: hidden;
    padding: 0;
    font-size: 18px;
    color: #fff;
  }
  .headerItem {
    li {
      height: $px46;
      line-height: $px46;
      padding: 0 12px 0 25px;
      color: #fff;
      cursor: pointer;
      @include transition;
      font-size: 14px;
      position: relative;
      &:hover {
        background-color: #222;
        color: #fff !important;
      }
    }
  }
</style>
