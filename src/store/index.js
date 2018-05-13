import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'


export default new Vuex.Store({
	state: {
	  dailydata: [],
      // API: 'http://192.168.1.106:5000/',
      API: 'http://localhost:5000/'
	},
	mutations: {
      dailydata(state, dailydata) {
        state.dailydata = dailydata
      }
	}
})