<template>
	<div class="Dashboard">
		<h3>Dashboard</h3>
		<button @click="test">test</button>
	</div>
</template>

<script>
import { onMounted } from '@vue/composition-api';

import connect from '../functions/connection';

export default {
	name: 'Dashboard',
	setup() {
		onMounted(() => {
			connect.checkConnection();
		});

		function test() {
			window.localStorage.setItem('refresh_token', 'ddddd');
		}

		return {
			test,
		};
	},
};
</script>
