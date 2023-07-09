import Vue from 'vue'
import Vuex from 'vuex'
import menu from './menu'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    menu,
  },
})

export default store
