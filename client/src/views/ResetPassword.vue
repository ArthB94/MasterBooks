<template>
  <body>
    <section class="ResetPage">
      <div class="resetBox">
        <div class="loginContainer">
          <div class="loginForm">
            <h2>New Password</h2>
            <p class="NewPswdPrompt" v-if="goodToken">
              Please enter a <bold>personnalized password </bold>to ensure
              maximum protection.
            </p>
            <p
              style="color: red; text-align: center; font-weight: bold"
              v-if="!goodToken"
            >
              The token you used is expired, please request another email.
            </p>
            <form
              @submit.prevent
              action=""
              method="post"
              style="display: flex; align-items: center; flex-direction: column"
              v-if="goodToken"
            >
              <div class="loginInputBox" style="max-width: 350px">
                <input
                  v-model="newpassword"
                  type="password"
                  placeholder="New Password"
                  name="oldpassword"
                />
              </div>
              <div class="loginInputBox" style="max-width: 350px">
                <input
                  v-model="renewpassword"
                  type="password"
                  placeholder="Confirmation of new Password"
                  name="newpassword"
                />
              </div>
              <p style="margin-top: 40px; text-align: center; font-weight: bold">{{ message }}</p>
              <div class="loginInputBox" style="margin-left: 270px">
                <input
                  @click="() => reset()"
                  id="NewPwdbtn"
                  type="submit"
                  value="Edit"
                  name="btnChange"
                />
              </div>
            </form>
            <p class="forgotPswd">
              Need Help ?<router-link to="/help-page">Contact us</router-link>
            </p>
            <p class="forgotPswd" v-if="!goodToken">
              Forgot your password ?
              <router-link to="/fgpassword-page">Reset it</router-link>
            </p>
          </div>
        </div>
      </div>
    </section>
  </body>
</template>

<script>
export default {
  name: "ResetPwdPage",
  data() {
    return {
      token: "",
      newpassword: "",
      renewpassword: "",
      matching: true,
      goodToken: true,
      email: "",
      message: "",
      addressServer: localStorage.getItem('addressServer')
    };
  },
  mounted() {
    this.token = localStorage.getItem("token");
    if (!this.token) {
      this.goodToken = false;
    }
    const route = this.addressServer+`/api/auth/verif_token?token=${this.token}`;
    fetch(route, {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to extract email from token");
        }
      })
      .then((data) => {
        this.email = data.email;
      })
      .catch((error) => {
        this.message = error.message;
      });
  },
  methods: {
    reset() {
      if (this.newpassword === this.renewpassword) {
        const data = {
          email: this.email,
          mdp: this.newpassword,
        };
        const jsonData = JSON.stringify(data);

        fetch(this.addressServer+"/api/auth/reset_password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: jsonData,
        })
          .then((response) => {
            if (response.ok) {
              this.message = "Password Changed Successfully";
              setTimeout(() => {
                this.$router.push("/login-page");
              }, 1000);
            } else {
              return response.json().then((error) => {
                throw new Error(JSON.stringify(error));
              });
            }
          })
          .catch((error) => {
            let errorMessage;
            try {
              errorMessage = JSON.parse(error.message);
            } catch {
              errorMessage = {
                message: "An error occurred while processing your request.",
              };
              this.message = errorMessage.message;
            }
            if (errorMessage.status === false) {
              this.message = errorMessage.message;
            } else {
              this.message = errorMessage.errors;
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
