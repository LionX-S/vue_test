// 用于创建整个应用的路由器
import VueRouter from "vue-router";

// 引入组件
import About from "../pages/About.vue";
import Home from "../pages/Home.vue";
import News from '../pages/News.vue';
import Message from '../pages/Message.vue';

const router = new VueRouter({
	routes: [
		{
			path: "/about",
			component: About
		},
		{
			path: "/home",
			component: Home,
			children:[
				{
					path:'news',
					component: News
				},
				{
					path:'message',
					component: Message
				}
			]
		}
	]
});

export default router;
