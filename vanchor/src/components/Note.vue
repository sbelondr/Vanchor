<template>
<div class="Note">
  <h3>Notes</h3>
  <div class="addNote">
    <b-row>
      <b-col sm="5">
        <b-form-input type="text" v-model="title" placeholder="Title note"></b-form-input>
      </b-col>
      <b-col sm="4">
        <b-button @click="addNote">Launch Stackedit</b-button>
      </b-col>
    </b-row>
  </div>
  <div>
    <ul>
      <li v-for="note in allNotes" :key="note.id" :class="{ note }">
        <h3 @click="editNote(note)">
          {{ note.title }}
        </h3>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import {
  ref,
  onMounted,
  // reactive
} from "@vue/composition-api";
import Stackedit from "stackedit-js";

export default {
  name: "Note",
  setup() {
    const title = ref("");
    const allNotes = ref([]);

    function launchStackEdit(note, isNew) {
      const stackedit = new Stackedit();

      // Open the iframe
      stackedit.openFile({
        name: note.title, // with a filename
        content: {
          text: note.content, // and the Markdown content.
        },
      });
      stackedit.on("fileChange", (file) => {
        note.content = file.content.text;
      });
      stackedit.on("close", () => {
        if (isNew) {
          allNotes.value.push({
            id: note.id,
            title: note.title,
            content: note.content,
          });
          const axios = require("axios").default;
          axios.post("http://localhost:3000/note", {
            title: note.title,
            content: note.content,
          });
        } else {
          const axios = require("axios").default;
          axios.post("http://localhost:3000/note/" + note.id, {
            title: note.title,
            content: note.content,
          });
          allNotes.value.forEach((n) => {
            if (n.id == note.id) {
              n.content = note.content;
            }
          });
        }
      });
    }

    function editNote(note) {
      launchStackEdit(note, false);
    }

    function addNote() {
      const note = {
        id: Date.now(),
        title: title.value,
        content: "",
      };
      launchStackEdit(note, true);
    }

    onMounted(() => {
      const axios = require("axios").default;
      axios
        .get("http://localhost:3000/note", {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((res) => {
          for (const note of res.data) {
            allNotes.value.push({
              id: note._id,
              title: note.title,
              content: note.content,
            });
          }
        });
    });

    return {
      title,
      allNotes,
      addNote,
      editNote,
    };
  },
};
</script>

<style scoped>
.note {
  cursor: pointer;
}
</style>
