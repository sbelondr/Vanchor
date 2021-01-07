/* eslint-disable */

export interface ITimer {
  id: string;
  mode: string;
  pomodoro: string;
  timer: number;
}

const url = "http://localhost:3000/api/timer/";

export async function getTimer() {
  const axios = require("axios").default;
  let timer: ITimer = { id: "", mode: "", pomodoro: "", timer: 0 };

  await axios
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
  return timer;
}

export async function updateTimer(id: string, mode: string, pomodoro: string, timer: number) {
  const axios = require("axios").default;
  await axios.post(url + 'update', {
    id: id,
    mode: 'stopwatch',
    pomodoro: pomodoro,
    timer: timer,
  }).then((value: any) => console.log(value.data.result));
}
