import router from '@/router'

export default {
  namespaced: true,
  state: () => ({
    menuActived: '2',
    headTitle: '员工管理',
    goBackFlag: false,
    url: '/member',
    loading: true,
    timer: null,
  }),
  mutations: {
    menuHandle(state, payload) {
      const { menuActived, headTitle, iframeUrl, goBackFlag } = payload
      state.loading = true
      state.menuActived = menuActived
      state.headTitle = headTitle
      state.goBackFlag = goBackFlag
      state.iframeUrl = iframeUrl
      router.push(iframeUrl)
      this.dispatch('menu/closeLoading')
    },
    clear(state) {
      state.timer = null
      clearTimeout(this.state)
    },
    setTimer(state, timer) {
      state.timer = timer
    },
    setLoading(state, loading) {
      state.loading = loading
    },
  },
  actions: {
    closeLoading(context) {
      context.commit('setTimer', null)
      const timer = setTimeout(() => {
        context.commit('setLoading', false)
      }, 1000)
      context.commit('setTimer', timer)
    },
  },
  getters: {},
}
