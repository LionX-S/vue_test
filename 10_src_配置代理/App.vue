<template>
	<div id="app">
		<button @click="getStudentData">请求student数据</button>
		<button @click="geCarData">请求car数据</button>
	</div>
</template>

<script>
	import axios from "axios";
	export default {
		name: "App",
		methods: {
			getStudentData() {
				axios.get('http://localhost:8080/apiStudent/student').then(
					response => {
						console.log('请求成功',response.data);
					},
					error => {
						console.log('请求失败',error.message);
					}
				)
			},
			geCarData() {
				axios.get('http://localhost:8080/apiCar/car').then(
					response => {
						console.log('请求成功',response.data);
					},
					error => {
						console.log('请求失败',error.message);
					}
				)
			}
		}
	};
</script>

<style></style>
