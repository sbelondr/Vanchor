<template>
  <div class="AddEditArticle">
    <div class="input title">
      <b-form-input v-model="myData.editArticle.title" placeholder="Title..."></b-form-input>
    </div>
    <div class="input description">
      <b-form-input v-model="myData.editArticle.description" placeholder="Description..."></b-form-input>
    </div>
    <div class="input contenu">
      <b-form-textarea
        id="textarea"
        v-model="myData.editArticle.contenu"
        placeholder="Enter data..."
        rows="10"
        max-rows="30"
      ></b-form-textarea>
    </div>
    <div>
      <b-form-select v-model="selected" :options="options"></b-form-select>
      <b-form-select v-model="selected" :options="options" size="sm" class="mt-3"></b-form-select>
      <div class="mt-3">
        Selected:
        <strong>{{ selected }}</strong>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Article } from "@/models/Article";

interface InterfaceSelect {
  value: string;
  text: string;
}

@Component
export default class AddEditArticle extends Vue {
  @Prop()
  private article!: Article;
  private modeEdit!: boolean;

  myData: {
    editArticle: Article;
    options: InterfaceSelect[];
    selected: InterfaceSelect;
  } = {
    editArticle: this.cloneArticle(),
    options: [
      { value: "Published", text: "Published" },
      { value: "Draft", text: "Draft" },
      { value: "Archived", text: "Archived" },
    ],
    selected: { value: "Published", text: "Published" },
  };

  // computed are declared with get before a function
  get myComputed(): Article {
    return this.myData.editArticle;
  }

  // created() {}

  cloneArticle(): Article {
    const id: string = this.modeEdit
      ? this.article.id
      : Math.random()
          .toString(36)
          .replace(/[^a-z]+/g, "")
          .substr(0, 25);
    return new Article(
      id,
      this.article.title,
      this.article.description,
      this.article.contenu,
      this.article.publishedOn,
      this.article.status,
      this.article.allowComments
    );
  }

  // methods are just functions
  myMethod(): boolean {
    return false;
  }
}
</script>

<style scoped lang="scss">
.AddEditArticle {
  margin: 2%;
}

.input {
  margin: 2%;
}

.title {
  width: 30%;
}

.description {
  width: 45%;
}
</style>
