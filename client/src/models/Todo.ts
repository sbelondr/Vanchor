/* eslint-disable */

export interface ITodo {
  id: string;
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
          id: data._id,
          title: data.title,
          done: data.check,
        });
      }
    });
  return allTodos;
}

export function addTodo(title: string) {
  const axios = require("axios").default;
  axios.post(url, {
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

export function deleteTodo(title: string) {
  const axios = require("axios").default;
  axios.delete(url + title);
}
