<template>
<div class="Timer">
  <h3>Clock</h3>
  <div class="grid-radio">
    <b-form-group label="Choice timer mode">
      <b-form-radio v-model="selected" @change="clickRadioButton('stopwatch')" class="radio-stopwatch" name="some-radios" value="stopwatch">Stopwatch</b-form-radio>
      <b-form-radio v-model="selected" @change="clickRadioButton('timer')" class="radio-timer" name="some-radios" value="timer">Timer</b-form-radio>
      <b-form-radio v-model="selected" @change="clickRadioButton('pomodoro')" class="radio-pomodoro" name="some-radios" value="pomodoro">Pomodoro</b-form-radio>
    </b-form-group>
  </div>
  <p>{{ data.hours }} : {{ data.min }} : {{ data.sec }}</p>
  <div class="grid-btn">
    <b-button variant="danger" @click="clickBtnReset">Stop</b-button>
    <b-button variant="success" @click="clickBtnStart">{{
        data.nameBtnSuccess
      }}</b-button>
  </div>
  <div class="inputTime" v-if="selected != 'stopwatch' && data.nameBtnSuccess == 'Play'">
    <b-row>
      <b-col sm="2" class="pb-2">
        <h4 v-if="selected == 'pomodoro'">Enter work time</h4>
        <h4 v-if="selected == 'timer'">Edit timer</h4>
      </b-col>
      <b-col sm="1" class="pb-2">
        <b-form-input type="number" v-model="data.input.inputHours" placeholder="hh"></b-form-input>
      </b-col>
      <b-col sm="1" class="pb-2">
        <b-form-input type="number" v-model="data.input.inputMin" placeholder="mm"></b-form-input>
      </b-col>
      <b-col sm="1" class="pb-2">
        <b-form-input type="number" v-model="data.input.inputSec" placeholder="ss"></b-form-input>
      </b-col>
    </b-row>

    <div class="inputPomodoro" v-if="selected == 'pomodoro'">
      <b-row>
        <b-col sm="2" class="pb-2">
          <h4>Enter break pause</h4>
        </b-col>
        <b-col sm="1" class="pb-2">
          <b-form-input type="number" v-model="data.input.inputPomodoroHours" placeholder="hh"></b-form-input>
        </b-col>
        <b-col sm="1" class="pb-2">
          <b-form-input type="number" v-model="data.input.inputPomodoroMin" placeholder="mm"></b-form-input>
        </b-col>
        <b-col sm="1" class="pb-2">
          <b-form-input type="number" v-model="data.input.inputPomodoroSec" placeholder="ss"></b-form-input>
        </b-col>
      </b-row>
    </div>
    <b-row>
      <b-col sm="6">
        <b-button variant="secondary" @click="clickBtnEditTime">Valid time</b-button>
      </b-col>
    </b-row>
  </div>
</div>
</template>

<script>
import {
  reactive,
  ref,
  onMounted
} from "@vue/composition-api";

import Notif from "@/functions/notification";

/**
 * TODO export function chrono in other file
 */

export default {
  setup() {
    const selected = ref("timer");
    const data = reactive({
      counter: 0,
      hours: "00",
      min: "00",
      sec: "00",
      nameBtnDanger: "Reset",
      nameBtnSuccess: "Play",
      statInterval: null,
      isPlay: false,
      timer: 120,
      pomodoro: [1500, 120, true],
      input: {
        inputHours: 0,
        inputMin: 0,
        inputSec: 0,
        inputPomodoroHours: 0,
        inputPomodoroMin: 0,
        inputPomodoroSec: 0,
      },
    });

    function clearTimer() {
      data.isPlay = false;
      data.nameBtnSuccess = "Play";
      clearInterval(data.statInterval);
    }

    function calcFormat(value) {
      let hours = 0;
      let min = 0;
      let sec = 0;

      if (value < 0) {
        if (selected.value == "pomodoro") {
          value = data.pomodoro[2] ? data.pomodoro[0] : data.pomodoro[1];
          Notif.sendNotif("Pomodoro", "One part is end");
          data.pomodoro[2] = !data.pomodoro[2];
        } else {
          value = data.timer;
          data.counter = value;
          Notif.sendNotif("Timer", "Timer is end");
          clearTimer();
        }
      }
      data.counter = value;
      hours = Math.floor((value % (60 * 60 * 24)) / (60 * 60));
      min = Math.floor((value % (60 * 60)) / 60);
      sec = Math.floor(value % 60);
      data.hours = hours < 10 ? "0" + hours.toString() : hours.toString();
      data.min = min < 10 ? "0" + min.toString() : min.toString();
      data.sec = sec < 10 ? "0" + sec.toString() : sec.toString();
    }

    function clickRadioButton(name) {
      clearTimer();
      if (name == "stopwatch") {
        calcFormat(0);
      } else if (name == "timer") {
        calcFormat(data.timer);
      } else if (name == "pomodoro") {
        calcFormat(data.pomodoro[0]);
      }
    }

    /**
     * launch chrono and use calcFormat function to calculate format number
     * @param neg increment or decrement counter
     */
    function launchChrono(neg) {
      data.nameBtnSuccess = "Pause";
      data.isPlay = true;
      data.statInterval = setInterval(() => {
        calcFormat(neg ? data.counter - 1 : data.counter + 1);
      }, 1000);
    }

    function clickBtnStart() {
      if (data.isPlay) {
        clearTimer();
      } else {
        launchChrono(selected.value == "stopwatch" ? false : true);
      }
    }

    function clickBtnReset() {
      data.nameBtnSuccess = "Play";
      clearInterval(data.statInterval);
      data.counter = 0;
      // calcFormat();
      clickRadioButton(selected.value);
    }

    function clickBtnEditTime() {
      const first =
        (parseInt(data.input.inputHours, 10) || 0) * 60 * 60 +
        (parseInt(data.input.inputMin, 10) || 0) * 60 +
        (parseInt(data.input.inputSec, 10) || 0);

      if (selected.value == "pomodoro") {
        const second =
          (parseInt(data.input.inputPomodoroHours, 10) || 0) * 60 * 60 +
          (parseInt(data.input.inputPomodoroMin, 10) || 0) * 60 +
          (parseInt(data.input.inputPomodoroSec, 10) || 0);
        data.pomodoro = [first, second];
        clickRadioButton(selected.value);
      } else {
        data.timer = first;
        clickRadioButton(selected.value);
      }
    }

    onMounted(() => {
      clickRadioButton(selected.value);
    });

    return {
      data,
      selected,
      clearTimer,
      clickBtnStart,
      clickBtnReset,
      clickRadioButton,
      clickBtnEditTime,
    };
  },
};
</script>

<style scoped>
.grid-radio {
  display: grid;
  grid-template-columns: 3fr;
}

.radio-stopwatch {
  grid-row: 1;
}

.radio-timer {
  grid-row: 2;
}

.radio-pomodoro {
  grid-row: 3;
}
</style>
