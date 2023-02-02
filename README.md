## ref属性

  1.被用来给元素或自组建注册引用信息（id的替代者）
  2.应用在html标签上获取的是真实的DOM元素，应用在组件标签上是组件实例对象（vc）
  3.使用方式：
    打标识:

```html
<h1 ref="xxx">...<h1>
```

获取：

```javascript
this.$refs.xxx
```

## 配置项props

功能：让组件接收外部传过来的数据
1.传递数据

```html
<h1 name="xxxx"/>
```

2.接收数据
$\quad$第一种方式（只接收）：

```javascript
props['name']
```

$\quad$第二种方式（限制类型）：

```javascript
props:{
  name:String
}
```

第三种方式（限制类型、限制必要性、指定默认值）：

```javascript
props:{
  name:{
    type:String,
    required:true,
    default:'default'
  }
}
```

备注：props是只读的，Vue底层会监测你对props的修改，如果进行了修改，就会发出警告，若业务需求需要修改，那么请复制props内容到data中一份，然后去修改data中的数据。

## mixin(混入)

功能：可以把多个组件公用的配置提取成一个混入对象
第一步定义混入：

```javascript
{
  data(){...}
  methods:{...}
  ...
}
```

第二步使用混入：
（1）全局混入

```javascript
Vue.mixin(xxx)
```

（2）局部混入

```javascript
mixins:[xxx]
```

## 插件

功能：用于增强Vue
本质：包含install方法的一个对象，install的第一个参数是Vue，第二个参数是插件使用者传递的数据。
定义插件：

```javascript
对象.install = function(Vue,options){
  // 添加全局过滤
  Vue.filter(...)
  // 添加全局指令
  Vue.directive(...)
  // 配置全局混入
  Vue.mixin(...)
  // 添加实例方法
  Vue.prototype.$myMethod = function(){...}
  Vue.prototype.$myProperty = xxx
}
```

使用插件：

```javascript
Vue.use()
```

## 总结TodoList案例

1.组件化编码流程：
（1）拆分静态组件：组件要按照功能点拆分，命名不要与html元素冲突。
（2）实现动态组件：考虑好数据的存放位置，数据是一个组件在用，还是一些组件在用：

$\quad$ 1）一个组件在用时，放在组件自身即可。

$\quad$ 2）一些组件在用时，放在他们共同的父组件上（状态提升）
（3）实现交互：从绑定事件开始。
2.props适用于：
（1）父组件===>子组件通信
（2）子组件===>父组件通信（要求父组件先给一个函数）
3.使用v-model时要切记：v-model绑定的值不能是props传过来的值，因为props是不可以修改的
4.props传过来的若是对象类型的值，修改对象中的属性Vue不会报错，但不推荐这样做

## 组件的自定义事件

1.一种组件通信的方式，适用于子组件==>父组件
2.使用场景：A是父组件，B是子组件，B想给A传数据，那么就要在A中给B绑定自定义事件（事件的回调在A中）
3.绑定自定义事件：

$\quad$(1).第一种方式，在父组件中

```html
<Demo @demo='test'></Demo>
或者
<Demo v-on:demo='test'></Demo>
```

$\quad$(2).第二种方式，在父组件中

```javascript
<Demo ref="demo"></Demo>
...
mounted(){
  this.$ref.xxx.$on('testFun',this.testFun)
}
```

$\quad$(3).若想让自定义事件只触发一次，可以使用once修饰符，或者$once方法。
4.触发自定义事件：

```javascript
this.$emit('testFun',数据)
```

5.解绑自定义事件：

```javascript
this.$off('testFun')
```

6.组件上也可以绑定原生DOM事件，需要用native修饰符。
7.注意：通过

```javascript
this.$refs.xxx.$on('testFun',数据)
```

绑定自定义事件时，或调要么配置在methods中，要么使用箭头函数，否则this指向会出问题！

## 全局事件总线

1.一种组件间通信的方式，适合于任意组件间通信。
2.安装全局事件总线：

```javascript
new Vue({
  ...,
  beforeCreate() {
    Vue.prototype.$bus = this; // 安装全局事件总线，$bus就是当前应用的vm
  }
})
```

3.使用事件总线：

$\quad$1.接收数据：A组件想接收数据，则在A组件中给$bus绑定自定义事件，事件的回调留在A组件自身

