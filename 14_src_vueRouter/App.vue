<template>
	<div>
		<Banner/>
		<div class="row"></div>
		<div class="col-xs-2 col-xs-offset-2">
			<div class="list-group">
				<!-- 借助router-link实现切换 -->
				<router-link class="list-group-item" to="/about" active-class="active">About</router-link>
				<router-link class="list-group-item" to="/home" active-class="active">Home</router-link>
			</div>
		</div>
		<div class="col-xs-6">
			<div class="panel">
				<div class="panel-body">
					<!-- 指定组件呈现位置 -->
					<router-view></router-view>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Banner from './components/Banner.vue';
export default {
	name: "App",
	data() {
		return {};
	},
	components: {
		Banner
	}
};
</script>

<style>

</style>
