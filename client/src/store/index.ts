import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		count: 0,
		user: null
	},
	mutations: {
		increment(state) {
			state.count++;
		},
		logUser(state, user) {
			state.user = user;
		}
	},
	actions: {
	},
	modules: {
	},
	getters: {
		getCount: (state) => {
			return state.count;
		},
		getUser: (state) => {
			// if (state.user == null) {
			//   router.push('login');
			// }
			return state.user;
		}
	}
})
