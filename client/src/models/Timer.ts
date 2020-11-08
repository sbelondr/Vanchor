/* eslint-disable */

export interface ITimer {
  id: string;
  mode: string;
  pomodoro: string;
  timer: number;
}

const url = "http://localhost:3000/timer/";

export function getTimer() {
  const axios = require("axios").default;
  let timer: ITimer = { id: "", mode: "", pomodoro: "", timer: 0 };

  return axios
    .get(url, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((res: any) => {
      timer = {
        id: res.data._id,
        mode: res.data.mode,
        pomodoro: res.data.pomodoro,
        timer: res.data.timer,
      };
      return timer
    });
//   return timer;
}

export function updateTimer(mode: string, pomodoro: string, timer: number) {
  const axios = require("axios").default;
  axios.post(url, {
    mode: mode,
    pomodoro: pomodoro,
    timer: timer,
  });
}
