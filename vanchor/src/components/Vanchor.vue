<template>
<div class="vanchor">
  <h2>Vanchor</h2>
  <div class="search">
    <b-input-group>
      <b-input-group-prepend is-text>
        <b-form-checkbox switch class="mr-n2">
          <span class="sr-only">Switch for filter mode</span>
        </b-form-checkbox>
      </b-input-group-prepend>
      <b-form-input placeholder="Search..." v-model="data.valueSearch" @keyup.enter="testMoi"></b-form-input>
      <b-input-group-append>
        <!-- <b-button variant="outline-secondary">Search</b-button> -->
        <b-input-group-text>
          <b-icon icon="question" />
        </b-input-group-text>
        <b-input-group-text>
          <b-icon icon="x" />
        </b-input-group-text>
      </b-input-group-append>
    </b-input-group>
  </div>
  <div class="articles" v-for="article in data.articles" :key="article.id">
    <TemplateReduceArticle :article="article" />
  </div>
</div>
</template>

<script>
// import TemplateReduceArticle from "@/components/cReduceArticle.vue";
import {
  Article
} from "../models/Article";

import {
  reactive,
  onMounted
} from "@vue/composition-api";

export default {
  components: {
    TemplateReduceArticle: () =>
      import("@/components/TemplateReduceArticle.vue"),
  },
  setup() {
    const data = reactive({
      articles: [],
      valueSearch: "",
    });

    onMounted(() => {
      const dateNow = new Date();
      data.articles = [
        new Article(
          "dd",
          "Coucou",
          "ceci est une description",
          "je suis un contenu",
          dateNow,
          0,
          true
        ),
        new Article(
          "dd2",
          "Code c: bubble sort",
          "ceci est une description",
          "je suis un contenu",
          dateNow,
          0,
          true
        ),
      ];
      // console.log(data.articles);
    });

    return {
      data,
    };
  },
  methods: {
    testMoi() {
      console.log("je suis la dedans");
      console.log(this.data.valueSearch);
    },
  },
};

// export default {
//   name: "Vanchor",
//   components: {
//     TemplateReduceArticle: () => import("@/components/cReduceArticle.vue"),
//   },
//   data() {
//     return {
//       articles: [] as Article[],
//       valueSearch: "",
//     };
//   },
//   mounted() {
//     const dateNow = new Date();
//     this.data().articles = [
//       new Article(
//         "dd",
//         "Coucou",
//         "ceci est une description",
//         "je suis un contenu",
//         dateNow,
//         0,
//         true
//       ),
//       new Article(
//         "dd2",
//         "Code c: bubble sort",
//         "ceci est une description",
//         "je suis un contenu",
//         dateNow,
//         0,
//         true
//       ),
//     ];
//     console.log(this.articles);
//   },
//   methods: {
//     testMoi() {
//       console.log("je suis la dedans");
//       console.log(this.valueSearch);
//     },
//   },
// };
</script>

<style lang="scss" scoped>
.vanchor {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgb(226, 226, 226);
  // background-color: #444f5f;
}

h2 {
  padding-top: 2%;
}

.search {
  margin-top: 3%;
  margin-bottom: 5%;
  margin-left: 20%;
  margin-right: 20%;
}
</style>
