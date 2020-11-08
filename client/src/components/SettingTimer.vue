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
    <!-- <div>
      <b-row>
        <b-col sm="1" class="pb-2">
          <b-form-input
            type="number"
            v-model="timer[0]"
            @change="transformDataToSec"
            placeholder="hh"
          ></b-form-input>
        </b-col>
        <b-col sm="1" class="pb-2">
          <b-form-input
            type="number"
            v-model="timer[1]"
            @change="transformDataToSec"
            placeholder="mm"
          ></b-form-input>
        </b-col>
        <b-col sm="1" class="pb-2">
          <b-form-input
            type="number"
            v-model="timer[2]"
            @change="transformDataToSec"
            placeholder="ss"
          ></b-form-input>
        </b-col>
      </b-row>
    </div> -->
  </div>
</template>

<script>
import { ref, computed, onMounted } from "@vue/composition-api";

export default {
  name: "SettingTimer",
  props: {
    lastValue: String,
  },
  setup(props, { emit }) {
    const sendToParent = computed({
      get: () => "0",
      set: (value) => emit("update", value),
    });

    const timer = ref([
      Math.floor((parseInt(props.lastValue, 10) % (60 * 60 * 24)) / (60 * 60)),
      Math.floor((parseInt(props.lastValue, 10) % (60 * 60)) / 60),
      Math.floor(parseInt(props.lastValue, 10) % 60),
    ]);

    function transformDataToSec() {
      if (timer.value[0] < 0) {
        timer.value[0] = 0;
      }
      if (timer.value[1] < 0) {
        timer.value[1] = 0;
      }
      if (timer.value[2] < 0) {
        timer.value[2] = 0;
      }
      const sec =
        (parseInt(timer.value[0], 10) || 0) * 60 * 60 +
        (parseInt(timer.value[1], 10) || 0) * 60 +
        (parseInt(timer.value[2], 10) || 0);
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
