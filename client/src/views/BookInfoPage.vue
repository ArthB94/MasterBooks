<template>
    <body>
        <header>
            <div class="headernav">
                <div class="header-container">
                    <div class="header-image">
                        <!-- <img alt="Vue logo" src="../assets/LogoDay.png" class="VueLogo" style="    width: 177px;
    height: 167px;
    margin: 0px;
    margin-bottom: 50px; margin-left: 37px;" /> -->
                        <div class="logo-nav"></div>
                    </div>
                </div>
                <div class="Navbar">
                    <router-link to="/catalog-page" class="to-page-nav">Book catalog</router-link>
                    <router-link to="/catalog-library-page" class="to-page-nav">My Library</router-link>
                    <router-link to="/catalog-recs-page" class="to-page-nav">Recommendations</router-link>
                </div>
                <UserMenu></UserMenu>
                <div class="light">
                    <DarkLightMode></DarkLightMode>
                </div>
            </div>
        </header>
        <a id="top"></a>

        <div class="Book-page-container">
            <div class="Book-info-container">
                <div class="Book-image-container">
                    <img v-bind:src="'http://129.151.226.75:8080/' + this.bookCover" alt="book_pic" class="book-cover-info">
                </div>
                <div class="Book-info-specs-container">
                    <div class="book-title-info" v-html="bookTitle"></div>
                    <div class="book-author-info" v-html="bookAuthor"></div>
                    <div class="date-and-language-info">
                        <span v-html="bookLanguage"></span> - <span v-html="bookYear"></span>
                    </div>
                    <div class="book-genres-info">
                        {{ this.bookGenres.join(', ') }}
                    </div>
                    <div class="rate">
                        <input type="radio" id="star5" name="rate" value="5" />
                        <label for="star5" title="Must read - 5">5 stars</label>
                        <input type="radio" id="star4" name="rate" value="4" />
                        <label for="star4" title="Really good - 4">4 stars</label>
                        <input type="radio" id="star3" name="rate" value="3" />
                        <label for="star3" title="Entertaining - 3">3 stars</label>
                        <input type="radio" id="star2" name="rate" value="2" />
                        <label for="star2" title="Passable - 2">2 stars</label>
                        <input type="radio" id="star1" name="rate" value="1" />
                        <label for="star1" title="No comment - 1">1 star</label>
                    </div>
                    <div class="lib-button-container adapted-wishlist" style="padding-left: 35px; padding-top: 40px; ">
                        <div><font-awesome-icon icon="fa-regular fa-heart" /></div>
                        <div><font-awesome-icon icon="fa-regular fa-bookmark" /></div>
                    </div>
                </div>
                <div class="save-share-info">
                    <div>
                        <router-link to="/book-read-page" class="LogRegBtnLink"
                            style="--shadow: #9216ffd1; --color: #f291bb; --background: #f291bbba; text-align: center;">Read</router-link>
                    </div>
                    <div class="help-question">
                        <label for="fname" class="help-label label-recs-book" style="text-align: center; ">Want to share
                            this book with someone?</label>
                        <input type="text" id="fname" name="fname" class="help-input label-recs-book" placeholder="Email"
                            v-model="email"><br>
                    </div>
                    <!-- <p class="Form-question"><i class="fa fa-bold" aria-hidden="true">Number of pages*</i> </p>
                                <div class="loginInputBox">
                                    <input v-model="email" type="text" name="txtEmail" placeholder="Number of pages">
                                </div> -->
                    <button to="/register-page" @click="OpenDeleteTask()" class="LogRegBtnLink"
                        style="--shadow: #f291bb; --color: rgb(162, 85, 255,0.3); --background: #c18cd6; border-top: transparent; border-left:transparent; margin-top: 10px;">Share</button>
                    <p class="book-disclaimer-info">*Read/Share available for 30 days</p>


                </div>
            </div>
            <div class="Comment-section-container">
                <div class="FAQcontainer">
                    <!-- <h3 class="comment-container-title">Feedback & Comments</h3> -->
                    <div class="comments">
                        <div class="comment flex items-start justify-start">
                            <img class="comment-avatar" src="../assets/UserMe.png" alt="Admin img">
                            <div class="flex-1">
                                <h3 class="comment-author1">Admin</h3>
                                <p class="comment-body">What did you think about this book ? Feel free to speak your mind !
                                </p>
                            </div>
                        </div>
                    </div>
                    <!--------------------------------------------------Comment input section--------------------------------------------------------------->

                    <div class="comment comment-new flex items-start justify-start">
                        <img class="comment-avatar" src="../assets/UserWrite.png" alt="User Write img">
                        <div class="flex-1">

                            <form action="#" class="comment-form">
                                <textarea placeholder="Username" class="comment-author"></textarea>
                                <textarea placeholder="Add your comment" class="comment-input"></textarea>
                                <input type="submit" class="comment-submit" value="Submit">
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div id="myModalDeleteTask" class="modal">
                <!-- Modal content -->
                <div class="modal-content">
                    <span class="close" @click='CloseDeleteTask'>&times;</span>
                    <h1 class="modal-Title">Share this Book ?</h1>
                    <div class="modal-center">
                        <p style="margin-top: 50px; margin-bottom: 10px;">Are you sure you want to share this Book with the
                            following email address?</p>
                        <div class="message"> {{ message }}</div>
                        <div class="help-question">
                            <input type="text" id="fname" name="fname" class="help-input" placeholder="Email"
                                v-model="email"><br>
                        </div>
                        <div class="delete-list-button">
                            <div class="AddTaskInputBox no">
                                <input class="close" type="submit" value="Cancel" name="submit" @click='CloseDeleteTask' />
                            </div>
                            <div class="AddTaskInputBox no">
                                <input style="margin-left: 0px;" type="submit" value="Share" name="submit"
                                    @click='DeleteTask' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <a id="TopBtn" href="#top" class="fa fa-angle-double-up hide" style="font-size: 24px"><font-awesome-icon
                icon="fa-solid fa-arrow-up" size="xs" style="color: #fff0fe;" /></a>
        <footer>
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
import DarkLightMode from "../components/DarkLightMode.vue";
import UserAvatar from "../assets/User.png"
import axios from "axios";
export default {
    name: "BookInfoPage",
    data() {
        return {
            bookRef: null,
            isAdmin: false,
            userData: null,
            bookTitle: null,
            bookAuthor: null,
            bookLanguage: null,
            bookYear: null,
            bookGenresId: [],
            bookGenres: [],
            bookCover: null,
            bookSummary: null,
            bookReadUrl: null,
            bookRating: null,
            // TODO: Ajouter les commentaires
            // TODO: Mettre si le livre appartient à une liste
        };
    },
    components: {
        DarkLightMode,
        UserMenu
    },
    created() {
        // On récupère l'identifiant du livre
        // L'URL est de la forme https://masterbooks.com/book?ref=1
        
        var bookId = this.$route.query.ref;
        // if (bookId === undefined) {
        //     this.$router.push('catalog-page');
        // }

        // Récupérer le livre depuis l'API
        axios
            .post("http://129.151.226.75:8080/api/livre/getInfo", { ref: bookId })
            //.post("http://localhost:8080/api/livre/getInfo", { ref: bookId })
            .then((response) => {
                if (response.status === 200) {
                    return response.data;
                }
                console.log("An error occurred.");
                throw new Error(JSON.stringify(response.data));
            }).then((data) => {
                console.log(data);
                this.bookTitle = data.titre;
                this.bookAuthor = data.auteur;
                this.bookLanguage = data.langue;
                this.bookYear = data.date_parution;
                this.bookGenresId = data.genres;
                this.bookCover = data.image_src;
                this.bookSummary = data.resume;
                this.bookReadUrl = data.url;
            })
            .catch((err) => {
                console.error(err);
                // this.$router.push('catalog-page');
            }
        );
        
        // On récupère le nom des genres
        axios
        .get("http://129.151.226.75:8080/api/livre/getgenres")
        .then((response) => {
            if (response.status === 200) {
                console.log(response.data);

                response.data.forEach(element => {
                    if (this.bookGenresId.includes(element.genre_id)) {
                        this.bookGenres.push(element.genre);
                        console.log("added genre " + element.genre);
                    }
                });
                console.log(this.bookGenres);
            } else {
                console.log("error getgenres");
            }
        });
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


        const submit = document.querySelector('.comment-submit');
        const commentList = document.querySelector('.comments');
        const commentAuthor = document.querySelector('.comment-author');
        const commentInput = document.querySelector('.comment-input');


        function template(data) {
            commentList.insertAdjacentHTML("beforeend", `
  <div class="comment flex items-start justify-start">
      <img class="comment-avatar" :src="avatar" />
      <div class="flex-1">
        <h3 class="comment-author1">${data.author}</h3>
        <p class="comment-body">${data.comment}</p>
      </div>
    </div>
  </div>`);
        }

        function appendComment(event) {

            const data = {
                avatar: UserAvatar,
                author: commentAuthor.value,
                comment: commentInput.value,
            };

            event.preventDefault();

            if (commentInput.value.length < 1) return;

            // Insert new template into DOM
            template(data);

            // Reset Author text area value
            commentAuthor.value = "";

            // Reset text area value
            commentInput.value = "";

            // Save the list to localStorage
            localStorage.setItem('commentListing', JSON.stringify(commentList.innerHTML));
        }


        submit.addEventListener('click', appendComment, false)

        // Check for saved items

        const saved = JSON.parse(localStorage.getItem('commentListing'));


        // If there are any saved items, update the current list
        if (saved) {
            commentList.innerHTML = saved;
        }

    },
    methods: {
        OpenDeleteTask(id) {

            this.DeleteTaskIndex = id;
            document.getElementById("myModalDeleteTask").style.display = "block";
        },
        CloseDeleteTask() {
            document.getElementById("myModalDeleteTask").style.display = "none";
        },
    }
}
</script>