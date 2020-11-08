/* eslint-disable */

export interface INote {
  id: string;
  title: string;
  content: string;
}

export function addNote(title: string, content: string) {
  const axios = require("axios").default;
  axios.post("http://localhost:3000/note", {
    title: title,
    content: content,
  });
};

export function editNote(id: string, title: string, content: string) {
  const axios = require("axios").default;
  axios.post("http://localhost:3000/note/" + id, {
    title: title,
    content: content,
  });
};

export function deleteNote(title: string) {
  const axios = require("axios").default;
  axios.delete("http://localhost:3000/note/" + title);
};

export function getNote() {
  const allNotes: INote[] = [];
  const axios = require("axios").default;

  axios
    .get("http://localhost:3000/note", {
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
