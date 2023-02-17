<template>
  <div class="row mt-5">
    <div class="col-12 text-center mb-4">
      <h1>Log In</h1>
    </div>
    <div class="col-sm-5 m-auto">
      <div v-if="errorMessage !== ''" class="alert alert-danger" role="alert">
        {{ errorMessage }}
      </div>
      <form @submit.prevent="login()" id="login-form">
        <div class="row text-left">
          <div class="col-sm-12 form-group mt-2">
            <label for="email">Email Address</label>
            <input type="email" v-model="email" id="email" class="form-control form-control-lg">
          </div>
          <div class="col-sm-12 form-group mt-5">
            <label for="password">Password</label>
            <input type="password" v-model="password" id="password" class="form-control form-control-lg">
          </div>
          <br/>
          <div class="col-sm-12 text-center form-group mt-5">
            <button v-bind:disabled="Request" v-bind:class="{disabled: Request}"
                    class="btn btn-lg btn-primary px-4">
              <span v-if="! Request">Login</span>
              <span v-if="Request">Please Wait...</span>
            </button>
            <div v-if="Request" class="spinner-border text-secondary loader" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import db from '../firebase/config.js'

export default {
  name: 'LogIn-Firebase',
  data() {
    return {
      email: "",
      password: "",
      Request: false,
      errorMessage: "",
      successMessage: "",
      user: {
        username: "",
        role: "",
      },

    }
  },
  methods: {
    login() {
      this.Request = true;
      this.errorMessage = "";
      this.successMessage = "";

      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
          (cred) => {
            db.collection("Users").doc(cred.user.uid).get().then((doc) => {

              this.user.username = doc.data().Username;
              this.user.role = doc.data().Role;

              console.log("NEW LOGIN \n" + this.user.username + "\n" + this.user.role);

              window.localStorage.setItem('username', this.user.username);
              window.localStorage.setItem('role', this.user.role);

              this.Request = false;
              this.$router.go(0);
            })
          },
          (error) => {
            this.errorMessage = error.message;
            this.Request = false;
          }
      ).then(
          this.$router.replace("/")
      )
    },
  }
}
</script>

<style>
.loader {
  position: relative;
  top: 6px;
  left: 10px;
}
</style>
