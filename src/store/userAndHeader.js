const users = {
  state: {
    isCollapse: false,
    isToken: '',
    activeList: {},
    historyList: {},
    isLogin: false,
    userInfo: {},
    nowActives: '',
    breadcrumbHtml: [],
    headerBreadcrumbHtml: '首页',
    onceBreadcrumbHtml: true,
    clientHeight: 0,
    remember: true
  },
  mutations: {
    setRemember (state, value) {
      state.remember = value
    },
    setCollapse (state, value) {
      state.isCollapse = value
    },
    setActive (state, value) {
      state.activeList = {}
      state.historyList[value.key] = value.data
      state.activeList = state.historyList
    },
    setToken (state, value) {
      state.isToken = value
      if (this.state) localStorage.setItem('isToken', value)
      else sessionStorage.setItem('isToken', value)
    },
    setIslogin (state, value) {
      state.isLogin = value
    },
    setUserInfo (state, value) {
      state.userInfo = value
      if (this.state) localStorage.setItem('userInfo', JSON.stringify(value))
      else sessionStorage.setItem('userInfo', JSON.stringify(value))
    },
    setNowActive (state, value) {
      state.nowActives = value
    },
    setBreadcrumbHtml (state, value) {
      state.breadcrumbHtml = []
      state.breadcrumbHtml = value.data
    },
    setHeaderBreadcrumbHtml (state, value) {
      state.headerBreadcrumbHtml = value
    },
    setOnceBreadcrumbHtml (state, value) {
      state.onceBreadcrumbHtml = value
    },
    setClientHeight (state, value) {
      state.clientHeight = value
    }
  },
  getters: {
    nowList (state) {
      return state.activeList[state.nowActives]
    }
  },
  actions: {
    mutationsActive ({ commit }, value = {}) {
      let item = this.state.users.activeList
      let active = true
      if (item.length === 0 && value.key && value.data) {
        commit('setActive', value)
      } else {
        const keys = Object.keys(value)[0]
        for (let i = 0; i < Object.keys(item).length; i++) {
          if (value !== '' && keys && keys === item[i]) {
            active = false
            break
          }
        }
        if (active) {
          commit('setActive', value)
        }
      }
    },
    // 退出当前系统
    loginOut ({ commit }, that) {
      localStorage.removeItem('isToken')
      localStorage.removeItem('userInfo')
      sessionStorage.removeItem('isToken')
      sessionStorage.removeItem('userInfo')
      commit('setToken', '')
      commit('setUserInfo', '')
      commit('setIslogin', false)
      that.$router.push({ name: 'login' })
      that.$message({
        type: 'success',
        message: '已退出当前系统!'
      })
    }
  }
}
export default users
