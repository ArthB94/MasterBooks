<template>
    <body>
        <div class="Landing-page-container">
        <header>
            <div class="header-container">
                <div class="header-image">
                    <img alt="Vue logo" src="../assets/logo_book.png" class="VueLogo" />
                </div>
                <div>
                    <router-link to="/login-page" class="LogRegBtnLink"
                        style="--shadow: #16dcff; --color: #f291bb; --background: #f291bbba">Login</router-link>
                    <router-link to="/register-page" class="LogRegBtnLink"
                        style="--shadow: #f291bb; --color: rgb(162, 85, 255,0.3); --background: #c18cd6">Register</router-link>
                </div>
            </div>
        </header>

        <a id="top"></a>
        <div class="WelcomePrompt">
            <div class="Landing-banner-container">
                <div class="Landing-banner">
                    <div class="Landing-banner-text">
                        <h2 class="Slogan">Your ebook library</h2>
                        <br />
                        <h2 class="TimeToDo">Book Master</h2>
                        <br />
                        <h2 class="Slogan">Discover thousands of new worlds</h2>
                    </div>
                    <div>
                        <img src="../assets/LangingPage.png" alt="Landing-png" class="Landing-png" />
                    </div>
                </div>
            </div>
            <p>
                Always wanted to have an endless library directly behind your screen ?<br /><br />This is the place for you
            </p>

            <router-link to="/register-page" class="TryOutBtnLink">Try it out!</router-link>
        </div>
        <div class="SiteContent-container">
            <div class="VocabPrez">
                <div class="VocabDescription">
                    <h1 class="VocabH1">10 000+ books at your disposition</h1>
                    <p>
                        Browse our endless selection of reads
                        <br /><br />
                        With our curated filters and recommendation algorithm, you're garenteed to find what you seek !
                    </p>
                </div>
                <img src="../assets/PlannerLanding.jpg" alt="Planner demo" class="Vocabdemo">
            </div>
            <div class="ExoPrez">
                <img src="../assets/AddTaskLanding.jpg" alt="Add Task demo" class="Vocabdemo">
                <div class="ExoDescription">
                    <h1>Personalized library</h1>
                    <p>
                        Keep a record of the books you've rented, so that you can read your favorites over and over again...<br /><br />
                        And feed your wishlist to discover your next adventure !
                    </p>
                </div>
            </div>
            <div class="VocabPrez">
                <div class="VocabDescription">
                    <h1 class="TestH1">An interactive experience</h1>
                    <p>
                        Can't find a book you've been dying to read ? Notify our team and we'll make sure to upload it ASAP <br /><br />
                        Found the thriller book your best friend's been dreaming of ? Share it to her in one click !
                    </p>
                </div>
                <img src="../assets/ToDoLanding.jpg" alt="ToDo demo" class="Vocabdemo">
            </div>
            <div class="WelcomePrompt WelcomeEnd">
                <h1> </h1>
                <router-link to="/register-page" class="TryOutBtnLink">Get started!</router-link>
            </div>
        </div>
        <a id="TopBtn" href="#top" class="fa fa-angle-double-up hide" style="font-size: 24px"><font-awesome-icon icon="fa-solid fa-arrow-up" size="xs" style="color: #fff0fe;" /></a>
        <footer>
            <div class="content-footer">
                <div class="top">
                    <div class="logo-details">
                        <img src="../assets/logo_book.png" alt="LB logo">
                        <p class="logo-name">
                            BOOK MASTER <br />
                            <small>est. 2023</small>
                        </p>
                    </div>
                    <div class="media-icons">
                        <a href="https://www.linkedin.com/in/lou-brunesseaux-a843aa248"><font-awesome-icon icon="fa-brands fa-linkedin-in"/></a>
                        <a href="mailto:loubruness@gmail.com"><font-awesome-icon icon="fa-brands fa-google" /></a>
                        <a href="https://github.com/loubruness"><font-awesome-icon icon="fa-brands fa-github"/></a>
                    </div>
                </div>
            </div>
        </footer>
    </div>
    </body>
</template>

<script>
export default {
    name: "LandingPage",
    mounted(){
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

<style>

</style>
