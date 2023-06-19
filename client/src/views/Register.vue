<template>
 
  <body>
    <section class="RegisterPage">
      <div class="loginBox">
        <div class="loginContainer">
          <div class="loginForm">
            <h2>Get Started</h2>
            <form @submit.prevent action="" method="post">
              <div class="loginInputBox">
                <input
                  v-model="name"
                  type="text"
                  placeholder="Username"
                  name="txtFName"
                />
              </div>
              <div class="loginInputBox">
                <input
                  v-model="email"
                  type="text"
                  placeholder="Email"
                  name="txtEmail"
                />
              </div>
              <div class="loginInputBox">
                <input
                  v-model="reemail"
                  type="text"
                  placeholder="Verify Email"
                  name="txtConfirmationEmail"
                />
              </div>
              <div class="loginInputBox">
                <input
                  v-model="password"
                  type="password"
                  placeholder="Password"
                  name="txtPassword"
                />
              </div>
              <div class="message" v-if="!matching">Email must be the same</div>
              <div class="message">{{ message }}</div>
              <div class="loginInputBox">
                <input
                  @click="() => register()"
                  id="Registerbtn"
                  type="submit"
                  value="Register"
                  name="btnRegister"
                />
              </div>
            </form>
            <p class="forgotPswd">
              Already have an account ?
              <router-link to="/login-page">Login</router-link>
            </p>
            <p class="forgotPswd" style="margin-top: -2%">
              Need Help ?<router-link to="/help-page">Contact us</router-link>
            </p>
          </div>
        </div>
        <img
          src="../assets/Register.png"
          alt="Calendar people"
          class="register-img"
        />
      </div>
    </section>
  </body>
</template>

<script>
import axios from "axios";

export default {
  name: "RegisterPage",
  data() {
    return {
      name: "",
      email: "",
      reemail: "",
      password: "",
      matching: true,
      message: "",
    };
  },
  methods: {
    register() {
      this.matching = true;
      this.message = "";
      if (this.email === this.reemail) {
        const userData = {
          pseudo: this.name,
          email_user: this.email,
          mdp: this.password
        };

        axios
          .post("http://localhost:8080/api/auth/register", userData)
          .then((response) => {
            if (response.status === 200) {
              return response.data;
            } else {
              throw new Error(JSON.stringify(response.data));
            }
          })
          .then((parsed) => {localStorage.setItem('token',parsed.token)})
          .then(()=>{this.$router.push('/entry-form1-page');})
          .catch((error) => {
            let errorMessage;
            try {
              errorMessage = JSON.parse(error.message);
            } catch {
              errorMessage = {
                message: "An error occurred while processing your request.",
              };
            }
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
          });
      } else {
        this.matching = false;
      }
    },
  },
};
</script>

<style></style>
