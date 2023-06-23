<template>
    <body>
        <a id="top"></a>
        <!-- <?php if($_SESSION['admin']==1){?> -->
        <div class="FormPage2" style="overflow-y: hidden;">
            <div class="headernav">

                <div class="header-image">
                    <img alt="Vue logo" style="opacity: 0.7;" src="../assets/LogoDayClean1.png" class="logo-nav-clean" />
                </div>
                <div class="Navbar">
                    <router-link to="/catalog-page" class="to-page-nav">Book catalog</router-link>
                    <router-link to="/catalog-library-page" class="to-page-nav">My Library</router-link>
                    <router-link to="/catalog-pag" class="to-page-nav">Recommendations</router-link>
                </div>
                <UserMenu></UserMenu>

            </div>
            <div class="FormBox">
                <div class="FormContainer">
                    <div class="Form-banner-container">
                        <div class="loginForm">
                            <h2>Add a book</h2>
                            <p class="Form-presentation" style="text-align: center;"> <br> Please fill in <i
                                    class="fa fa-bold" aria-hidden="true">all</i> the necessary information <br><br> The
                                mandatory fields are marked by a *
                                <br><br>
                            </p>
                            <form action="#" method="post">
                                <div class="Form-question">
                                    <label for="file-upload">
                                        <p class="Form-question"><i class="fa fa-bold" aria-hidden="true">Book's
                                                epub file*</i></p>
                                    </label>
                                    <div class="AddBookInput">
                                        <button class="Create-planning-Btn" style="margin-right: 15px; margin-bottom: 8px"
                                            @click="$refs.fileupload.click()">Click here</button>
                                        <input type="file" id="file-upload" ref="fileupload" name="file-upload"
                                            class="loginInputBox" placeholder="Upload a screenshot of the issue."
                                            @change="handleFileChange" style="display:none">
                                        {{ labelText }}
                                    </div>
                                </div>
                                <p class="Form-question"><i class="fa fa-bold" aria-hidden="true">Book's title*</i> </p>
                                <div class="loginInputBox">
                                    <input v-model="email" type="text" name="txtEmail" placeholder="Title">
                                </div>

                                <p class="Form-question"><i class="fa fa-bold" aria-hidden="true">Book's author*</i> </p>
                                <div class="loginInputBox">
                                    <input v-model="email" type="text" name="txtEmail" placeholder="Author">
                                </div>

                                <div class="Form-question">
                                    <label for="file-upload">
                                        <p class="Form-question"><i class="fa fa-bold" aria-hidden="true">Book's
                                                illustration*</i></p>
                                    </label>
                                    <div class="AddBookInput">
                                        <button class="Create-planning-Btn" style="margin-right: 15px; margin-bottom: 8px"
                                            @click="$refs.fileupload.click()">Click here</button>
                                        <input type="file" id="file-upload" ref="fileupload" name="file-upload"
                                            class="loginInputBox" placeholder="Upload a screenshot of the issue."
                                            @change="handleFileChange" style="display:none">
                                        {{ labelText }}
                                    </div>
                                </div>
                                <p class="Form-question"><i class="fa fa-bold" aria-hidden="true">Number of pages*</i> </p>
                                <div class="loginInputBox">
                                    <input v-model="email" type="text" name="txtEmail" placeholder="Number of pages">
                                </div>
                                <p class="Form-question"><i class="fa fa-bold" aria-hidden="true">Publication year*</i> </p>
                                <div class="loginInputBox">
                                    <input v-model="email" type="text" name="txtEmail" placeholder="Year in 4 digits">
                                </div>
                                <p class="Form-question"><i class="fa fa-bold" aria-hidden="true">Book's cover picture*</i>
                                </p>
                                <div class="loginInputBox">
                                    <input v-model="email" type="text" name="txtEmail" placeholder="Cover picture">
                                </div>
                                <p class="Form-question"><i class="fa fa-bold" aria-hidden="true">Book's genre(s)*</i> </p>
                                <div class="loginInputBox"
                                    style="display: flex; align-items: center; justify-content: space-around;">
                                    <div class="custom-select1" style="width: 90%;">
                                        <select>
                                            <option value="0">1</option>
                                            <option value="1">2</option>
                                            <option value="2">3</option>
                                            <option value="3">4</option>
                                        </select>
                                    </div>
                                    <font-awesome-icon @click="() => AddPlus()" id="TaskPlus" icon="fa-solid fa-plus"
                                        size="sm" />
                                </div>
                                <p class="Form-question"><i class="fa fa-bold" aria-hidden="true">Book's language*</i> </p>
                                <div class="loginInputBox">
                                    <div class="custom-select1">
                                        <select>
                                            <option value="0">1</option>
                                            <option value="1">2</option>
                                            <option value="2">3</option>
                                            <option value="3">4</option>
                                        </select>
                                    </div>
                                </div>
                                <p class="Form-question"><i class="fa fa-bold" aria-hidden="true">Book's summary*</i> </p>
                                <div class="loginInputBox">

                                    <textarea name="" id="" cols="30" rows="10" class="add-book-input"
                                        placeholder="Enter a short summary." v-model="details"></textarea><br>
                                </div>

                                <!-- <p class="Form-question">Would you rather have schedules in the morning or the afternoon ?
                                </p>
                                <div class="Switch-container">
                                    <p class="Switch-label">Morning</p>
                                    <label class="switch">
                                        <input type="checkbox">
                                        <span class="slider"></span>
                                    </label>
                                    <p class="Switch-label">Afternoon</p>
                                </div> -->
                                <!-- <div class="loginInputBox">
                                    <input type="text" name="txtCategory" value="<?php echo $row['category']?>" />
                                </div>
                                <div class="loginInputBox">
                                    <input type="text" name="txtLevel" value="<?php echo $row['level']?>" />
                                </div> -->
                                <br><br>
                                <div class="loginInputBox FormInputBox">
                                    <input type="submit" value="Submit Information" name="btnUpdate" />
                                </div>
                                <p class="forgotPswd MoveOn">Done here ? <router-link to="/fgpassword-page">Go
                                        back</router-link></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <a id="TopBtn" href="#top" class="fa fa-angle-double-up hide" style="font-size: 24px"><font-awesome-icon
                icon="fa-solid fa-arrow-up" size="xs" style="color: #fff0fe;" /></a>
        <footer style="margin-top: 0%">

            <div class="content-footer">
                <div class="top">
                    <div class="logo-details">
                        <img alt="Vue logo" style="opacity: 0.7;" src="../assets/LogoDayClean1.png"
                            class="logo-nav-clean" />
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
            name: "",
            email: "",
            summary: "",
            details: "",
            link: "",
            sent: false,
            error: false,
            selectedFile: null,
            labelText: "No file selected"
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
    },
    methods: {
        handleSend() {
            console.log(this.name, this.email, this.summary, this.details, this.link);
            const fdata = new FormData();

            if (this.name == "" || this.email == "" || this.summary == "" || this.details == "") {
                this.sent = false;
                this.error = true;
                return "Fill every field with a * !";
            }

            this.error = false;

            fdata.append("name", this.name);
            fdata.append("email", this.email);
            fdata.append("summary", this.summary);
            fdata.append("details", this.details);

            if (this.link != "")
                fdata.append("link", this.link);

            if (this.selectedFile)
                fdata.append("report_photo", this.selectedFile);

            const request = new XMLHttpRequest();
            request.open("POST", "http://127.0.0.1:8000/help_request");
            request.send(fdata);

            this.sent = true;
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
    }

};
</script>
