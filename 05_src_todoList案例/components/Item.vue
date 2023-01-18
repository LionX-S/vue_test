<template>
  <li>
    <input type="checkbox" :checked="todo.done" @change="change(todo.id)" />
    <label v-show="!todo.edit">{{ todo.title }}</label>
    <input
      v-show="todo.edit"
      type="text"
      :value="todo.title"
      @blur="handleBlur(todo, $event)"
      ref="inputText"
    />
    <button @click="deleteItem(todo.id)">删除</button>
    <button @click="editItem(todo)">编辑</button>
  </li>
</template>

<script>
export default {
  name: "Item",
  methods: {
    change(id) {
      this.changeState(id);
    },
    deleteItem(id) {
      this.deleteList(id);
    },
    //点击编辑框
    editItem(todo) {
      if (todo.hasOwnProperty("edit")) {
        todo.edit = true;
      } else {
        this.$set(todo, "edit", true);
      }
      // 使用nextTick调用focus事件
      this.$nextTick(function() {
        this.$refs.inputText.focus()
      })
      
    },
    handleBlur(todo, e) {
      todo.edit = false;
      this.$bus.$emit("editItemList", todo.id, e.target.value);
    },
  },
  props: ["todo", "changeState", "deleteList"],
};
</script>

<style scoped>
li {
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