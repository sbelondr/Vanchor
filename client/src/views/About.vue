<template>
  <div class="about">
    <h1>This is an about page</h1>
		<AddEditArticle :article="articles[0]" :modeEdit="true" />
  </div>
</template>

<script lang="ts">
// import { Component, Prop, Vue } from 'vue-property-decorator';
import { Article } from '@/models/Article';
import AddEditArticle from '@/components/Admin/addEditArticle.vue';

export default {
	name: 'About',
	components: {
		AddEditArticle,
	},
	data:() => ({
		articles: [new Article('dd', 'Coucou', 'ceci est une description', 'je suis un contenu', new Date(), 0, true)]
	})
}
</script>