<template>
  <div id="app">
    <div class="todo-container">
      <div class="todo-wrap">
        <MyHeader :receive="receive"></MyHeader>
        <List :todos="todos" :changeState="changeState" :deleteList="deleteList"></List>
        <MyFooter :todos="todos" :allSelected="allSelected" :allDelete="allDelete"></MyFooter>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from './components/MyHeader.vue';
import List from './components/List.vue';
import MyFooter from './components/MyFooter.vue';

export default {
  name: "App",
  data(){
    return {
      todos:[]
    }
  },
  // 父子通信
  methods:{
    // 添加
    receive(obj) {
      this.todos.unshift(obj)
    },
    // 勾选
    changeState(id) {
      const changeItem = this.todos.find((item) => {
        return item.id === id;
      });
      changeItem.done = !changeItem.done;
    },
    // 删除
    deleteList(id) {
      this.todos = this.todos.filter((item) => {
        return item.id !== id;
      });
    },
    // 全选或全不选
    allSelected(state) {
      this.todos.forEach((todo) => {
        todo.done = state;
      })
    },
    // 全部删除
    allDelete() {
      this.todos = this.todos.filter((todo) => {
        return !todo.done
      })
    }
  },
  components: {
    MyHeader,
    List,
    MyFooter
  }
};
</script>

<style>
  .todo-container{
    width: 500px;
    height: 500px;
    border: solid 1px;
    border-radius: 5px;
  }
</style>
