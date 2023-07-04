<template>
  <body>
    <div class="Profile-page-container">
      <header>
        <div class="headernav">
          <div class="header-container">
            <div class="header-image">
              <img alt="Vue logo" style="opacity: 0.7;" src="../assets/LogoDayClean1.png" class="logo-nav-clean" />
            </div>
          </div>
          <div class="Navbar">
            <router-link to="/catalog-page" class="to-page-nav">Book catalog</router-link>
            <router-link to="/catalog-library-page" class="to-page-nav">My Library</router-link>
            <router-link to="/catalog-pag" class="to-page-nav">Recommendations</router-link>
          </div>
          <UserMenu></UserMenu>
          <div class="light">
            <DarkLightMode></DarkLightMode>
          </div>
        </div>
      </header>
      <a id="top"></a>

      <div class="edit-profile-container">
        <div class="formContainer">
          <div class="loginContainer">
            <div class="loginForm">
              <form @submit.prevent action="" method="post">
                <h2 class="List-Title">Edit Profile</h2>
                <div class="loginInputBox">
                  <input v-model="txtFName" type="text" name="txtFName" :placeholder="placeholderFName"><br>
                </div>
                <div class="loginInputBox">
                  <input v-model="txtEmail" type="email" name="txtEmail" :placeholder="placeholderEmail"><br>
                </div>
                <!-- <div class="error-message-profile">{{ message }}</div> -->
                <div class="loginInputBox" style="margin-left: -60px;">
                  <input @click="updateInformation" type="submit" value="Update Information" name="btnUpdate">
                </div>
              </form>
              <p class="forgotPswd">Change password ?<router-link to="/reset-pwd-page">Reset</router-link>
              </p>
            </div>
          </div>

        </div>
        <div class="Navbar" style="margin-top: 50px;" v-show="isAdmin">
          <router-link to="/add-book-page" class="to-page-nav">Add Book</router-link>
          <router-link to="/catalog-admin-page" class="to-page-nav">Delete Book</router-link>
        </div>
      </div>
      <a id="TopBtn" href="#top" class="fa fa-angle-double-up hide" style="font-size: 24px"></a>
      <footer>
        <div class="content-footer">
          <div class="top">
            <div class="logo-details">
              <img alt="Vue logo" style="opacity: 0.7;" src="../assets/LogoDayClean1.png" class="logo-nav-clean" />
              <p class="logo-name">
                BOOK MASTER <br />
                <small>est. 2023</small>
              </p>
            </div>
            <div class="media-icons">
              <a href="https://www.linkedin.com/in/lou-brunesseaux-a843aa248"><font-awesome-icon
                  icon="fa-brands fa-linkedin-in" /></a>
              <a href="mailto:loubruness@gmail.com"><font-awesome-icon icon="fa-brands fa-google" /></a>
              <a href="https://github.com/loubruness"><font-awesome-icon icon="fa-brands fa-github" /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </body>
</template>

<script>
import UserMenu from "../components/UserMenu.vue";
import DarkLightMode from "../components/DarkLightMode.vue";
export default {
  name: 'ProfilePage',
  data() {
    return {
      txtFName: '',
      txtEmail: '',
      message: '',
      placeholderFName: 'First name',
      placeholderEmail: 'Email Address',
      name: "",
      email: "",
      summary: "",
      details: "",
      link: "",
      sent: false,
      error: false,
      selectedFile: null,
      labelText: "No file selected",
      isAdmin: false,
      userData: null,
      addressServer: localStorage.getItem('addressServer')
    };

  },
  components: {
    DarkLightMode,
    UserMenu
  },
  methods: {
    updateInformation() {
      fetch(this.addressServer + "/api/auth/updateProfile", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email_user_old: this.userData.email_user, email_user: this.txtEmail, pseudo: this.txtFName })
      })
        .then(response => {
          if (response.ok) {
            this.message = 'Information updated';
          } else {
            throw new Error('Error updating information');
          }

          return response.json();
        })
        .then(data => {
          console.log('Response:', data);

          // Mise à jour de la variable locale (dans le navigateur) userData

          const newUserData = {
            token: this.userData.token,
            email_user: (data.userData.email_user != "") ? data.userData.email_user : this.txtEmail,
            pseudo: (data.userData.pseudo != undefined) ? data.userData.pseudo : this.txtFName
          };

          console.log(newUserData);

          localStorage.setItem("userData", JSON.stringify(newUserData));
        })
        .catch(error => {
          console.log('Error:', error);
        });
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
        this.labelText = file.name;
      } else {
        this.selectedFile = null;
        this.labelText = "No file selected";
      }
    }
  },
  mounted() {
    // Récupérer les informations de l'utilisateur
    var userData = JSON.parse(localStorage.getItem("userData"));
    if (userData === null) {
      // L'utilisateur n'est pas connecté, on le redirige vers la page de connexion
      this.$router.push("/login-page");
      return;
    }

    // L'utilisateur est connecté, on a ses infos.
    this.userData = userData;

    // Remplir les champs avec les données
    this.txtFName = userData.pseudo;
    this.txtEmail = userData.email_user;
    this.placeholderFName = userData.pseudo;
    this.placeholderEmail = userData.email_user;

    // Vérifier si l'utilisateur est admin
    if (localStorage.getItem("isAdmin") == "true") {
      this.isAdmin = true
    }
  },
};
</script>


<style></style>