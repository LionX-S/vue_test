<template>
  <li>
    <input type="checkbox" :checked="todo.done" @change="change(todo.id)"/>
    <label>{{todo.title}}</label>
    <button @click="deleteItem(todo.id)">删除</button>
  </li>
</template>

<script>
export default {
  name: 'Item',
  methods:{
    change(id) {
      this.changeState(id);
    },
    deleteItem(id){
      this.deleteList(id);
    }
  },
  props:['todo', 'changeState', 'deleteList']
}
</script>

<style scoped>
  li{
    list-style: none;
    width: 472px;
  }
  li button {
    display: none;
  }
  li:hover button {
    display: block;
    float: right;
  }
</style>