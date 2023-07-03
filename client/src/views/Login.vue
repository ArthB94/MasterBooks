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
                  v-model="email_user"
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
              <p
                    class="CharacterLimitMessage"
                    style="color: red; text-align: center; font-weight: bold"
                  >{{ message }}</p>
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
      email_user: "",
      password: "",
      message: "",
      addressServer: localStorage.getItem("addressServer"),
    };
  },
  methods: {
    login() {
      this.message = "";
      const userData = {
        email_user: this.email_user,
        mdp: this.password,
      };
      axios
        .post(this.addressServer+"/api/auth/login", userData)
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem("userData", JSON.stringify(response.data));
            console.log("responseData",localStorage.getItem("userData"));
            return response.data;
          } else {
            throw new Error(JSON.stringify(response.data));
          }
        }).then((data) => {
          const token = data.token;
          localStorage.setItem("token", token);
        })
        .then(() => {
          axios
            .post(this.addressServer+"/api/auth/isAdmin", {email_user: this.email_user})
            .then((response_admin) => {
              if(response_admin.status === 200){
                let admin = response_admin.data.isAdmin;
                let userData = JSON.parse(localStorage.getItem("userData"))
                userData.admin = admin
                
                if(admin === true){
                  localStorage.setItem("isAdmin", true)
                  this.$router.push("/catalog-admin-page");
                }
                else{
                  localStorage.setItem("isAdmin", false)
                  this.$router.push("/catalog-page");
                }
                localStorage.setItem("userData", JSON.stringify(userData))
              }
              else{
                throw new Error(JSON.stringify(response_admin.data));
              }
            })
              
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
