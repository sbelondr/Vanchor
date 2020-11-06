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
          @keyup.enter="checkLogin"
        ></b-form-input>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

// inline-table
@Component({
  name: "Login",
  data: () => ({
    user: "",
    password: "",
  }),
  // created() {},
  methods: {
    checkLogin() {
      console.log("hey");
      console.log(this.$data.user);
      console.log(this.$data.password);
    },
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
