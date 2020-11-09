/* eslint-disable */

export interface ITodo {
  id: number;
  title: string;
  done: number;
}

const url = "http://localhost:3000/todo/";

export function getTodo() {
  const axios = require("axios").default;
  const allTodos: ITodo[] = [];

  axios
    .get(url, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((res: any) => {
      for (const data of res.data) {
        allTodos.push({
          id: data.id,
          title: data.title,
          done: data.check,
        });
      }
      allTodos.sort((a, b) => {
        return a.id > b.id ? 1 : 0;
      });
    });
  return allTodos;
}

export function addTodo(id: number, title: string) {
  const axios = require("axios").default;
  axios.post(url, {
    id: id,
    title: title,
    check: 0,
  });
}

export function editTodo(title: string, done: number) {
  const axios = require("axios").default;
  axios.post(url + title, {
    title: title,
    check: done,
  });
}

export function editTodoId(id: number, title: string, done: number) {
  const axios = require("axios").default;
  axios.post(url + "id/" + title, {
    id: id,
    title: title,
  });
}

export function deleteTodo(title: string) {
  const axios = require("axios").default;
  axios.delete(url + title);
}
