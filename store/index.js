import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      styles: [],
      scripts: [],
      mark: '',
      page: ''
    },
    mutations: {
      loadStyles (state, styles) {
        state.styles = styles
      },
      loadScripts(state,scripts) {
        state.scripts = scripts;
      },
      mark(state,mark) {
	state.mark = mark;
      },
      page(state,page) {
	state.page = page;
      }
    },
  })
}


export default createStore