```JavaScript
methods() {
  demo(data){...}
}
...
mounted() {
  this.$bus.$on('xxx',this.demo)
}
```

$\quad$2.提供数据：```this.$bus.$emit('xxx',数据)```
4.最好在beforeDestory钩子中，用$off去解绑当前组件所用到的事件。

## 消息订阅与发布（pubsub库）

1.一种组件间通信的方式，适用于任意组件间通信。
2.使用步骤：

$\quad$1.安装pubsub，```npm i pubsub-js```

$\quad$2.引入：```import pubsub from 'pubsub-js'```

$\quad$3.接收数据：A组件想接收数据，则在A组件中订阅消息，订阅的回调留在A组件自身。

```javascript
methods(){
  demo(data){...}
}
mounted() {
  this.pid = pubsub.subscribe('xxx',this.demo) //订阅消息
}
```

4.提供数据：```pubsub.publish('xxx',数据)```
5.最好在beforeDestory钩子中，用```pubsub.unsubscribe(pid)```取消订阅。

## nextTick

1.语法：```this.$nextTick(回调函数)```
2.作用：在下一次DOM更新结束后执行其指定的回调。
3.什么时候用：当改变数据后，要基于更新后的新DOM进行某些操作时，要在nextTick所指定的回调函数中执行。

## Vue封装的过渡与动画

1.作用：在插入、更新或移除DOM元素时，在合适的时候给元素添加样式类名。
2.写法：
$\quad$(1).准备好样式：

+ 元素进入时的样式：
  $\qquad$1.v-enter:进入的起点
  $\qquad$2.v-enter-active:进入的过程中
  $\qquad$3.v-enter-to:进入的终点
+ 元素离开时的样式：
  $\qquad$1.v-leave:离开的起点
  $\qquad$2.v-leave-active:离开的过程中
  $\qquad$3.v-leave-to:离开的终点

$\quad$(2).使用<transition>包裹要过渡的元素，并配置name属性

```html
<transition name='hello'>
  <h1 v-show='isShow'>
    你好
  </h1>
</transition>
```

$\quad$(3).备注：若有多个元素需要过渡，则使用<transition-group>,且每个元素都需要指定的key值。

## vue脚手架配置代理

方法一：
$\quad$在vue.config.js中添加如下配置：

```javascript
devServer:{
  proxy:'http://localhost:5000'
}
```

说明：
$\quad$1.优点：配置简单，请求资源时直接发送给前端（8080）即可。
$\quad$2.缺点：不能配置多个代理，不能灵活的控制请求是否走代理。
$\quad$3.工作方式：若按照上述配置代理，当请求了前端不存在的资源时，那么请求会转发给服务器（优先匹配前端资源）
方法二：
$\quad$编写vue.config.js具体代理规则：

```javascript
module.exports={
  devServe: {
    proxy: {
      '/api1': {//匹配以‘/api1’开头的请求路径
        target: 'http://localhost:5001',//代理目标的基础路径
        changeOrigin: true,
        pathRewrite: {'^/api1': ''} //此配置项必须写
      },
      '/api2': {//匹配以‘/api2’开头的请求路径
        target: 'http://localhost:5001',//代理目标的基础路径
        changeOrigin: true,
        pathRewrite: {'^/api2': ''} //此配置项必须写
      }
    }
  }
}
/*
  changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5001,
  changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:8080,
  changeOrigin默认值为true
*/
```

说明：
$\quad$1.优点：可以配置多个代理，且可以灵活的控制请求是否走代理。
$\quad$2.配置略微繁琐，请求资源时必须加前缀。

##插槽
$\quad$1.作用:让父组件可以向子组件指定位置插入html结构，也是一种组件间通信的方式，适用于父组件==>子组件
$\quad$2.分类：默认插槽、具名插槽、作用域插槽
$\quad$3.使用方式
$\qquad$1.默认插槽

```html
父组件中：
<Category>
  <div>html结构</div>
</Category>
子组件中：
<template>
  <div>
    <!-- 定义插槽 -->
    <slot>插槽默认内容...</slot>
  </div>
</template>
```

$\qquad$2.具名插槽

