<template lang="">
	<div class="container">
		<h2>上方组件的和为{{ sum }}</h2>
		<h1>人员列表</h1>
		<input
			type="text"
			v-model="personName"
			placeholder="请输入名字" />
		<button @click="submitPerson">添加</button>
		<br />
		<ul>
			<li
				v-for="item in personList"
				:key="item.id">
				{{ item.name }}
			</li>
		</ul>
	</div>
</template>
<script>
	import { mapState } from "vuex";
	import { nanoid } from "nanoid";
	export default {
		name: "Person",
		data() {
			return {
				personName: "",
				personNameObj: {}
			};
		},
		methods: {
			submitPerson() {
				this.personNameObj = { id: nanoid(), name: this.personName };
				this.$store.commit("SubmitPerson", this.personNameObj);
				this.personName = "";
			}
		},
		computed: {
			...mapState(["personList", "sum"])
		}
	};
</script>
<style lang=""></style>
