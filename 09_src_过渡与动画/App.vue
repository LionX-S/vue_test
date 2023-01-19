<template>
	<div id="app">
		<Test />
		<Test2 />
	</div>
</template>

<script>
	import Test from "./components/Test.vue";
	import Test2 from "./components/Test2.vue";
	export default {
		name: "App",
		components: {
			Test,
			Test2
		}
	};
</script>

<style></style>
