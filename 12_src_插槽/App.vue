<template>
	<div class="container">
		<Category title="美食">
			<img
				src="https://s3.ax1x.com/2021/01/16/srJlq0.jpg"
				alt="picture" />
		</Category>
		<Category
			title="游戏"
			:list="games">
			<!-- 具名插槽 -->
			<ul slot="footer">
				<li
					v-for="(item, index) in games"
					:key="index">
					{{ item }}
				</li>
			</ul>
		</Category>
		<Category
			title="电影"
			:list="films">
			<video slot="header" controls src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"></video>
		</Category>
		<Category>
			<template slot-scope="hobbyData">
				<h4 v-for="hobby in hobbyData.hobbies">{{ hobby }}</h4>
			</template>
		</Category>
	</div>
</template>

<script>
	import Category from "./components/Category.vue";
	export default {
		name: "App",
		data() {
			return {
				foods: ["火锅", "烧烤", "小龙虾", "牛排"],
				games: ["红色警戒", "apex", "cf", "nz"],
				films: ["教父", "钢铁侠", "复联", "流浪地球"]
			};
		},
		components: {
			Category
		}
	};
</script>

<style>
	.container {
		display: flex;
		justify-content: space-around;
	}
</style>
