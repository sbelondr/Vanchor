<template>
<div class="vanchor">
  <h2>Vanchor</h2>
  <p>Wait rework</p>
  <!-- <div class="search">
    <b-input-group>
      <b-input-group-prepend is-text>
        <b-form-checkbox switch class="mr-n2">
          <span class="sr-only">Switch for filter mode</span>
        </b-form-checkbox>
      </b-input-group-prepend>
      <b-form-input placeholder="Search..." v-model="data.valueSearch" @keyup.enter="testMoi"></b-form-input>
      <b-input-group-append>
        // <b-button variant="outline-secondary">Search</b-button> 
        <b-input-group-text>
          <b-icon icon="question" />
        </b-input-group-text>
        <b-input-group-text>
          <b-icon icon="x" />
        </b-input-group-text>
      </b-input-group-append>
    </b-input-group>
  </div> -->
</div>
</template>

<script>
import {
  reactive,
  onMounted
} from "@vue/composition-api";

import { Article } from '@/models/Article';

export default {
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
      console.log(this.data.valueSearch);
    },
  },
};

</script>

<style lang="scss" scoped>

</style>
