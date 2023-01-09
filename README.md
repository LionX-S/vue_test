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
（1）传递数据
```html
<h1 name="xxxx"/>
```
（2）接收数据
第一种方式（只接收）：
```JavaScript
props['name']
```
第二种方式（限制类型）：
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