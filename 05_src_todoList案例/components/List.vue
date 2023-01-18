<template>
  <ul class="todo-main">
    <Item
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      :changeState="changeState"
      :deleteList="deleteList"
    ></Item>
  </ul>
</template>

<script>
import Item from "./Item.vue";
export default {
  name: "List",
  props: ["todos", "changeState", "deleteList"],
  components: {
    Item,
  },
};
</script>

<style scoped>
ul {
  width: 472px;
  padding: 0;
}
</style>