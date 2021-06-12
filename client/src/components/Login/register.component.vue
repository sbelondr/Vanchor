<template>
	<div class="register">
		<h3>Create account</h3>
		<div class="mainDiv">
			<div class="firstDiv">
				<b-form-input
					class="inputMail"
					v-model="mail"
					placeholder="Email"
				></b-form-input>
				<b-form-input
					class="inputLastName"
					v-model="lastname"
					placeholder="Lastname"
				></b-form-input>
				<b-form-input
					class="inputFirstName"
					v-model="firstname"
					placeholder="FirstName"
				></b-form-input>
				<b-form-input
					class="inputPassword"
					v-model="password"
					type="password"
					placeholder="Password"
				></b-form-input>
				<b-form-input
					class="inputPasswordCheck"
					v-model="passwordCheck"
					type="password"
					placeholder="Re Password"
				></b-form-input>
				<b-button class="submit" @click="registerUser">Create</b-button>
			</div>
		</div>
	</div>
</template>

<script>
import { ref } from '@vue/composition-api';
import { register } from '../../models/Services/User.service';

export default {
	name: 'register',
	setup() {
		const mail = ref('salut@ddd.fr');
		const lastname = ref('salut');
		const firstname = ref('qwer');
		const password = ref('qwerty');
		const passwordCheck = ref('qwerty');

		function registerUser() {
			register(mail.value, lastname.value, firstname.value, password.value);
		}

		return {
			mail,
			lastname,
			firstname,
			password,
			passwordCheck,
			registerUser
		};
	},
};
</script>

<style scoped>
.register {
	width: 100vw;
	height: 100vh;
	background-color: #444f5f;
}

.mainDiv {
	position: absolute;
	top: 25%;
	width: 100vw;
	display: flex;
	align-items: center;
	justify-content: center;
}

.firstDiv {
	display: table;
}

input {
	margin: 0;
	display: block;
	margin-bottom: 2%;
}

h3 {
	padding: 2%;
	color: salmon;
}

.submit {
	margin-top: 5%;
}
</style>
