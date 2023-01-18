<template>
  <div class="todo-header">
    <input
      type="text"
      placeholder="请输入待办事项，按回车键确认"
      v-model="title"
      @keyup.enter="add"
    />
  </div>
</template>

<script>
import { nanoid } from "nanoid";
export default {
  name: "MyHeader",
  data() {
    return {
      title: "",
    };
  },
  props: ["receive"],
  methods: {
    add() {
      if (!this.title.trim()) return;
      const todoObj = { id: nanoid(), title: this.title, done: false };
      this.receive(todoObj);
      this.title = "";
    },
  },
};
</script>

<style>
.todo-header {
  width: 480px;
  height: 80px;
  margin-left: 10px;
}
.todo-header > input {
  width: 472px;
  height: 30px;
  margin-top: 25px;
}
</style>