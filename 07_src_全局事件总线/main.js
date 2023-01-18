import Vue from 'vue'
import App from './App.vue'
// 引入插件
import plugin from './plugins'

// 关闭生产提示
Vue.config.productionTip = false

// 使用插件
Vue.use(plugin);

// 这样写太麻烦
// const Demo = Vue.extend({});
// const d = new Demo();
// Vue.prototype.x = d;

// 还可以通过vm来实现,$bus
new Vue({
  el: `#app`,
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
  }
})
