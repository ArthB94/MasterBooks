<template>
  <body>
    <a id="top"></a>
    <div class="FormPage2" style="overflow-y: hidden">
      <div class="headernav">
        <div class="header-image">
          <img
            alt="Vue logo"
            style="opacity: 0.7"
            src="../assets/logo_book.png"
            class="VueLogo"
          />
        </div>
        <div class="Navbar">
          <router-link to="/catalog-page" class="to-page-nav"
            >Book catalog</router-link
          >
          <router-link to="/catalog-library-page" class="to-page-nav"
            >My Library</router-link
          >
          <router-link to="/catalog-pag" class="to-page-nav"
            >Recommendations</router-link
          >
        </div>
        <UserMenu></UserMenu>
      </div>
      <div class="FormBox">
        <div class="FormContainer">
          <div class="Form-banner-container">
            <div class="loginForm">
              <h2>Add a book</h2>
              <p class="Form-presentation" style="text-align: center">
                <br />
                Please fill in
                <i class="fa fa-bold" aria-hidden="true">all</i> the necessary
                information <br /><br />
                The mandatory fields are marked by a * <br /><br />
              </p>
              <form action="#" method="post" @submit.prevent="handleSend">
                <div class="Form-question">
                  <p
                    class="CharacterLimitMessage"
                    style="color: red"
                    v-if="bookAlreadyExists"
                  >
                    Book already stored in the database.
                  </p>
                  <label for="file-upload"
                    ><p class="Form-question">
                      <i class="fa fa-bold" aria-hidden="true"
                        >Book's epub file*</i
                      >
                    </p></label
                  >
                  <div class="AddBookInput">
                    <button
                      class="Create-planning-Btn"
                      style="margin-right: 15px; margin-bottom: 8px"
                      @click="$refs.epubfileupload.click()"
                    >
                      Click here
                    </button>
                    <input
                      type="file"
                      id="epubfile-upload"
                      ref="epubfileupload"
                      name="file-upload"
                      class="loginInputBox"
                      placeholder="Upload a screenshot of the issue."
                      @change="handleEpubFileChange"
                      style="display: none"
                    />
                    {{ labelTextEpub }}
                  </div>
                </div>
                <p class="Form-question">
                  <i class="fa fa-bold" aria-hidden="true">Book's title*</i>
                </p>
                <div class="loginInputBox">
                  <input
                    v-model="titre"
                    type="text"
                    name="txtEmail"
                    placeholder="Title"
                  />
                </div>

                <p class="Form-question">
                  <i class="fa fa-bold" aria-hidden="true">Book's author*</i>
                </p>
                <div class="loginInputBox">
                  <input
                    v-model="auteur"
                    type="text"
                    name="txtEmail"
                    placeholder="Author"
                  />
                </div>

                <div class="Form-question">
                  <label for="file-upload"
                    ><p class="Form-question">
                      <i class="fa fa-bold" aria-hidden="true"
                        >Book's cover picture*</i
                      >
                    </p></label
                  >
                  <div class="AddBookInput">
                    <button
                      class="Create-planning-Btn"
                      style="margin-right: 15px; margin-bottom: 8px"
                      @click="$refs.coverfileupload.click()"
                    >
                      Click here
                    </button>
                    <input
                      type="file"
                      id="coverfile-upload"
                      ref="coverfileupload"
                      name="file-upload"
                      class="loginInputBox"
                      placeholder="Upload a screenshot of the issue."
                      @change="handleFileChange"
                      style="display: none"
                    />
                    {{ labelTextCover }}
                  </div>
                </div>
                <p class="Form-question">
                  <i class="fa fa-bold" aria-hidden="true">Number of pages*</i>
                </p>
                <div class="loginInputBox">
                  <input
                    v-model="pages"
                    type="text"
                    name="txtEmail"
                    placeholder="Number of pages"
                  />
                </div>
                <p class="Form-question">
                  <i class="fa fa-bold" aria-hidden="true">Publication year*</i>
                </p>
                <div class="loginInputBox">
                  <input
                    v-model="date_parution"
                    type="text"
                    name="txtEmail"
                    placeholder="Year in 4 digits"
                  />
                </div>
                <p class="Form-question">
                  <i class="fa fa-bold" aria-hidden="true">Book's genre(s)*</i>
                </p>
                <div
                  class="loginInputBox"
                  v-for="i in nbGenre"
                  :key="i"
                  style="
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                  "
                >
                  <div class="custom-select1" style="width: 90%">
                    <select
                      v-model="selectedGenres[i]"
                    >
                      <option
                        v-for="genre in genres"
                        :key="genre.genre"
                        :value="genre.genre_id"
                      >
                        {{ genre.genre }}
                      </option>
                    </select>
                  </div>
                  <font-awesome-icon
                    @click="
                      nbGenre += 1;
                      console.log(selectedGenres);
                    "
                    id="TaskPlus"
                    icon="fa-solid fa-plus"
                    size="sm"
                  />
                </div>
                <p class="Form-question">
                  <i class="fa fa-bold" aria-hidden="true">Book's language*</i>
                </p>
                <div class="loginInputBox">
                  <div class="custom-select1">
                    <select v-model="langue">
                      <option value="">Select Language</option>
                      <option value="English">English</option>
                      <option value="French">French</option>
                      <option value="Spanish">Spanish</option>
                      <option value="German">German</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                </div>
                <p class="Form-question">
                  <i class="fa fa-bold" aria-hidden="true">Book's summary*</i>
                </p>
                <div class="loginInputBox">
                  <p
                    class="CharacterLimitMessage"
                    style="color: red"
                    v-if="resumeExceedsLimit"
                  >
                    Summary should not exceed 1000 characters.
                  </p>
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    class="add-book-input"
                    placeholder="Enter a short summary."
                    v-model="resume"
                    @input="handleResumeInput"
                  ></textarea
                  ><br />
                </div>
                <br /><br />
                <div class="loginInputBox FormInputBox">
                  <p
                    class="CharacterLimitMessage"
                    style="color: red; text-align: center; font-weight: bold"
                    v-if="bookAlreadyExists"
                  >
                    Book already stored in the database.
                  </p>
                  <p
                    class="CharacterLimitMessage"
                    style="color: red; text-align: center; font-weight: bold"
                    v-if="notComplete"
                  >
                    Please fill all the fields with a * !
                  </p>
                  <p
                    class="CharacterLimitMessage"
                    style="text-align: center; font-weight: bold"
                    v-if="sent"
                  >
                    Book successfully added !
                  </p>

                  <input
                    type="submit"
                    value="Submit Information"
                    name="btnUpdate"
                  />
                </div>
                <p class="forgotPswd MoveOn">
                  Done here ?
                  <router-link to="/fgpassword-page">Go back</router-link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <a
      id="TopBtn"
      href="#top"
      class="fa fa-angle-double-up hide"
      style="font-size: 24px"
      ><font-awesome-icon
        icon="fa-solid fa-arrow-up"
        size="xs"
        style="color: #fff0fe"
    /></a>
    <footer style="margin-top: 0%">
      <div class="content-footer">
        <div class="top">
          <div class="logo-details">
            <img src="../assets/logo_book.png" alt="LB logo" />
            <p class="logo-name">
              MASTERBOOKS <br />
              <small>est. 2023</small>
            </p>
          </div>
          <div class="media-icons">
            <a href="https://www.linkedin.com/in/lou-brunesseaux-a843aa248"
              ><font-awesome-icon icon="fa-brands fa-linkedin-in"
            /></a>
            <a href="mailto:loubruness@gmail.com"
              ><font-awesome-icon icon="fa-brands fa-google"
            /></a>
            <a href="https://github.com/loubruness"
              ><font-awesome-icon icon="fa-brands fa-github"
            /></a>
          </div>
        </div>
      </div>
    </footer>
  </body>
