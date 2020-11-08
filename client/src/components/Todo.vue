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
        <li v-for="(todo, index) in allTodo" :key="todo.id" :class="{ todo }">
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

import { getTodo, addTodo, editTodo, deleteTodo } from "@/models/Todo";

export default {
  name: "Todo",
  setup() {
    const newTodo = ref("");
    const allTodo = ref([]);

    function sortList() {
      allTodo.value.sort((a, b) => a.done && !b.done);
    }

    function startTodo() {
      allTodo.value = getTodo();
      sortList();
    }

    function searchDoublon(value) {
      for (const todo of allTodo.value) {
        if (todo.title == value) {
          return false;
        }
      }
      return true;
    }

    function addNewTodo() {
      const size = newTodo.value.length;
      if (size > 0 && size < 51 && searchDoublon(newTodo.value)) {
        allTodo.value.push({
          id: Date.now(),
          done: false,
          title: newTodo.value,
        });
        addTodo(newTodo.value);
        sortList();
        newTodo.value = "";
      }
    }

    function toggleDone(todo) {
      editTodo(todo.title, todo.done ? 0 : 1);
      todo.done = !todo.done;
      sortList();
    }

    function markAllDone() {
      allTodo.value.forEach((todo) => {
        editTodo(todo.title, 1);
        todo.done = true;
      });
    }

    function removeAll() {
      this.$bvModal
        .msgBoxConfirm("Are you sure?")
        .then((value) => {
          if (value) {
            for (const todo of allTodo.value) {
              deleteTodo(todo.title);
            }
            allTodo.value = [];
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
            allTodo.value = allTodo.value.filter((todo) => {
              if (todo.done == true) {
                deleteTodo(todo.title);
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
      deleteTodo(allTodo.value[index].title);
      allTodo.value.splice(index, 1);
    }

    onMounted(() => {
      startTodo();
    });

    return {
      allTodo,
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
