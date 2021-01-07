<template>
  <div class="Note">
    <h3 class="mt-3">Notes</h3>
    <div class="ml-5 mt-5">
      <b-row>
        <b-col sm="3">
          <b-form-input
            type="text"
            v-model="title"
            placeholder="Title note"
          ></b-form-input>
        </b-col>
        <b-col sm="2" class="text-left">
          <b-button @click="handleAddNote">Launch Stackedit</b-button>
        </b-col>
      </b-row>
    </div>
    <div class="manageNote">
      <div class="displayList">
        <ul class="navig-todo" fluid="sm">
          <b-list-group>
            <li v-for="note in allNotes" :key="note.id" :class="{ note }">
              <b-list-group-item>
                <b-row>
                  <b-col
                    sm="6"
                    class="titleNote"
                    @click="displayThisContent(note)"
                  >
                    <h5>
                      {{ note.title }}
                    </h5>
                  </b-col>
                  <b-col sm="2" class="btnNote">
                    <b-button variant="outline-primary" @click="handleEditNote(note)"
                      >Edit</b-button
                    >
                  </b-col>
                  <b-col sm="2" class="btnNote">
                    <b-button variant="outline-danger" @click="handleDeleteNote(note)"
                      >Delete</b-button
                    >
                  </b-col>
                </b-row>
              </b-list-group-item>
            </li>
          </b-list-group>
        </ul>
      </div>
      <div class="text-left displayMarkdown" v-html="displayMarkdownContent" />
    </div>
  </div>
</template>

<script>
import marked from "marked";
import {
  ref,
  onMounted,
} from "@vue/composition-api";
import Stackedit from "stackedit-js";
import { addNote, editNote, deleteNote, getNote } from "@/models/Note";

export default {
  name: "Note",
  setup() {
    const title = ref("");
    const allNotes = ref([]);
    const displayMarkdownContent = ref("");

    function launchStackEdit(note, isNew) {
      const stackedit = new Stackedit();

      // Open the iframe
      stackedit.openFile({
        name: note.title, // with a filename
        content: {
          text: note.content, // Markdown content.
        },
      });
      stackedit.on("fileChange", (file) => {
        note.content = file.content.text;
      });
      stackedit.on("close", async () => {
        if (isNew) {
          let id = 0;
          await addNote(note.title, note.content).then((value) => {
            id = value.data.id;
          });
          allNotes.value.push({
            id: id,
            title: note.title,
            content: note.content,
          });
        } else {
          editNote(note.id, note.title, note.content);
          allNotes.value.forEach((n) => {
            if (n.id == note.id) {
              n.content = note.content;
            }
          });
        }
      });
    }

    function displayThisContent(note) {
      displayMarkdownContent.value = marked(note.content, { sanitize: true });
    }

    function handleEditNote(note) {
      launchStackEdit(note, false);
    }

    function handleAddNote() {
      const note = {
        id: Date.now(),
        title: title.value,
        content: "",
      };
      launchStackEdit(note, true);
      title.value = "";
    }

    function handleDeleteNote(note) {
      this.$bvModal
        .msgBoxConfirm("Are you sure?")
        .then((value) => {
          if (value) {
            deleteNote(note.id);
            allNotes.value = allNotes.value.filter(
              (n) => n.title != note.title
            );
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }

    onMounted(async () => {
      allNotes.value = await getNote();
    });

    return {
      title,
      allNotes,
      handleAddNote,
      handleEditNote,
      handleDeleteNote,
      displayThisContent,
      displayMarkdownContent,
    };
  },
};
</script>

<style scoped>
.note {
  cursor: pointer;
}

ul {
  list-style-type: none;
}

.navig-todo {
  max-height: 75vh;
  overflow: scroll;
  overflow-x: hidden;
}

.titleNote {
  text-align: left;
}

.btnNote {
  display: flex;
  align-content: flex-end;
}

.manageNote {
  display: flex;
  margin-top: 5vh;
}

.displayList {
  flex-grow: 1;
}

.displayMarkdown {
  margin-left: 2vw;
  flex-grow: 5;
  text-align: left;
  text-decoration-style: none;
  max-height: 75vh;
  max-width: 50vw;
  overflow: scroll;
  overflow-x: hidden;
}
</style>
