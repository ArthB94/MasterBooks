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
                    <img v-bind:src="this.addressServer+'/' + this.bookCover" alt="book_pic" class="book-cover-info">                </div>
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
                        <input type="radio" id="star5" v-model="rate" name="rate" v-bind:value="5" :checked="this.note === 5" @change="changeNote(5)"/>
                        <label for="star5" title="Must read - 5">5 stars</label>
                        <input type="radio" id="star4" v-model="rate" name="rate" v-bind:value="4" :checked="this.note === 4" @change="changeNote(4)"/>
                        <label for="star4" title="Really good - 4">4 stars</label>
                        <input type="radio" id="star3" v-model="rate" name="rate" v-bind:value="3" :checked="this.note === 3" @change="changeNote(3)"/>
                        <label for="star3" title="Entertaining - 3">3 stars</label>
                        <input type="radio" id="star2" v-model="rate" name="rate" v-bind:value="2" :checked="this.note === 2" @change="changeNote(2)"/>
                        <label for="star2" title="Passable - 2">2 stars</label>
                        <input type="radio" id="star1" v-model="rate" name="rate" v-bind:value="1" :checked="this.note === 1" @change="changeNote(1)"/>
                        <label for="star1" title="No comment - 1">1 star</label>
                    </div>
                    <div class="lib-button-container adapted-wishlist" style="padding-left: 35px; padding-top: 40px; ">
                        <div @click="ToggleFromPersonalList()"><font-awesome-icon v-bind:icon="isInPersonalListClass + ' fa-heart'" /></div>
                        <div @click="ToggleHasRead()"><font-awesome-icon v-bind:icon="hasBeenReadClass + ' fa-bookmark'" /></div>
                    </div>
                </div>
                <div class="save-share-info">
                    <div>
                        <router-link :to="{ path: 'book-read-page', query: { url: bookReadUrl,ref:bookRef }}" class="LogRegBtnLink"
                            style="--shadow: #9216ffd1; --color: #f291bb; --background: #f291bbba; text-align: center;">Read</router-link>
                    </div>
                    <div class="help-question">
                        <label for="fname" class="help-label label-recs-book" style="text-align: center; ">Want to share
                            this book with someone?</label>
                        <input type="text" id="fname" name="fname" class="help-input label-recs-book" placeholder="Email"
                            v-model="email"><br>
                    </div>
                    <button @click="ShareBook()" class="LogRegBtnLink"
                        style="--shadow: #f291bb; --color: rgb(162, 85, 255,0.3); --background: #c18cd6; border-top: transparent; border-left:transparent; margin-top: 10px;">Share</button>
                    <p class="book-disclaimer-info">*Share available for 25 days</p>


                </div>
            </div>
            <div class="summary-container">
                {{ this.bookSummary }} 
            </div>
            <div class="Comment-section-container">
                <div class="FAQcontainer">
                    <!-- <h3 class="comment-container-title">Feedback & Comments</h3> -->
                    <div>
                        <div class="comment flex items-start justify-start">
                            <img class="comment-avatar" src="../assets/UserMe.png" alt="Admin img">
                            <div class="flex-1">
                                <h3 class="comment-author1">Admin</h3>
                                <p class="comment-body">What did you think about this book ? Feel free to speak your mind !
                                </p>
                            </div>
                        </div>
                        <div class="comments"></div>
                    </div>
                    <!--------------------------------------------------Comment input section--------------------------------------------------------------->

                    <div class="comment comment-new flex items-start justify-start">
                        <img class="comment-avatar" src="../assets/UserWrite.png" alt="User Write img">
                        <div class="flex-1">

                            <form action="#" class="comment-form">
                                <textarea :placeholder="userPseudo" class="comment-author" v-model="commentUsername" disabled></textarea>
                                <textarea placeholder="Add your comment" class="comment-input" v-model="commentBody"></textarea>
                                <input type="submit" class="comment-submit" value="Submit" @click="addComment">
                            </form>
                        </div>
                    </div>

                </div>
            </div>




            <!-- Modal original -->
            <!-- <div id="myModalDeleteTask" class="modal"> -->
                <!-- Modal content -->
                <!-- <div class="modal-content">
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
            </div> -->

            <!-- Modal mail envoyé -->
            <div id="modalEmailSent" class="modal">
                <!-- Modal content -->
                <div class="modal-content">
                    <span class="close" @click="CloseModalEmailSent">&times;</span>
                    <h1 class="modal-Title">The invitation was sent!</h1>
                    <div class="modal-center">
                        <p style="margin-top: 50px; margin-bottom: 10px;">We just sent an email to let them know a new book is waiting for them!</p>
                        <div class="delete-list-button">
                            <div class="AddTaskInputBox yes">
                                <input class="close" type="submit" value="OK" name="submit" @click='CloseModalEmailSent' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Modal erreur lors de l'envoi de mail -->
            <div id="modalEmailError" class="modal">
                <!-- Modal content -->
                <div class="modal-content">
                    <span class="close" @click="CloseModalEmailError">&times;</span>
                    <h1 class="modal-Title">An error occurred!</h1>
                    <div class="modal-center">
                        <p style="margin-top: 50px; margin-bottom: 10px;">Something happened when trying to send the email! Please verify that the email is correct or try again later.</p>
                        <div class="delete-list-button">
                            <div class="AddTaskInputBox yes">
                                <input class="close" type="submit" value="OK" name="submit" @click='CloseModalEmailError' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Modal erreur lors de l'envoi de mail -->
            <div id="modalTooManyBooksShared" class="modal">
                <!-- Modal content -->
                <div class="modal-content">
                    <span class="close" @click="CloseModalTooManyBooksShared">&times;</span>
                    <h1 class="modal-Title">You share too many books!</h1>
                    <div class="modal-center">
                        <p style="margin-top: 50px; margin-bottom: 10px;">Uh oh... It seems like you already shared three books in the last twenty-five days! Please try again later.</p>
                        <div class="delete-list-button">
                            <div class="AddTaskInputBox yes">
                                <input class="close" type="submit" value="OK" name="submit" @click='CloseModalTooManyBooksShared' />
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
            bookInPersonalList: false,
            isInPersonalList: false,
            isInPersonalListClass: "fa-regular",
            hasBeenRead: false,
            hasBeenReadClass: "fa-regular",
            email_user: null,
            userAvatar: UserAvatar,
            commentAuthor: null,
            commentInput: null,
            note: null,
            commentList: null,
            commentBody:[],
            userPseudo :"",
            
            addressServer: localStorage.getItem('addressServer')
        };
    },
    components: {
        DarkLightMode,
        UserMenu
    },
    created() {
        // On récupère l'identifiant du livre
        // L'URL est de la forme https://masterbooks.com/book?ref=1
        this.bookRef = this.$route.query.ref;
        if (this.bookRef === null || this.bookRef === undefined) {
            this.$router.push('catalog-page');
            return
        }

        this.userData = JSON.parse(localStorage.getItem("userData"));
        this.email_user = this.userData.email_user;
        this.userPseudo = this.userData.pseudo;


        // Récupérer le livre depuis l'API
        axios
            .post(this.addressServer+"/api/livre/getInfo", { ref: this.bookRef })
            //.post(this.addressServer+"/api/livre/getInfo", { ref: this.bookRef })
            .then((response) => {
                if (response.status === 200) {
                    return response.data;
                }
                console.log("An error occurred.");
                throw new Error(JSON.stringify(response.data));
            }).then((data) => {
                console.log("book retrieved !");
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
                this.$router.push('catalog-page');
            }
        );
        
        setTimeout(() => {
            axios
            .get(this.addressServer+"/api/livre/getgenres")
            .then((response) => {
                if (response.status === 200) {
                    console.log(response.data);

                    response.data.forEach(element => {
                        console.log(element.genre_id)
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
              }, 200);

        // On récupère le nom des genres
        // axios
        // .get(this.addressServer+"/api/livre/getgenres")
        // .then((response) => {
        //     if (response.status === 200) {
        //         console.log("getgenres");
        //         console.log("this.bookGenred ID ", this.bookGenresId);
        //         console.log(response.data);

        //         response.data.forEach(element => {
        //             console.log(element.genre_id)
        //             if (this.bookGenresId.includes(element.genre_id)) {
        //                 this.bookGenres.push(element.genre);
        //                 console.log("added genre " + element.genre);
        //             }
        //         });
        //         console.log(this.bookGenres);
        //     } else {
        //         console.log("error getgenres");
        //     }
        // });


        
        // On veut savoir si le livre est dans l'une des listes de l'utilisateur 
        // Liste personnelle à lire plus tard
        axios
        .post(this.addressServer+"/api/livre/isInPersonalList", { ref: this.bookRef, email_user: this.email_user })
        //.post(this.addressServer+"/api/livre/isInPersonalList", { ref: this.bookRef, email_user: this.email_user })
        .then((response) => {
            console.log(response);
            if (response.status === 200) {
                if (response.data.isInPersonalList === false) 
                {
                    this.isInPersonalList = false;
                    this.isInPersonalListClass = "fa-regular";
                }
                else
                {                    
                    this.isInPersonalList = true;
                    this.isInPersonalListClass = "fa-solid";
                }
            }
        });

        // Liste des livres déjà lus
        axios
        .post(this.addressServer+"/api/livre/hasBeenRead", { ref: this.bookRef, email_user: this.email_user })
        //.post(this.addressServer+"/api/livre/hasBeenRead", { ref: this.bookRef, email_user: this.email_user })
        .then((response) => {
            console.log(response);
            if (response.status === 200) {
                console.log(response.data);
                if (response.data.hasBeenRead === false) 
                {
                    this.hasBeenRead = false;
                    this.hasBeenReadClass = "fa-regular";
                }
                else
                {                    
                    this.hasBeenRead = true;
                    this.hasBeenReadClass = "fa-solid";
                }
            }
        });
        

        // Récupérer les commentaires des utilisateurs
        this.getComments();

        const commentList = document.querySelector('.comments');
        const commentAuthor = document.querySelector('.comment-author');
        const commentInput = document.querySelector('.comment-input');
        const note = document.querySelector('input[name="rate"]');
        this.commentList = commentList;
        this.commentAuthor = commentAuthor;
        this.commentInput = commentInput;
        this.note = note;
    },
    mounted() {
        const submit = document.querySelector('.comment-submit');
        submit.addEventListener("click", function(event){
            event.preventDefault()
        });

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
        ToggleFromPersonalList() {
            // On inverse maintennt pour plus de fluidité
            this.isInPersonalListClass = (this.isInPersonalList === true) ? "fa-regular" : "fa-solid";
            this.isInPersonalList = !this.isInPersonalList;

            axios
            .post(this.addressServer+"/api/livre/toggleFromPersonalList", { ref: this.bookRef, email_user: this.email_user })
            //.post(this.addressServer+"/api/livre/toggleFromPersonalList", { ref: this.bookRef, email_user: this.email_user })
            .then((response) => {
                if (response.status !== 200) {
                    console.log("An error occurred!");

                    // On inverse à nouveau pour annuler les modifications front
                    this.isInPersonalListClass = (this.isInPersonalList === true) ? "fa-regular" : "fa-solid";
                    this.isInPersonalList = !this.isInPersonalList;
                }
            })
        },
        ToggleHasRead() {
            // On inverse maintenant pour plus de fluidité
            this.hasBeenReadClass = (this.hasBeenRead === true) ? "fa-regular" : "fa-solid";
            this.hasBeenRead = !this.hasBeenRead;

            axios
             .post(this.addressServer+"/api/livre/toggleRead", { ref: this.bookRef, email_user: this.email_user })
            //.post(this.addressServer+"/api/livre/toggleRead", { ref: this.bookRef, email_user: this.email_user })
            .then((response) => {
                if (response.status !== 200) {
                    console.log("An error occurred!",response);

                    // On inverse à nouveau pour annuler les modifications front
                    this.hasBeenReadClass = (this.hasBeenRead === true) ? "fa-regular" : "fa-solid";
                    this.hasBeenRead = !this.hasBeenRead;
                }
            })

            //recharge la db recommendations
            axios
                .post(this.addressServer+"/api/livre/addReco", {email_user: this.email_user})
                .then((response_recomendation) =>{
                  console.log("recomendation",response_recomendation)
                });

        },
        ShareBook() {
            var to_email = this.email;

            if (to_email !== undefined) {
                axios
                .post(this.addressServer+"/api/livre/share", { to: to_email, from_email: this.email_user, book_ref: this.bookRef })
                .then((response) => {
                    if (response.status === 200) {
                        console.log("Email was sent.");
                        this.OpenModalEmailSent();
                    }
                })
                .catch((response) => {
                    console.log(response.response.data);
                    if (response.response.data.message === "User has shared too many books!") {
                        this.OpenModalTooManyBooksShared();
                    } else {
                        console.log("An error occurred!");
                        this.OpenModalEmailError();
                    }
                })
            }
        },

        OpenModalEmailSent() {
            document.getElementById("modalEmailSent").style.display = "block";
        },
        CloseModalEmailSent() {
            document.getElementById("modalEmailSent").style.display = "none";
        },
        OpenModalEmailError () {
            document.getElementById("modalEmailError").style.display = "block";
        },  
        CloseModalEmailError () {
            document.getElementById("modalEmailError").style.display = "none";
        },
        OpenModalTooManyBooksShared() {
            document.getElementById("modalTooManyBooksShared").style.display = "block";
        },
        CloseModalTooManyBooksShared() {
            document.getElementById("modalTooManyBooksShared").style.display = "none";
        },
        changeNote(note) {
            this.note = note;
            this.addComment();
        },
        getComments() {
            axios
            .post(this.addressServer+"/api/livre/getComments", { reference: this.bookRef })
            .then((response) => {
                console.log(response);
                console.log(response.data);

                const commentList = document.querySelector('.comments');

                commentList.innerHTML = "";

                response.data.forEach((element) => {
                    if (element.email_user === this.userData.email_user) {
                        console.log(element);
                        this.note = element.noter;
                        this.rate = element.noter;

                        this.commentUsername = element.pseudo;
                        this.commentBody = element.commenter;
                    } 
                    commentList.innerHTML += ("beforeend", `
                        <div class="comment flex items-start justify-start">
                            <img class="comment-avatar" :src="avatar" />
                            <div class="flex-1">
                                <h3 class="comment-author1">${element.pseudo}</h3>
                                <p class="comment-body">${element.commenter}</p>
                            </div>
                            </div>
                        </div>`);
                })
            })
        },
        addComment() {
            const data = {
                avatar: this.UserAvatar,
                author: this.commentUsername,
                comment: this.commentBody,
                note: document.querySelector('input[name="rate"]').value
            };

            if (this.commentBody.length < 1) return;

            // Send comment to API
            axios
            .post(this.addressServer+"/api/livre/addComment", { userData: this.userData, reference: this.bookRef, note: this.rate, comment: data.comment })
            .then((response) => {
                if (response.status === 200) {
                    // On ajoute le commentaire au front
                    this.getComments();
                }
            })
            .catch((response) => {
                console.error(response.message);
            })
        }
    }
}
</script>