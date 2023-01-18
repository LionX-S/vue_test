export default {
  install(Vue){
    // 定义混入
    Vue.mixin({
      methods:{
        showName(){
          alert(this.name)
        }
      }
    })
  }
}