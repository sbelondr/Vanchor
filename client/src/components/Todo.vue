<template>
  <div class="Todo">
    <h3>To Do</h3>
    <form class="mt-3" @submit.prevent="addNewTodo">
      <b-row class="ml-5">
        <b-col sm="3" class="text-left">
          <b-form-input
            type="text"
            v-model="newTodo"
            name="newTodo"
            placeholder="New todo"
          ></b-form-input>
        </b-col>
        <b-col sm="2" class="text-left">
          <b-button variant="outline-primary" @click="addNewTodo"
            >Add new todo</b-button
          >
        </b-col>
      </b-row>
    </form>

    <ul class="display-todo">
      <b-list-group class="w-50 ml-2 mr-5 mt-3 navig-todo">
        <li v-for="(todo, index) in todos" :key="todo.id" :class="{ todo }">
          <b-list-group-item>
            <b-row>
              <b-col sm="10" class="text-left">
                <h5 :class="{ done: todo.done }" @click="toggleDone(todo)">
                  {{ todo.title }}
                </h5>
              </b-col>
              <b-col sm="2">
                <b-button variant="danger" @click="removeTodo(index)"
                  >Remove</b-button
                >
              </b-col>
            </b-row>
          </b-list-group-item>
        </li>
      </b-list-group>
    </ul>

    <b-row class="mt-4">
      <b-col sm="4">
        <b-button variant="success" @click="markAllDone"
          >Mark all done</b-button
        >
      </b-col>
      <b-col sm="4">
        <b-button variant="danger" @click="removeAllDone"
          >Remove all done</b-button
        >
      </b-col>
      <b-col sm="4">
        <b-button variant="danger" @click="removeAll">Remove all</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { ref, onMounted } from "@vue/composition-api";

export default {
  name: "Todo",
  setup() {
    const newTodo = ref("");
    const todos = ref([]);

    const axios = require("axios").default;

    function sortList() {
      todos.value.sort((a, b) => a.done && !b.done);
    }

    function startTodo() {
      axios
        .get("http://localhost:3000/todo", {
          headers: { "Access-Control-Allow-Origin": "*" },
        })
        .then((res) => {
          if (res.data != "0") {
            for (const todo of res.data) {
              todos.value.push({
                id: todo._id,
                title: todo.title,
                done: todo.check,
              });
            }
          }
        })
        .then(() => {
          sortList();
        });
    }

    function searchDoublon(value) {
      for (const todo of todos.value) {
        if (todo.title == value) {
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
          title: newTodo.value,
        });
        axios.post("http://localhost:3000/todo", {
          title: newTodo.value,
          check: 0,
        });
        sortList();
        newTodo.value = "";
      }
    }

    function toggleDone(todo) {
      axios.post("http://localhost:3000/todo/" + todo.title, {
        title: todo.title,
        check: todo.done ? 0 : 1,
      });
      todo.done = !todo.done;
      sortList();
    }

    function markAllDone() {
      todos.value.forEach((todo) => {
        axios.post("http://localhost:3000/todo/" + todo.title, {
          title: todo.title,
          check: 1,
        });
        todo.done = true;
      });
    }

    function removeAll() {
      this.$bvModal
        .msgBoxConfirm("Are you sure?")
        .then((value) => {
          if (value) {
            for (const todo of todos.value) {
              axios.delete("http://localhost:3000/todo/" + todo.title);
            }
            todos.value = [];
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }

    function removeAllDone() {
      this.$bvModal
        .msgBoxConfirm("Are you sure?")
        .then((value) => {
          if (value) {
            todos.value = todos.value.filter((todo) => {
              if (todo.done == true) {
                axios.delete("http://localhost:3000/todo/" + todo.title);
              }
              return todo.done == false;
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }

    function removeTodo(index) {
      axios.delete("http://localhost:3000/todo/" + todos.value[index].title);
      todos.value.splice(index, 1);
    }

    onMounted(() => {
      startTodo();
      // sortList();
    });

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

ul {
  list-style-type: none;
}

.navig-todo {
  max-height: 75vh;
  overflow: scroll;
  overflow-x: hidden;
}

.display-todo {
  display: ruby;
}

</style>
