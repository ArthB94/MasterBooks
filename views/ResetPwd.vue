<template>
  <body>
    <section class="ResetPage">
      <div class="resetBox">
        <div class="loginContainer">
          <div class="loginForm">
            <h2>New Password</h2>
            <p class="NewPswdPrompt">
              Please enter a <bold>personnalized password </bold>to ensure
              maximum protection.
            </p>
            <form
              @submit.prevent
              action=""
              method="post"
              style="display: flex; align-items: center; flex-direction: column"
            >
              <div class="loginInputBox" style="max-width: 350px">
                <input
                  v-model="oldpassword"
                  type="password"
                  placeholder="Old Password"
                  name="oldpassword"
                />
              </div>
              <div class="loginInputBox" style="max-width: 350px">
                <input
                  v-model="newpassword"
                  type="password"
                  placeholder="New Password"
                  name="newpassword"
                />
              </div>
              <div class="message" style="margin-top: 40px">{{ message }}</div>
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
      oldpassword: "",
      newpassword: "",
      message: "",
      token: "",
      email: "",
    };
  },
  mounted() {
    this.token = localStorage.getItem("token");
    if (this.token) {
      const route = `http://localhost:8080/api/auth/verif_token?token=${this.token}`;
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
    }
  },
  methods: {
    reset() {
      // const token = localStorage.getItem("token");
      const data = {
        email: this.email,
        oldpassword: this.oldpassword,
        newpassword: this.newpassword,
      };
      const jsonData = JSON.stringify(data);

      fetch("http://localhost:8080/api/auth/change_password", {
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
    },
  },
};
</script>

<style></style>
