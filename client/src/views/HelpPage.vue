<template>
    <body>


        <header>
            <div class="headernav">
                <div class="header-container">
                    <div class="header-image">
                        <img alt="Vue logo" src="../assets/logo_book.png" class="VueLogo" />
                    </div>
                </div>
                <div class="Navbar">
                    <router-link to="/calendar-page" class="to-page-nav">Book catalog</router-link>
                    <router-link to="/todo-list2-page" class="to-page-nav">My Library</router-link>
                    <router-link to="/create-calendar-page" class="to-page-nav">Recommendations</router-link>
                </div>
                <UserMenu></UserMenu>
                <div class="light">
                    <DarkLightMode></DarkLightMode>
                </div>
            </div>
        </header>
        <a id="top"></a>
        <div class="help-page">
            <div class="help-page-container">
                <h1 class="modal-Title">Contact Support</h1>
                <p class="help-prompt">For any problem with your account, security concerns, or questions about our policy,
                    we're happy to help !</p>
                <form action="" class="help-form" @submit.prevent="formSubmit">
                    <div class="all-questions">
                        <div class="help-question">
                            <label for="fname" class="help-label">Your Name * </label>
                            <input type="text" id="fname" name="fname" class="help-input" placeholder="..."
                                v-model="txtName"><br>
                        </div>
                        <div class="help-question">
                            <label for="fname" class="help-label">Your Email * </label>
                            <input type="text" id="fname" name="fname" class="help-input" placeholder="..."
                                v-model="email"><br>
                        </div>
                        <div class="help-question">
                            <label for="fname" class="help-label">Summary * </label>
                            <input type="text" id="fname" name="fname" class="help-input"
                                placeholder="Give us a brief description of what's happening." v-model="txtSummary"><br>
                        </div>
                        <div class="help-question">
                            <label for="fname" class="help-label">Add more details * </label>
                            <textarea name="" id="" cols="30" rows="10" class="help-input"
                                placeholder="If you have more specific info, add it here."
                                v-model="txtDetails"></textarea><br>
                        </div>
                        <div class="help-question">
                            <label for="fname" class="help-label">Page Link </label>
                            <input type="text" id="fname" name="fname" class="help-input"
                                placeholder="Paste the link to where the issue is happening." v-model="txtLink"><br>
                        </div>
                        <div class="help-question">
                            <label for="file-upload" class="help-label">Upload Screenshot</label>
                            <div class="help-input">
                                <button class="Create-planning-Btn" style="margin-right: 15px;"
                                    @click="$refs.fileupload.click()">Click here</button>
                                <input type="file" id="file-upload" ref="fileupload" name="file-upload" class="help-input"
                                    placeholder="Upload a screenshot of the issue." @change="handleFileChange"
                                    style="display:none">
                                {{ labelText }}
                            </div>

                            <br>
                        </div>
                        <button @click="sendMail" type="submit" class="submit-help-btn" id="UpdateBtn">
                            Send
                        </button>
                        <div class="help-question" style="height: 40px;">
                            <p class="help-prompt" v-if="sent" style="color: green"> Help Request sent !</p>
                            <p class="help-prompt" v-if="error" style="color: red"> Please fill every field with a * !</p>
                        </div>
                    </div>
                </form>
                <p class="help-prompt">Thank you for your feedback !</p>

            </div>
        </div>
        <a id="TopBtn" href="#top" class="fa fa-angle-double-up hide" style="font-size: 24px"><font-awesome-icon
                icon="fa-solid fa-arrow-up" size="xs" style="color: #fff0fe;" /></a>
        <footer>
            <div class="content-footer">
                <div class="top">
                    <div class="logo-details">
                        <img src="../assets/logo_book.png" alt="LB logo" />
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
import DarkLightMode from "../components/DarkLightMode.vue";
import axios from "axios";
let imageContent = null;
export default {
    name: "HelpPage",
    components: {
        DarkLightMode,
        UserMenu
    },
    data() {
        return {
            txtName: "",
            email: "",
            txtSummary: "",
            txtDetails: "",
            txtLink: "",
            sent: false,
            error: false,
            selectedFile: null,
            labelText: "No file selected",
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
        handleFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.selectedFile = file;
                this.labelText = file.name;
                const reader = new FileReader();
                reader.onloaded = () =>{
                    imageContent = reader.result;
                    console.log("image Content",imageContent)                
                }
                
            } else {
                this.selectedFile = null;
                this.labelText = "No file selected";
            }


        },
        sendMail() {
            let mailOptions = {
                to: 'masterbookefrei@gmail.com',
                subject: 'Demande de support',
                template: 'email-body-support',
                context: {
                    name: this.txtName,
                    email: this.email,
                    summary: this.txtSummary,
                    details: this.txtDetails,
                    link: this.txtLink,
                    img: imageContent
                },
                attachments: [
                    {
                        filename: 'LogoJour.png',
                        path: 'LogoJour.png',
                        cid: 'image_cid', // Identifiant unique de l'image pour le .handlebars
                    },
                ],
            };

            axios.post("http://129.151.226.75:8080/api/email/send", mailOptions)
                .then((response) => {
                    console.log(response)
                })


        }
    }
};
</script>

<style></style>