import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

// action:用于响应组件中的动作
// const actions = {
// 	// 这两个只是转发，可以省略，组件直接调用commit即可
// 	increment(context, value) {
// 		context.commit("Increment", value);
// 	},
// 	decrement(context, value) {
// 		context.commit("Decrement", value);
// 	},
// 	incrementOdd(context, value) {
// 		if (context.state.sum % 2) {
// 			context.commit("Increment", value);
// 		}
// 	},
// 	incrementWait(context, value) {
// 		setTimeout(() => {
// 			context.commit("Increment", value);
// 		}, 500);
// 	}
// };
// 用于存储数据
// const state = {
// 	sum: 0,
// 	personList: []
// };
// 用于操作数据（state）
// const mutations = {
// 	Increment(state, value) {
// 		state.sum += value;
// 	},
// 	Decrement(state, value) {
// 		state.sum -= value;
// 	},
// 	SubmitPerson(state, value) {
// 		state.personList.unshift(value);
// 	}
// };

// 用于加工state中的数据
// const getters = {
// 	bigNum(state) {
// 		return state.sum * 10;
// 	}
// };

// store模块化
const countOptions = {
	namespaced: true,
	actions: {
		increment(context, value) {
			context.commit("Increment", value);
		},
		decrement(context, value) {
			context.commit("Decrement", value);
		},
		incrementOdd(context, value) {
			if (context.state.sum % 2) {
				context.commit("Increment", value);
			}
		},
		incrementWait(context, value) {
			setTimeout(() => {
				context.commit("Increment", value);
			}, 500);
		}
	},
	mutations: {
		Increment(state, value) {
			state.sum += value;
		},
		Decrement(state, value) {
			state.sum -= value;
		}
	},
	state: {
		sum: 0
	},
	getters: {
		bigNum(state) {
			return state.sum * 10;
		}
	}
};

const personOptions = {
	namespaced: true,
	actions: {},
	mutations: {
		SubmitPerson(state, value) {
			state.personList.unshift(value);
		}
	},
	state: {
		personList: []
	},
	getters: {}
};
// export default new Vuex.Store({
// 	// ...
// 	actions,
// 	mutations,
// 	state,
// 	getters
// });

export default new Vuex.Store({
	modules:{
		count: countOptions,
		person: personOptions
	}
});