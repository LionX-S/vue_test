<template>
	<div>
		<Count />
		<hr />
		<Person />
	</div>
</template>

<script>
	import Count from "./components/Count.vue";
	import Person from "./components/Person.vue";
	export default {
		name: "App",
		data() {
			return {};
		},
		components: {
			Count,
			Person
		},
		mounted() {
			// console.log(this);
		}
	};
</script>

<style>
	.container {
		margin-left: 30px;
		margin-top: 20px;
	}
</style>
