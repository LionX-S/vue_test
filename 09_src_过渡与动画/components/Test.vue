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
		name: "Test",
		data() {
			return {
				isShow: true
			};
		}
	};
</script>

<style scoped>
	h2 {
		background-color: red;
	}

	.v-enter-active {
		animation: excessive 1s linear;
	}
	.v-leave-active {
		animation: excessive 1s linear reverse;
	}
	@keyframes excessive {
		from {
			transform: translateX(-100%);
		}
		to {
			transform: translateX(0);
		}
	}
</style>
