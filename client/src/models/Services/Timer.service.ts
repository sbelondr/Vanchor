/* eslint-disable */
import store from "@/store";
import { ITimer } from "../Timer";

const url = process.env.VUE_APP_MONGO_URI + '/api/timer/';
const axios = require("axios").default;
const config = {
	headers: {
		Authorization: `Bearer ${store.getters.getUser.getAccessToken()}`
	}
};

export async function addTimer() {
	const timer = { mode: "stopwatch", pomodoro: "600:300", timer: 120 };

	const result = await axios.post(url, {
		idUser: store.getters.getUser.getId(),
		mode: timer.mode,
		pomodoro: timer.pomodoro,
		timer: timer.timer
	}, config);
	return result;
}



export async function getTimer() {
	let timer: ITimer = { id: "", mode: "", pomodoro: "0:0", timer: 0 };

	await axios
		.get(url + store.getters.getUser.getId(), config)
		.then(// eslint-disable-next-line
			(res: any) => {
				timer = {
					id: res.data._id,
					mode: res.data.mode,
					pomodoro: res.data.pomodoro,
					timer: res.data.timer,
				};
				return timer
			}).catch(() => {
				console.log('am hehesbifsn');

			});
	if (timer.id != '') {
		return timer;
		// await 
	} else {
		console.log('ok');
		return null;
	}

}

export async function updateTimer(id: string, mode: string, pomodoro: string, timer: number) {
	await axios.post(url + 'update', {
		id: id,
		mode: 'stopwatch',
		pomodoro: pomodoro,
		timer: timer,
	}, config);
}
