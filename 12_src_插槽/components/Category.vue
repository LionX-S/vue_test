<template>
	<div class="category">
		<h3>{{ title }}分类</h3>
		<slot></slot>
		<slot name="header">具名插槽顶部</slot>
		<slot name="footer">具名插槽底部</slot>
		<!-- 作用域插槽 -->
		<slot :hobbies="hobbies"></slot>
	</div>
</template>
<script>
	export default {
		name: "Category",
		props: ["list", "title"],
		data() {
			return {
				hobbies:['篮球','音乐','足球']
			}
		},
	};
</script>
<style scoped>
	.category {
		width: 200px;
		text-align: center;
		background-color: skyblue;
	}
	img {
		width: 100%;
	}
  video {
		width: 100%;
	}
</style>
