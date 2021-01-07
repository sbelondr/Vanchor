/* eslint-disable */

export interface ITodo {
  id: number;
  title: string;
  done: number;
}

const url = "http://localhost:3000/api/todo/";

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
      allTodos.sort((a, b) => {
        return a.id > b.id ? 1 : 0;
      });
    });
    
  return allTodos;
}

export async function addTodo(title: string) {
  const axios = require("axios").default;
  const result = await axios.post(url, {
    title: title,
    check: 0,
  });
  return result;
  
}

export function editTodo(id: string, title: string, done: number) {
  const axios = require("axios").default;
  axios.post(url + 'update', {
    id: id,
    title: title,
    check: done,
  });
}

export function deleteTodo(id: string) {
  const axios = require("axios").default;
  axios.delete(url + id);
}
