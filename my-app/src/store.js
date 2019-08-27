import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: '',
    upID: '',
    downID: ''
  },
  mutations: {
    history(state, num) {
      state.count = num
    },
    history2(state, num) {
      state.upID = num
    },
    history3(state, num) {
      state.downID = num
    }
  },
  actions: {

  }
})