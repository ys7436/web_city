import Vue from 'vue'
import Vuex from 'vuex'
import users from './userAndHeader'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    users
  }
})
