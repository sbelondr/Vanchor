<template>
  <div class="TemplateArticle">
    <div class="title">{{ article.title }}</div>
    <!-- <div class="title">{{ article.description }}</div> -->
    <div class="contenu">{{ article.contenu }}</div>
    <div class="date">{{ currentDateWithFormat }}</div>
    <div class="status">{{ article.status }}</div>
    <div class="comments">{{ article.allowComments ? "Yes" : "Nope" }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Article } from "@/models/Article";

@Component({
  name: "TemplateArticle",
  data: () => ({
    article: new Article("", "", "", "", new Date(), 0, false),
    currentDateWithFormat: "",
  }),
  created() {
    const articles = [
      new Article(
        "dd",
        "Coucou",
        "ceci est une description",
        "je suis un contenu",
        new Date(),
        0,
        true
      ),
    ];
    for (const a of articles) {
      
      if (a.id === this.$route.params.id) {
        console.log('tata');
        this.$data.article = a;
        this.$data.currentDateWithFormat = a.publishedOn.toLocaleDateString();
      }
    }
  },
})
export default class extends Vue {
}
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
