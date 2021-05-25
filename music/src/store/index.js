import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    test:0
  },
  mutations: {
    changetab(state,payload){
      state.test=payload
    }
  },
  actions: {
    triggertab(context,payload){
      context.commit("changetab",payload)
    }
  },
  modules: {
  }
})

