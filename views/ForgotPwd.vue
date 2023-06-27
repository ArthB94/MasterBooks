<template>
  <body>
    <section class="LoginPage">
      <div class="loginBox">
        <img
          src="../assets/Forgot.webp"
          alt="Calendar people"
          class="login-img"
        />
        <div class="loginContainer">
          <div class="loginForm">
            <h2>Reset your Password</h2>
            <p class="forgotPswdPrompt">
              Please enter your <bold>Email Address</bold> to receive the
              password-reset link
            </p>
            <form @submit.prevent action="" method="post">
              <div class="loginInputBox">
                <input
                  v-model="email"
                  type="text"
                  placeholder="Email Address"
                  name="email"
                />
              </div>
              <p style="margin-top: 40px; text-align: center; font-weight: bold">{{ message }}</p>
              <div class="loginInputBox">
                <input
                  @click="() => send()"
                  type="submit"
                  value="Send"
                  name="submit"
                  style="margin-left: 40%"
                />
              </div>
            </form>

            <p class="forgotPswd">
              Remembered password ?<router-link to="/login-page"
                >Login</router-link
              >
            </p>
            <p class="forgotPswd" style="margin-top: -2%">
              Don't have an account ?<router-link to="/register-page"
                >Register</router-link
              >
            </p>
            <p class="forgotPswd" style="margin-top: -2%">
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
  name: "ForgotPwdPage",
  data() {
    return {
      email: "",
      message: "",
    };
  },
  methods: {
    send() {
      fetch("http://localhost:8080/api/auth/forgot_password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: this.email }),
      })
        .then((response) => {
          if (response.ok) {
            this.message = "Email Sent Successfully";
            return response.json();
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
          }
          if (errorMessage.status === false) {
            console.log(errorMessage.message);
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
