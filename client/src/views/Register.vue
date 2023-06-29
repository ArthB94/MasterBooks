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
              <p
                  class="CharacterLimitMessage"
                  style="color: red; text-align: center; font-weight: bold"
                  v-if="!matching"
                >Emails must be the same.</p>
              <p
                  class="CharacterLimitMessage"
                  style="color: red; text-align: center; font-weight: bold"
                >{{ message }}</p>
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
        fetch("http://129.151.226.75:8080/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pseudo: this.name,
            email_user: this.email,
            mdp: this.password,
          }),
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              return response.json().then((error) => {
                throw new Error(JSON.stringify(error));
              });
            }
          })
          .then(() => {
            this.$router.push("/login-page");
          })
          .catch((error) => {
            console.error(error);
            let errorMessage;
            try {
              errorMessage = JSON.parse(error.message);
            } catch {
              errorMessage = {
                message: "An error occurred while processing your request.",
              };
            }

            if (errorMessage.error) {
              const keys = Object.keys(errorMessage.error);
              if (keys.length > 0) {
                this.message = errorMessage.error[keys[0]][0];
              } else {
                this.message = errorMessage.error;
              }
            } else {
              this.message = errorMessage.message;
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
