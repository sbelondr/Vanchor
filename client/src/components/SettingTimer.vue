<template>
<div class="setting-timer">
	<b-form-input
		type="number"
		v-model="timer[0]"
		@change="transformDataToSec"
		placeholder="hh"
	></b-form-input>
	<b-form-input
		type="number"
		v-model="timer[1]"
		@change="transformDataToSec"
		placeholder="mm"
	></b-form-input>
	<b-form-input
		type="number"
		v-model="timer[2]"
		@change="transformDataToSec"
		placeholder="ss"
	></b-form-input>
</div>
</template>

<script>
import { ref, computed, onMounted } from '@vue/composition-api';

export default {
	name: 'SettingTimer',
	props: {
		lastValue: String,
	},
	setup(props, { emit }) {
		const sendToParent = computed({
			get: () => '0',
			set: (value) => emit('update', value),
		});

		const minutes = 60;
		const secs = 60;
		const hours = 24;
		const nullValue = 0;
		const timer = ref([
			Math.floor((parseInt(props.lastValue, 10) % (minutes * secs * hours)) / (minutes * secs)),
			Math.floor((parseInt(props.lastValue, 10) % (minutes * secs)) / minutes),
			Math.floor(parseInt(props.lastValue, 10) % secs),
		]);

		function transformDataToSec() {
			if (timer.value[0] < nullValue) {
				timer.value[0] = 0;
			}
			if (timer.value[1] < nullValue) {
				timer.value[1] = 0;
			}
			if (timer.value[2] < 0) {
				timer.value[2] = 0;
			}
			const sec =
		(parseInt(timer.value[0], 10) || nullValue) * minutes * secs +
		(parseInt(timer.value[1], 10) || nullValue) * minutes +
		(parseInt(timer.value[2], 10) || nullValue);
			sendToParent.value = sec.toString();
		}

		onMounted(() => {
			transformDataToSec();
		});

		return {
			timer,
			transformDataToSec,
		};
	},
};
</script>

<style scoped>
.setting-timer {
  width: 100%;
  display: ruby;
}

.setting-timer input {
  width: 5vw;
}
</style>
