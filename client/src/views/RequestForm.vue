<template>
    <body>
        <a id="top"></a>
        <!-- <?php if($_SESSION['admin']==1){?> -->
        <div class="FormPage1">
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
                            <h2>Request a book</h2>
                            <p class="Form-presentation"> <br> Didn't find the book you were looking for ? <i
                                    class="fa fa-bold" aria-hidden="true">No worries !</i> <br><br> Please fill in the
                                following form, and our team will do its best to quickly add your awaited book to our
                                library !
                                <br><br>
                            </p>
                            <form action="#" method="post">
                                <p class="Form-question">Please enter the <i class="fa fa-bold" aria-hidden="true">book's
                                        title*</i> </p>
                                <div class="loginInputBox">
                                    <input v-model="txtTitle" type="text" name="txtEmail" placeholder="Title">
                                </div>

                                <p class="Form-question">Please enter the <i class="fa fa-bold" aria-hidden="true">book's
                                        author*</i> </p>
                                <div class="loginInputBox">
                                    <input v-model="txtAuthor" type="text" name="txtEmail" placeholder="Author">
                                </div>

                                <p class="Form-question">If you know it, please enter the <i class="fa fa-bold"
                                        aria-hidden="true">book's edition</i></p>
                                <div class="loginInputBox">
                                    <input v-model="txtLangue" type="text" name="txtEmail" placeholder="Edition">
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
    }
};
</script>
