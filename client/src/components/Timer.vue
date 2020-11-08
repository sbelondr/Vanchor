<template>
  <div class="Timer">
    <h3>Clock</h3>
    <div class="grid-radio">
      <b-form-group label="Choice timer mode">
        <b-form-radio
          v-model="selected"
          @change="clickRadioButton('stopwatch')"
          class="radio-stopwatch"
          name="some-radios"
          value="stopwatch"
          >Stopwatch</b-form-radio
        >
        <b-form-radio
          v-model="selected"
          @change="clickRadioButton('timer')"
          class="radio-timer"
          name="some-radios"
          value="timer"
          >Timer</b-form-radio
        >
        <b-form-radio
          v-model="selected"
          @change="clickRadioButton('pomodoro')"
          class="radio-pomodoro"
          name="some-radios"
          value="pomodoro"
          >Pomodoro</b-form-radio
        >
      </b-form-group>
    </div>
    <p>{{ data.hours }} : {{ data.min }} : {{ data.sec }}</p>
    <div class="grid-btn">
      <b-button variant="danger" @click="clickBtnReset">Stop</b-button>
      <b-button variant="success" @click="clickBtnStart">{{
        data.nameBtnSuccess
      }}</b-button>
    </div>
    <div
      class="input-settings"
      v-if="selected != 'stopwatch' && data.nameBtnSuccess == 'Play'"
    >
      <h4>Settings timer</h4>
      <div class="input-pomodoro" v-if="selected == 'pomodoro'">
        <h5>Work time</h5>
        <SettingTimer key="pomodoro-work" @update="timerUpdate" :lastValue="data.pomodoro[0].toString()" />
        <h5>Break time</h5>
        <SettingTimer key="pomodoro-break" @update="pomodoroUpdate" :lastValue="data.pomodoro[1].toString()" />
      </div>
      <div class="input-time" v-else>
        <SettingTimer key="timer" @update="timerUpdate" :lastValue="data.timer.toString()" />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from "@vue/composition-api";
import Notif from "@/functions/notification";

export default {
  components: {
    SettingTimer: () => import("@/components/SettingTimer"),
  },
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

    function timerUpdate(value) {
      if (selected.value == "pomodoro") {
        data.pomodoro[0] = value;
      } else {
        data.timer = value;
      }
      clickRadioButton(selected.value);
    }

    function pomodoroUpdate(value) {
      data.pomodoro[1] = value;
      clickRadioButton(selected.value);
    }

    onMounted(() => {
      Notif.getPermissionNotif();
      clickRadioButton(selected.value);
    });

    return {
      data,
      selected,
      clearTimer,
      clickBtnStart,
      clickBtnReset,
      clickRadioButton,
      timerUpdate,
      pomodoroUpdate,
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

.input-settings {
  margin-top: 5%;
}

.input-pomodoro h5 {
  margin-top: 2%;
}

</style>
