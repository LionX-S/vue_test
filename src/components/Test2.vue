<template>
	<div>
		<button @click="isShow = !isShow">显示/隐藏</button>
		<transition appear>
			<h2 v-show="isShow">展示动画效果</h2>
		</transition>
	</div>
</template>
<script>
	export default {
		name: "Test2",
		data() {
			return {
				isShow: true
			};
		}
	};
</script>
<style scoped>
	h2 {
		background-color: rebeccapurple;
    transition: 1s linear;
	}
	.v-enter, .v-leave-to {
		transform: translateX(-100%);
	}
	.v-enter-to, .v-leave {
		transform: translateX(0);
	}
</style>
