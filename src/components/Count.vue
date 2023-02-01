<template>
	<div class="container">
		<select v-model.number="n">
			<option :value="1">1</option>
			<option :value="2">2</option>
			<option :value="3">3</option>
		</select>
		<br />
		<span>和为{{ $store.state.sum }}</span>
		<br />
		<span>和为(mapState用法){{ sum }}</span>
		<br />
		<span>*10后为{{ $store.getters.bigNum }}</span>
		<br />
		<span>*10后为(mapGetters用法){{ bigNum }}</span>
		<br />
		<button @click="increment(n)">+</button>
		<button @click="decrement(n)">-</button>
		<button @click="incrementOdd(n)">当前和为奇数再加</button>
		<button @click="incrementWait(n)">等等再加</button>
		<br />
		<h2>下方组件总人数为{{ personList.length }}</h2>
	</div>
</template>
<script>
	import { mapGetters, mapState, mapMutations, mapActions } from "vuex";

	export default {
		name: "Count",
		data() {
			return {
				n: 1
			};
		},
		computed: {
			...mapState('count',["sum"]),
			...mapState('person',["personList"]),
			...mapGetters('count',["bigNum"])
		},
		methods: {
			// increment() {
			// 	// this.$store.dispatch("increment", this.n);
			// 	this.$store.commit("Increment", this.n);
			// },
			// decrement() {
			// 	// this.$store.dispatch("decrement", this.n);
			// 	this.$store.commit("Decrement", this.n);
			// },
			...mapMutations('count',{ increment: "Increment", decrement: "Decrement" }),
			// incrementOdd() {
			// 	this.$store.dispatch("incrementOdd", this.n);
			// },
			// incrementWait() {
			// 	this.$store.dispatch("incrementWait", this.n);
			// }
			...mapActions('count',["incrementOdd", "incrementWait"])
		}
	};
</script>
<style scoped></style>
