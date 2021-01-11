<template>
  <div class="Login">
    <div class="firstDiv">
      <div class="otherDiv">
        <b-form-input class="inputUser" v-model="user" placeholder="Login"></b-form-input>
      </div>
      <div class="otherDiv">
        <b-form-input
          class="inputPassword"
          v-model="password"
          type="password"
          placeholder="Password"
          @keyup.enter="connect"
        ></b-form-input>
        <b-button class="submit" @click="connect">Connection</b-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import router from '@/router';
import { Component, Vue } from 'vue-property-decorator';
import { login } from '../../models/Services/User.service';

@Component({
	name: 'Login',
	data: () => ({
		user: '',
		password: '',
	}),
	// created() {},
	methods: {
		async connect() {
			const user = await login(this.$data.user, this.$data.password);
			if (user) {
				router.push('/');
			}
		}
	},
})
export default class extends Vue {}
</script>

<style scoped>
.Login {
  position: absolute;
  top: -25%;
  width: 100vw;
  height: 125vh;
  background-color: #444f5f;
  /* display: table;
  text-align: center; */
  display: flex;
  align-items: center;
  justify-content: center;
}

.firstDiv {
  display: table;
}

.otherDiv {
  margin: 3%;
  display: block;
}

input {
  margin: 0;
  margin-left: 2%;
  /* margin-right: -50%; */
  /* transform: translate(0%, 50%); */
}

.inputUser {
  width: 12vw;
}

.inputPassword {
  width: 12vw;
}
</style>
