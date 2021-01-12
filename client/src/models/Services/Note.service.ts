/* eslint-disable */

import store from "@/store";

import { INote } from '../Note';

const axios = require("axios").default;
const url = process.env.VUE_APP_MONGO_URI + '/api/note/';
const config = {
	headers: {
		Authorization: `Bearer ${store.getters.getUser.getAccessToken()}`
	}
};

export async function addNote(title: string, content: string) {
	const result = await axios.post(url, {
		idUser: store.getters.getUser.getId(),
		title: title,
		content: content,
	}, config);
	return result;
};

export async function editNote(id: string, title: string, content: string) {
	await axios.post(url + 'update', {
		id: id,
		title: title,
		content: content,
	}, config).then((res: Response) => {
		return res;
	});
	return null;
};

export function deleteNote(id: string) {
	axios.delete(url + id, config);
};

export function getNote() {
	const allNotes: INote[] = [];

	axios
		.get(url + store.getters.getUser.getId(), config)
		.then((res: any) => {
			for (const note of res.data) {
				allNotes.push({
					id: note._id,
					title: note.title,
					content: note.content,
			});
			}
	});
	return allNotes;
};
