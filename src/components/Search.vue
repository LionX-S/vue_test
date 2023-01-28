<template lang="">
	<div>
		<section class="jumbotron">
			<h3 class="jumbotron-heading">Search Github Users</h3>
			<div>
				<input
					type="text"
					placeholder="enter the name you search"
					v-model="keyWords" />&nbsp;<button @click="searchUsers">
					Search
				</button>
			</div>
		</section>
	</div>
</template>
<script>
	import axios from "axios";
	export default {
		name: "Search",
		data() {
			return {
				keyWords: ""
			};
		},
		methods: {
			searchUsers() {
				this.$bus.$emit("updateInfo", { isFirst: false, isLoading: true });
				axios
					.get(`https://api.github.com/search/users?q=${this.keyWords}`)
					.then(
						(response) => {
							this.$bus.$emit("updateInfo", {
								isLoading: false,
								users: response.data.items
							});
						},
						(err) => {
							// console.log("失败", err.message);/
							this.$bus.$emit("updateInfo", { errMsg: err.message });
						}
					);
			}
		}
	};
</script>
<style lang=""></style>
