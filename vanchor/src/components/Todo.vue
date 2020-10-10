<template>
<div class="Todo">
  <h3>To Do</h3>
  <form @submit.prevent="addNewTodo">
    <b-row class="my-1">
      <b-col sm="3">
        <label>New Todo:</label>
      </b-col>
      <b-col sm="3">
        <b-form-input type="text" v-model="newTodo" name="newTodo"></b-form-input>
      </b-col>
      <b-col sm="2">
        <b-button variant="outline-primary" @click="addNewTodo">Add new Todo</b-button>
      </b-col>
    </b-row>
  </form>

  <b-row class="my-1">
    <b-col sm="4">
      <b-button variant="success" @click="markAllDone">Mark all done</b-button>
    </b-col>
    <b-col sm="4">
      <b-button variant="danger" @click="removeAllDone">Remove all done</b-button>
    </b-col>
    <b-col sm="4">
      <b-button variant="danger" @click="removeAll">Remove all</b-button>
    </b-col>
  </b-row>

  <ul>
    <li v-for="(todo, index) in todos" :key="todo.id" :class="{ todo }">
      <b-row>
        <b-col sm="4">
          <h5 :class="{ done: todo.done }" @click="toggleDone(todo)">
            {{ todo.content }}
          </h5>
        </b-col>
        <b-col sm="2">
          <b-button variant="danger" @click="removeTodo(index)">Remove</b-button>
        </b-col>
      </b-row>
    </li>
  </ul>
</div>
</template>

<script>
import {
  ref
} from "@vue/composition-api";

export default {
  name: "Todo",
  setup() {
    const newTodo = ref("");
    const todos = ref([]);

    function sortList() {
      todos.value.sort((a, b) => a.done && !b.done);
    }

    function searchDoublon(value) {
      for (const todo of todos.value) {
        if (todo.content == value) {
          return false;
        }
      }
      return true;
    }

    function addNewTodo() {
      const size = newTodo.value.length;
      if (size > 0 && size < 51 && searchDoublon(newTodo.value)) {
        todos.value.push({
          id: Date.now(),
          done: false,
          content: newTodo.value,
        });
        newTodo.value = "";
        sortList();
      }
    }

    function toggleDone(todo) {
      todo.done = !todo.done;
      sortList();
    }

    function markAllDone() {
      todos.value.forEach((todo) => (todo.done = true));
    }

    function removeAll() {
      todos.value = [];
    }

    function removeAllDone() {
      todos.value = todos.value.filter((todo) => todo.done == false);
    }

    function removeTodo(index) {
      todos.value.splice(index, 1);
    }

    return {
      todos,
      newTodo,
      addNewTodo,
      markAllDone,
      removeAll,
      removeAllDone,
      toggleDone,
      removeTodo,
    };
  },
};
</script>

<style scoped>
.todo {
  cursor: pointer;
}

.done {
  text-decoration: line-through;
}
</style>
