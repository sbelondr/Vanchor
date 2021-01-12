const exports = {}

exports.getPermissionNotif = () => {
	Notification.requestPermission().then(function (result) {
		if (result !== 'granted') {
			console.warn(result);
		}
	});
}

exports.sendNotif = (title, msg) => {
	const img = '../assets/logo.png';
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const notification = new Notification(title, {
		body: msg,
		icon: img,
	});
}

export default exports;