## ref属性
  1.被用来给元素或自组建注册引用信息（id的替代者）
  2.应用在html标签上获取的是真实的DOM元素，应用在组件标签上是组件实例对象（vc）
  3.使用方式：
    打标识:
```html
<h1 ref="xxx">...<h1>
```
获取：
```JavaScript
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
```JavaScript
props['name']
```
$\quad$第二种方式（限制类型）：
```JavaScript
props:{
  name:String
}
```
第三种方式（限制类型、限制必要性、指定默认值）：
```JavaScript
props:{
  name:{
    type:String,
    required:true,
    default:'default'
  }
}
```
备注：props是只读的，Vue底层会监测你对props的修改，如果进行了修改，就会发出警告，若业务需求需要修改，那么请复制props内容到data中一份，然后去修改data中的数据。
## minxin(混入)
功能：可以把多个组件公用的配置提取成一个混入对象
第一步定义混入：
```JavaScript
{
  data(){...}
  methods:{...}
  ...
}
```
第二步使用混入：
（1）全局混入
```JavaScript
Vue.mixin(xxx)
```
（2）局部混入
```JavaScript
mixins:[xxx]
```
## 插件
功能：用于增强Vue
本质：包含install方法的一个对象，install的第一个参数是Vue，第二个参数是插件使用者传递的数据。
定义插件：
```JavaScript
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
```JavaScript
Vue.use()
```
##总结TodoList案例
1.组件化编码流程：
（1）拆分静态组件：组件要按照功能点拆分，命名不要与html元素冲突。
（2）实现动态组件：考虑好数据的存放位置，数据是一个组件在用，还是一些组件在用：
$\quad$1）一个组件在用时，放在组件自身即可。
$\quad$2）一些组件在用时，放在他们共同的父组件上（状态提升）
（3）实现交互：从绑定事件开始。
2.props适用于：
（1）父组件===>子组件通信
（2）子组件===>父组件通信（要求父组件先给一个函数）
3.使用v-model时要切记：v-model绑定的值不能是props传过来的值，因为props是不可以修改的
4.props传过来的若是对象类型的值，修改对象中的属性Vue不会报错，但不推荐这样做
##组件的自定义事件
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
```JavaScript
<Demo ref="demo"></Demo>
...
mounted(){
  this.$ref.xxx.$on('testFun',this.testFun)
}
```
$\quad$(3).若想让自定义事件只触发一次，可以使用once修饰符，或者$once方法。
4.触发自定义事件：
```JavaScript
this.$emit('testFun',数据)
```
5.解绑自定义事件：
```JavaScript
this.$off('testFun')
```
6.组件上也可以绑定原生DOM事件，需要用native修饰符。
7.注意：通过
```JavaScript
this.$refs.xxx.$on('testFun',数据)
```
绑定自定义事件时，或调要么配置在methods中，要么使用箭头函数，否则this指向会出问题！
##全局事件总线
1.一种组件间通信的方式，适合于任意组件间通信。
2.安装全局事件总线：
```JavaScript
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
mountde() {
  this.$bus.$on('xxx',this.demo)
}
```
$\quad$2.提供数据：```this.$bus.$emit('xxx',数据)```
4.最好在beforeDestory钩子中，用$off去解绑当前组件所用到的事件。
##消息订阅与发布（pubsub库）
1.一种组件间通信的方式，适用于任意组件间通信。
2.使用步骤：
$\quad$1.安装pubsub，```npm i pubsub-js```
$\quad$2.引入：```import pubsub from 'pubsub-js'```
$\quad$3.接收数据：A组件想接收数据，则在A组件中订阅消息，订阅的回调留在A组件自身。
```JavaScript
methods(){
  demo(data){...}
}
mounted() {
  this.pid = pubsub.subscribe('xxx',this.demo) //订阅消息
}
```
4.提供数据：```pubsub.publish('xxx',数据)```
5.最好在beforeDestory钩子中，用```pubsub.unsubscribe(pid)```取消订阅。
##nextTick
1.语法：```this.$nextTick(回调函数)```
2.作用：在下一次DOM更新结束后执行其指定的回调。
3.什么时候用：当改变数据后，要基于更新后的新DOM进行某些操作时，要在nextTick所指定的回调函数中执行。
##Vue封装的过渡与动画
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