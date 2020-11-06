<template>
<div class="classArticleReduce">
  <router-link :to="data.routeLink">
    <div class="TemplateReduceArticle">
      <div class="title">{{ props.article.title }}</div>
      <div class="description">{{ props.article.description }}</div>
    </div>
  </router-link>
</div>
</template>

<script>
// import {
//   Prop
// } from "vue-property-decorator";

import {
  Article
} from "@/models/Article";

import {
  reactive
} from "@vue/composition-api";

export default {
  name: "TemplateReduceArticle",
  props: {
    article: {
      type: Article,
      required: true,
    },
  },
  // props: ["article"],
  setup(props) {
    const data = reactive({
      routeLink: "/article/" + props.article.id,
    });

    return {
      data,
      props,
    };
  },
};

// @Component({
//   name: "TemplateReduceArticle",
//   data() {
//     return {
//       routeLink: "",
//     };
//   },
//   created() {
//     this.$data.routeLink = "/article/" + this.$props.article.id;
//   },
// })
// // export default {
// export default class extends Vue {
//   @Prop() private article!: Article;
// }
//
</script>

// 

<style lang="scss" scoped>
// .classArticleReduce {
//   background-color: #3b4957;
//   border-radius: 25px 10px 25px 10px;
//   text-align: left;
//   margin: 1%;
//   padding-left: 1%;
//   padding-right: 1%;
//   padding-bottom: 2%;
//   padding-top: 2%;
// }

// .classArticleReduce a {
//   text-decoration: none;
//   color: white;
// }

// .TemplateReduceArticle {
//   display: flex;
//   flex-direction: row;
//   flex-wrap: nowrap;
//   align-items: flex-start;
//   align-content: stretch;
//   text-decoration: none;
// }

// .title {
//   width: 35%;
//   font-weight: bold;
// }
//
</style>
