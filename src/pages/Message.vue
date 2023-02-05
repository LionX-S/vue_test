<template lang="">
	<div>
		<ul>
			<li
				v-for="m in messageList"
				:key="m.id">
				<span v-if="m.id != '004'">
					<!-- <router-link
					:to="{
						path: '/home/message/details',
						query: {
							id: m.id,
							title: m.title
						}
					}"
					>{{ m.title }}</router-link> -->
					{{ m.title }}
					<button @click="pushLink(m)">push跳转</button>
				</span>
				<span v-if="m.id == '004'">
					<router-link
						:to="{
							name: 'detailsParams',
							params: {
								id: m.id,
								title: m.title
							}
						}"
						>{{ m.title }}</router-link
					>
				</span>
			</li>
		</ul>
		<hr />
		<router-view></router-view>
	</div>
</template>
<script>
	export default {
		name: "Message",
		data() {
			return {
				messageList: [
					{ id: "001", title: "message001" },
					{ id: "002", title: "message002" },
					{ id: "003", title: "message003" },
					{ id: "004", title: "命名路由切通过params方式" }
				]
			};
		},
		methods: {
			pushLink(m) {
				this.$router.push({
					path: "/home/message/details",
					query: {
						id: m.id,
						title: m.title
					}
				});
			}
		}
	};
</script>
<style lang=""></style>
