/* eslint-disable */

import store from "@/store";

export interface ITodo {
  id: number;
  title: string;
  done: number;
}

const url = "http://localhost:3000/api/todo/";
const axios = require("axios").default;
const config = {
  headers: { Authorization: `Bearer ${store.getters.getUser.getAccessToken()}` }
};

export function getTodo() {
  const allTodos: ITodo[] = [];

  axios
    .get(url + store.getters.getUser.getId(), config)
    .then((res: any) => {
      for (const data of res.data) {
        allTodos.push({
          id: data._id,
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

export async function addTodo(title: string) {
  const bodyParameters = {
    idUser: store.getters.getUser.getId(),
    title: title,
    check: 0,
  }
  const result = await axios.post(url, bodyParameters, config);
  return result;
  
}

export function editTodo(id: string, title: string, done: number) {
  axios.post(url + 'update', {
    id: id,
    title: title,
    check: done,
  }, config);
}

export function deleteTodo(id: string) {
  axios.delete(url + id, config);
}
