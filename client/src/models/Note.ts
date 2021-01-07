/* eslint-disable */

export interface INote {
  id: string;
  title: string;
  content: string;
}

const url = "http://localhost:3000/api/note/";

export async function addNote(title: string, content: string) {
  const axios = require("axios").default;
  const result = await axios.post(url, {
    title: title,
    content: content,
  });
  return result;
};

export async function editNote(id: string, title: string, content: string) {
  const axios = require("axios").default;
  await axios.post(url + 'update', {
    id: id,
    title: title,
    content: content,
  }).then((res: Response) => {
    console.log(res);
    
    return res;
  });
  return null;
};

export function deleteNote(id: string) {
  const axios = require("axios").default;
  axios.delete(url + id);
};

export function getNote() {
  const allNotes: INote[] = [];
  const axios = require("axios").default;

  axios
    .get(url, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((res: any) => {
      for (const note of res.data) {
        allNotes.push({
          id: note._id,
          title: note.title,
          content: note.content,
        });
      }
    });
    return allNotes;
};
