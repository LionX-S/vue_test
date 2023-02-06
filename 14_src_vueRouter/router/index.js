// 用于创建整个应用的路由器
import VueRouter from "vue-router";

// 引入组件
import About from "../pages/About.vue";
import Home from "../pages/Home.vue";
import News from "../pages/News.vue";
import Message from "../pages/Message.vue";
import Details from '../pages/Details.vue';

const router = new VueRouter({
	routes: [
		{
			path: "/about",
			component: About
		},
		{
			name:'zhuYe',
			path: "/home",
			component: Home,
			children: [
				{
					path: "news",
					component: News
				},
				{
					path: "message",
					component: Message,
					children: [
						{
							path: "details",
							component: Details,
							props(route){
								return {
									id: route.query.id,
									title: route.query.title
								}
							}
						},
						{
							name:'detailsParams',
							path: "details/:id/:title",
							component: Details,
						},
					]
				}
			]
		}
	]
});

export default router;