</template>

<script>
import UserMenu from "../components/UserMenu.vue";
// import DarkLightMode from "../components/DarkLightMode.vue";
export default {
  name: "EntryFormPage2",
  components: {
    UserMenu,
    // DarkLightMode
  },
  data() {
    return {
      titre: "",
      auteur: "",
      resume: "",
      pages: "",
      date_parution: "",
      langue: "",
      selectedGenres: [],
      url: "",
      image_src: "",
      sent: false,
      error: false,
      selectedFileEpub: null,
      selectedFileCover: null,
      labelTextEpub: "No file selected",
      labelTextCover: "No file selected",
      resumeExceedsLimit: false,
      bookAlreadyExists: false,
      notComplete: false,
      genres: [],
      nbGenre: 1,
    };
  },
  mounted() {
    var thisID = document.getElementById("TopBtn");
    var myScrollFunc = function () {
      var y = window.scrollY;
      if (y >= 300) {
        thisID.className = "fa fa-angle-double-up show";
      } else {
        thisID.className = "fa fa-angle-double-up hide";
      }
    };
    window.addEventListener("scroll", myScrollFunc);
    this.fetchGenres();
    console.log(this.genres);
  },
  methods: {
    fetchGenres() {
      fetch("http://129.151.226.75:8080/api/livre/getgenres")
        .then((response) => response.json())
        .then((data) => {
          this.genres = data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    handleSend() {
      console.log(this.name, this.email, this.summary, this.details, this.link);
      // const fdata = new FormData();
      console.log(this.selectedGenres);

      if (
        this.titre == "" ||
        this.auteur == "" ||
        this.pages == "" ||
        this.resume == "" ||
        this.url == "" ||
        this.date_parution == "" ||
        this.image_src == "" ||
        this.selectedGenres == [] ||
        this.langue == ""
      ) {
        this.sent = false;
        this.error = true;
        this.notComplete = true;
        return "Fill every field with a * !";
      }

      this.error = false;

      const data = {
        titre: this.titre,
        auteur: this.auteur,
        pages: this.pages,
        resume: this.resume,
        url: this.url,
        date_parution: this.date_parution,
        image_src: this.image_src,
        genres: this.selectedGenres,
        langue: this.langue,
      };

      console.log(data.genres);

      const jsonData = JSON.stringify(data);

      fetch("http://129.151.226.75:8080/api/livre/store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonData,
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
        .then((data) => {
          // Check the response message for book creation
          if (data.message === "Book added successfully") {
            this.sent = true;
            this.titre = "";
            this.auteur = "";
            this.pages = "";
            this.resume = "";
            this.url = "";
            this.date_parution = "";
            this.image_src = "";
            this.selectedGenres = [];
            this.langue = "";
            this.selectedFileEpu = null;
            this.selectedFileCover = null;
            this.labelTextEpub = "No file selected";
            this.labelTextCover = "No file selected";
            this.resumeExceedsLimit = false;
            this.bookAlreadyExists = false;
            this.notComplete = false;
            this.nbGenre = 1;
          } else if (data.message === "Book already exists") {
            this.bookAlreadyExists = true;
          }
        })
        .catch((error) => {
          console.error(error);
          // Handle any errors that occur during the fetch request
        });

    },
    handleEpubFileChange(event) {
      const file = event.target.files[0];
      console.log("here");
      if (file) {
        this.selectedFileEpub = file;
        if (file.name.length > 35) {
          this.labelTextEpub = file.name.substring(0, 35) + "...";
        } else {
          this.labelTextEpub = file.name;
        }

        const formData = new FormData();
        formData.append("file", file);
        console.log("here");
        fetch("http://129.151.226.75:8080/api/livre/metadata", {
          method: "POST",
          body: formData,
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
          .then((data) => {
            // Use the retrieved metadata
            this.titre = data.titre;
            this.auteur = data.auteur;
            this.date_parution = data.date_parution;
            this.pages = data.pages;
            this.resume = data.resume;
            this.url = data.url;
            // Check if cover image exists
            if (data.image_src) {
              this.image_src = data.image_src;
              this.selectedFileCover = null;
              this.labelTextCover = "Cover already stored";
            }
            this.handleResumeInput();
          })
          .catch((error) => {
            console.error("Error:", error);
            // Handle errors
          });
      } else {
        this.selectedFileEpub = null;
        this.labelTextEpub = "No file selected";
      }
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFileCover = file;
        this.labelTextCover = file.name;
      } else {
        this.selectedFileCover = null;
        this.labelTextCover = "No file selected";
      }
    },
    handleResumeInput() {
      const maxCharacters = 1000;

      if (this.resume.length > maxCharacters) {
        this.resume = this.resume.substring(0, maxCharacters);
        this.resumeExceedsLimit = true; // Add a new data property to indicate if the limit is exceeded
      } else {
        this.resumeExceedsLimit = false; // Reset the flag if the limit is not exceeded
      }
    },
  },
};
</script>
