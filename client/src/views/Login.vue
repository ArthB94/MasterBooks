<template>
    <body>
      <div class="LoginPage">

        <div class="loginBox">
          <div class="loginContainer">
            <div class="loginForm">
              <h2>Welcome back</h2>
              <form @submit.prevent action="" method="post">
                <div class="loginInputBox">
                  <input
                    v-model="email"
                    type="text"
                    name="txtEmail"
                    placeholder="Email"
                  />
                </div>
                <div class="loginInputBox">
                  <input
                    v-model="password"
                    type="password"
                    placeholder="Password"
                  />
                </div>
                <div class="message" style="color: red">{{ message }}</div>
                <div class="loginInputBox">
                  <input @click="() => login()" type="submit" value="Login" />
                </div>
              </form>
              <p class="forgotPswd">
                Forgot your password ?
                <router-link to="/fgpassword-page">Reset it</router-link>
              </p>
              <p class="forgotPswd" style="margin-top: -2%">
                New here ? <router-link to="/register-page">Sign up</router-link>
              </p>
              <p class="forgotPswd" style="margin-top: -2%">
                Need Help ?<router-link to="/help-page">Contact us</router-link>
              </p>
            </div>
          </div>
          <img
            src="../assets/Login.png"
            alt="Calendar people"
            class="login-img"
          />
        </div>
      </div>
    </body>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "LoginPage",
    data() {
      return {
        email: "",
        password: "",
        message: "",
      };
    },
    methods: {
      login() {
        this.message = "";
        const userData = {
          email_user: this.email,
          mdp: this.password,
        };
        axios
          .post("http://localhost:8080/api/auth/login", userData)
          .then((response) => {
            if (response.status === 200) {
              return response.data;
            } else {
              throw new Error(JSON.stringify(response.data));
            }
          })
          .then((parsed) => {
            localStorage.setItem("token", parsed.token);
          })
          .then(() => {
            this.$router.push("/calendar-page");
          })
          .catch((error) => {
            let errorMessage;
            try {
              errorMessage = JSON.parse(error.message);
            } catch {
              errorMessage = {
                message: "An error occurred while processing your request.",
              };
            }
            if (
              errorMessage.message === "Email not registered" ||
              errorMessage.message === "Wrong password"
            ) {
              this.message = errorMessage.message;
            } else {
              const keys = Object.keys(errorMessage);
              if (keys.length > 0) {
                const firstKey = keys[0];
                if (Array.isArray(errorMessage[firstKey])) {
                  this.message = errorMessage[firstKey][0];
                } else {
                  this.message = errorMessage[firstKey];
                }
              } else {
                this.message = errorMessage;
              }
            }
          });
      },
    },
  };
  </script>
  
  <style></style>