```html
父组件中：
<Category>
  <template slot="center">
    <div>html结构1</div>
  </template>
  <!-- v-slot是新的语法 -->
  <template v-slot:footer>
    <div>html结构2</div>
  </template>
</Category>
子组件中：
<template>
  <div>
    <!-- 定义插槽 -->
    <slot name="center">插槽黙以内容...</slot>
    <slot name="footer">插槽默认内容...</slot>
  </div>
</template>
```

$\qquad$3.作用域插槽
$\qquad\qquad$1.理解：数据在组件的自身vue文件中，但根据数据生成的结构需要组件的使用者来决定。
$\qquad\qquad$2.具体编码：

```html
父组件中：
<Category>
  <template scope="scopeData">
    <!-- 生成的是ul列表 -->
    <ul>
      <li v-for="g in scopeData.games" :key="g">{{g}}</li>
    </ul>
  </template>
</Category>
<Category>
  <template slot-scope="scopeData">
    <!-- 生成的是h4标题  -->
    <h4 v-for=''g in scopeData.games"
    :key="g">{{g}}</h4>
  </template> 
</Category>
子组件中：
<template>
  <div></div>
</template>
<slot :games="games"></slot>
<script>
  export default {
    name: 'Category',
    props: ['title'], //数据在子组件自身
    data() {
      return {
        games：["红色警戒"，"穿越火线"，"劲舞团"，"超級玛丽"]
      }
    }
  }
</script>
```

## Vuex

### 1.概念

$\quad$在Vue中实现集中式状态（数据）管理的一个vue插件，对vue应用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件间的通信方式，且属于任意组件间通信。

![Vuex图示](https://vuex.vuejs.org/vuex.png)

### 2.何时使用？

$\quad$多个组件需要共享数据时

### 3.搭建vuex环境

$\quad$1.创建文件 src/store/index.js

```javascript
//引入vue核心库
import Vue from 'vue'
import Vuex from 'vuex'
//应用Vuex插件
Vue. use(Vuex)
//淮备actions对象 响应组件中用户的动作
const actions = {}
//准备mutations对象 修改state中的数据
const mutations ={}
//准备state对象 保存具体的数据
const state = {}
//创建并暴露store
export default new Vuex.Store({
  actions, 
  mutations, 
  state
})
```

$\quad$2.在main.js中创建vm时传入store配置项

```javascript
// 引入store
import store from './store';
new Vue({
  el: `#app`,
  render: h => h(App),
  store
})
```

### 4.基本使用

$\quad\quad$1.初始化数据、配置actions、配置mutations、操作文件store.js

```javascript
import Vuex from "vuex";
import Vue from "vue";
Vue.use(Vuex);

// action:用于响应组件中的动作
const actions = {
  // 这两个只是转发，可以省略，组件直接调用commit即可
    // increment(context, value) {
    //     context.commit("Increment", value);
    // },
    // decrement(context, value) {
    //     context.commit("Decrement", value);
    // },
    incrementOdd(context, value) {
        if (context.state.sum % 2) {
            context.commit("Increment", value);
        }
    },
    incrementWait(context, value) {
        setTimeout(() => {
            context.commit("Increment", value);
        }, 500);
    }
};
// 用于存储数据
const state = {sum: 0};
// 用于操作数据（state）
const mutations = {
    Increment(state, value) {
        state.sum += value;
    },
    Decrement(state, value) {
        state.sum -= value;
    }
};

