import Vue from 'vue'
import App from './App.vue'
// 引入插件
import plugin from './plugins'

// 关闭生产提示
Vue.config.productionTip = false

// 使用插件
Vue.use(plugin);

new Vue({
  el: `#app`,
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this
  }
})