export default new Vuex.Store({
    actions,
    mutations,
    state
});
```

$\quad$2.组件中读取vuex中的数据:$store.state.sum

$\quad$3.组件中修改vuex中的数据: `$store.dispatch('action中的方法名',数据)`或 `$store.commit('mutations中的方法名',数据）`
$\quad$**备注**若没有网络请求或其他业务逻辑，组件中也可以越过actions，即不写dispatch，直接编写 commit

### 5.getters的使用

```javascript
// 用于加工state中的数据
const getters = {
  bigNum(state) {
    return state.sum * 10
  }
}

export default new Vuex.Store({
    // ...
    actions,
    mutations,
    state,
  getters
});
```

### 6.四个map方法的使用

$\quad$1.**mapState方法**:用于帮我们映射state中的数据为计算属性

```javascript
computed: {
  // 借助mapState生成计算属性，sum、school、subject（对象写法）
  ...mapState({sum:'sum',school:'school',subject:'subject'});
  // 借助mapState生成计算属性，sum、school、subject（数组写法）
  ...mapState(['sum','school','subject'])
}
```

$\quad$2.**mapGetters方法**:用于帮我们映射getters中的数据为计算属性

```javascript
computed: {
  // 借助mapState生成计算属性，bigSum（对象写法）
  ...mapGetters({bigSum:'bigSum'});
  // 借助mapState生成计算属性，bigSum（数组写法）
  ...mapState(['bigSum']);
}
```

$\quad$3.**mapActions方法**:用于帮我们生成与action对话中的方法,即包含$store.dispatch(xxx)的函数

```javascript
methods: {
//靠mapActions生成：incrementOdd、incrementWait（对象形式）
...mapActions ({incrementOdd: 'incrementOdd', incrementWait: 'incrementWait').
//靠mapActions生成：incrementOdd、incrementWait（数组形式）
...mapActions (['incrementOdd', 'incrementWait'])
```

$\quad$4.**mapMutations方法**:用于帮我们生成与mutations对话中的方法,即包含$store.commit(xxx)的函数

```javascript
methods: {
//靠mapMutations生成：incrementOdd、incrementWait（对象形式）
...mapMutations ({incrementOdd: 'IncrementOdd', incrementWait: 'IncrementWait').
//靠mapActions生成：incrementOdd、incrementWait（数组形式）
...mapMutations (['IncrementOdd', 'IncrementWait'])
```

$\quad$**备注:** mapActions与mapMutations使用时，若需要传递参数：在模版中绑定事件时传递好参数，否则参数是事件对象。

### 7.模块化+命名空间

$\quad\quad$1.目的：让代码更好维护，让多种数据分类更加明确 

$\quad\quad$2.修改store.js

```javascript
const countOptions = {
    namespaced: true,
    actions: {},
    mutations: {},
    state: {},
    getters: {}
};
const personOptions = {
    namespaced: true,
    actions: {},
    mutations: {},
    state: {},
    getters: {}
};
const store = new Vuex.Store({
    modules:{
        count: countOptions,
        person: personOptions
    }
});
```

```javascript
const countOptions = {
    namespaced: true,
    actions: {},
    mutations: {},
    state: {},
    getters: {}
};
const personOptions = {
    namespaced: true,
    actions: {},
    mutations: {},
    state: {},
    getters: {}
};
const store = new Vuex.Store({
    modules:{
        count: countOptions,
        person: personOptions
    }
});
```

$\quad$3.开启命名空间后，组件中读取state数据

```javascript
  //方式一：自己直接读取
  this.$store.state.countOption.sum
  // 方式二：借助mapState读取
  ...mapState('countOption',['sum'])
```

$\quad$4.开启命名空间后，组件中读取getters数据

```javascript
  //方式一：自己直接读取
  this.$store.getters['countOption/bigNum']
  // 方式二：借助mapGetters读取
  ...mapGetters('countOption',['bigNum'])
```

$\quad$5.开启命名空间后，组件中调用dispatch

```javascript
  //方式一：自己直接dispatch
  this.$store.dispatch('countOptions/increment',value)
  // 方式二：借助mapActions读取
  ...mapActions('countOption',['increment'])
```

$\quad$6.开启命名空间后，组件中调用commit

```javascript
  //方式一：自己直接commit
  this.$store.commit('countOptions/Increment',value)
  // 方式二：借助mapMutations读取
  ...mapMutations('countOption',{increment:'Increment'})
```

## 路由

$\quad$ 1.理解：一个路由（router）就是一组映射关系（key-value），多个路由需要路由器（router）进行管理。

$\quad$ 2.前端路由：key是路径，value是组件。

### 1.基本使用

$\quad$ 1.安装vue-touter，命令：```npm i vue-router```

$\quad$ 2.应用插件：```Vue.use(VueRouter)```

   3.编写router配置项：

```javascript
// 用于创建整个应用的路由器
import VueRouter from "vue-router";

// 引入组件
import About from "../components/About.vue";
import Home from "../components/Home.vue";

const router = new VueRouter({
	routes: [
		{
			path: "/about",
			component: About
		},
		{
			path: "/home",
			component: Home
		}
	]
});

export default router;

```

$\quad$ 4.实现切换（active-class可配置active样式类）

```html
<router-link active-class='active' to='/about'>About</router-link>
```

$\quad$ 5.指定展示位置

```html
<router-view></router-view>
```