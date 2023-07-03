<template>
    <body>
        <header>
            <div class="headernav">
                <div class="header-container">
                    <div class="header-image">
                        <div class="logo-nav"></div>
                    </div>
                </div>
                <div class="Navbar">
                    <router-link to="/catalog-page" class="to-page-nav" >Book catalog</router-link>
                    <router-link to="/catalog-library-page" class="to-page-nav" @click="this.$route.path === '/catalog-library-page' ? resetMylibrary() : null">My Library</router-link>
                    <router-link to="/catalog-recs-page" class="to-page-nav" >Recommendations</router-link>
                </div>
                <UserMenu></UserMenu>
                <div class="light">
                    <DarkLightMode></DarkLightMode>
                </div>
            </div>
        </header>
        <a id="top"></a>
        <div class="catalog-page">
            <div class="filterblock-container">
                <div :class="[MyLibrary ? 'filter-title-container1' : 'filter-title-container']" >
                    <p class="filter-main-Title">Filters</p>
                </div>
                <div :class="[MyLibrary ? 'filter-container1' : 'filter-container']">
                    <div class="filters-list">
                        <ul>
                            <li class="filters-list-li">
                                <div class="filter-title">
                                    Genre
                                </div>
                                <div class="filters" >
                                    <label class="task-container"  v-for = "genre in genres" :key = "genre" >{{ genre.genre }}
                                        <input type="checkbox" :value = genre.genre_id  v-model="selectedGenres" @change="getFilteredBooks()"/>
                                        <span class="checkmark"></span>
                                    </label>                             
                                </div>
                            </li>
                            <li class="filters-list-li">
                                <div class="filter-title">
                                    Language
                                </div>
                                <div class="filters">
                                    <label class="task-container" v-for = "language in languages" :key = language>{{language}}
                                        <input type="checkbox" :value = "language" v-model="selectedLanguages" @change="getFilteredBooks()"/>
                                        <span class="checkmark"></span>
                                    </label>
                                </div>
                            </li>
                            <li class="filters-list-li">
                                <div class="filter-title">
                                    Number of pages
                                </div>
                                <div class="filters">
                                    <label class="task-container" v-for = "numberOfPage in numberOfPages" :key = "numberOfPage"> {{numberOfPage}}
                                        <input type="checkbox" :value = "numberOfPage" v-model="selectedNumberOfPages" @change="getFilteredBooks()"/>
                                        <span class="checkmark"></span>
                                    </label>
                                </div>
                            </li>
                            <li class="filters-list-li">
                                <div class="filter-title">
                                    Parution year
                                </div>
                                <div class="filters">
                                    <label class="task-container" v-for="parutionYear in parutionYears " :key = "parutionYear">{{parutionYear}}
                                        <input type="checkbox" :value="parutionYear" v-model="selectedParutionYears" @change="getFilteredBooks()"/>
                                        <span class="checkmark"></span>
                                    </label>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="search-and-book-container">
                <div class="search-container">
                    <div class="search-bar-container" id="first-searchy-bar">
                        <input type="text" placeholder="Search.." v-model="searchBar" name="search" id="search-bar" @keyup.enter="getFilteredBooks()" >
                        <div  @click="getFilteredBooks()" ><font-awesome-icon icon="fa-solid fa-magnifying-glass"  /></div>

                    </div>
                    <div class="lib-button-container" v-if="MyLibrary">
                        <div @click="liked = true; read = false ;getFilteredBooks()"><font-awesome-icon v-bind:icon=" liked?'fa-solid fa-heart':'fa-regular fa-heart'" /></div>
                        <div @click="read = true; liked = false;getFilteredBooks()"><font-awesome-icon v-bind:icon=" read?'fa-solid fa-bookmark':'fa-solid fa-bookmark'"  /></div>
                    </div>
                    <div class="page-turner">
                        <p class="page">Page</p>
                        <font-awesome-icon icon="fa-solid fa-angle-left" class="arrow-left-calendar"
                            @click="ChangePage(-1)" />
                        
                        <ListePage class="custom-select" v-model:selected-page="selectedPage" v-model:nb-pages="nbPages" />
                        
                        <font-awesome-icon icon="fa-solid fa-angle-right" class="arrow-left-calendar"
                            @click="ChangePage(+1)" />
                    </div>
                </div>
                <div class="search-container-fixe hide" id="search-container-fixe">
                    <div class="search-bar-container">
                        <form action="">
                            <input type="text" placeholder="Search.." name="search">
                            <div  @click="getFilteredBooks()"><font-awesome-icon icon="fa-solid fa-magnifying-glass"  /></div>
                        </form>
                    </div>
                    <div class="lib-button-container" v-if="MyLibrary">
                        <div @click="liked = true; read = false ;getFilteredBooks()"><font-awesome-icon icon="fa-regular fa-heart" /></div>
                        <div @click="read = true; liked = false;getFilteredBooks()"><font-awesome-icon icon="fa-regular fa-bookmark" /></div>
                    </div>
                    <div class="page-turner">
                        <p class="page">Page</p>
                        <font-awesome-icon icon="fa-solid fa-angle-left" class="arrow-left-calendar"
                            @click="ChangePage(-1)" />
                        
                        <ListePage class="custom-select" v-model:selected-page="selectedPage" v-model:nb-pages="nbPages" />
                        
                        <font-awesome-icon icon="fa-solid fa-angle-right" class="arrow-left-calendar"
                            @click="ChangePage(+1)" />
                    </div>
                </div>


                <div class="book-counter-container">

                    <!--------------------si l'utilisateur est un admin, on affiche le bouton de suppression et le css de admin-->
                    <div :class="[recomandations ?'book-catalog-container1' :'book-catalog-container']"  >
                        <router-link v-for="book in  filteredBooks.slice(selectedPage*(nbBooksPerPage - booksNotVisible),(selectedPage+1)*nbBooksPerPage)"  :key = "books.indexOf(book)" :class="[isAdmin ? 'book-page-link1' : (recomandations ? 'book-page-link2' : 'book-page-link')]"  :to="{ path: 'book-page', query: { ref: book.reference }}">
                            <button  v-if="isAdmin" :id="'CloseTask-' + book" class="CloseTask" @click.prevent="OpenDeleteBook(book)">
                                <font-awesome-icon icon="fa-solid fa-plus" size="sm" style="transform:rotate(45deg); margin-left: 15px;" />
                            </button>
                            <div class="book-rec-score" v-if="recomandations">
                                <div class="number-score">{{ book.Pourcentage}}%</div>
                                <div><font-awesome-icon icon="fa-regular fa-heart" /></div>
                            </div>
                            <div  :class="[recomandations ? 'book1' : 'book']" >
                                <div>
                                    <!-- <img :src="require('@/assets/'+book.image_src)" alt="book_pic" class="book-cover"> -->
                                    <img :src="'http://129.151.226.75:8080/' + book.image_src" alt="book_pic" class="book-cover">
                                </div>
                                <div class="book-title"> {{ (book.titre.length > 20 && isAdmin) ? book.titre.substring(0, 20) + "..." : book.titre }} </div>
                                <div class="book-specs">{{book.auteur+", "+book.date_parution}}</div>

                                <div class="book-descript" v-if="!isAdmin">
                                    <div class="dis-nb-page"> 
                                        {{book.langue}}
                                    </div>
                                    <div class="dis-nb-page">
                                        , {{book.pages}}p
                                    </div>
                                        . {{ book.genres[0].genre }}
                                        <span v-if="book.genres.length > 1">
                                            , {{ book.genres[1].genre }}
                                        </span>
                                </div>
                                <div class="book-specs" v-if="isAdmin">
                                        id: {{book.reference}}
                                </div>

                            
                            </div>
                        </router-link>
                    </div>

                    <div class="page-turner">
                        <p class="page">Page</p>
                        <font-awesome-icon icon="fa-solid fa-angle-left" class="arrow-left-calendar"
                            @click="ChangePage(-1)" />
                        
                        <ListePage class="custom-select" v-model:selected-page="selectedPage" v-model:nb-pages="nbPages" />
                        
                        <font-awesome-icon icon="fa-solid fa-angle-right" class="arrow-left-calendar"
                            @click="ChangePage(+1)" />
                    </div>
                    <div id="myModalDeleteBook" class="modal">
                        <!-- Modal content -->
                        <div class="modal-content">
                            <span class="close" @click='CloseDeleteBook'>&times;</span>
                            <h1 class="modal-Title">Delete Book</h1>
                            <div class="modal-center">
                                <p style="margin-top: 50px;">Are you sure you want to delete this Book ?</p>
                                <div class="message"> {{"" /*message */}}</div>
                                <div class="delete-list-button">
                                    <div class="AddTaskInputBox no">
                                        <input class="close" type="submit" value="Cancel" name="submit"
                                            @click='CloseDeleteBook' />
                                    </div>
                                    <div class="AddTaskInputBox no">
                                        <input style="margin-left: 0px;" type="submit" value="Delete" name="submit"
                                            @click='DeleteBook()' />
                                    </div>
                                </div>
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
import ListePage from "../components/CatalogPage/ListePage.vue";
import axios from "axios";
export default {
    name: "CatalogPageAdmin",
    components: {
        DarkLightMode,
        UserMenu,
        ListePage,

    },

    // Definit les variables utilisées dans la page
    data() {
        return {

            nbBooksPerPage: this.getNbBooksPerPage(),
            booksNotVisible: this.getBooksNotVisible(),
            selectedPage: 0,
            nbTotalBooks: 100,
            searchBar: "",
            books: [],
            liked:false,
            read:false,

            //filtres
            genres:[],
            selectedGenres:[],
            languages:["English","French","Spanish","German","Others"],
            selectedLanguages:[],
            numberOfPages:["Under 100","100 ~ 500","500 ~ 1000","Over 1000"],
            selectedNumberOfPages:[],
            parutionYears:["Before 1980","1980 ~ 2000","2000 ~ 2010","2010 ~ 2020","After 2020"],
            selectedParutionYears:[],


        };
    },
    // Definit les variables calculées utilisées dans la page
    computed: {
        nbBooks() {
            return this.filteredBooks.length;
        },
        nbPages() {
            return Math.ceil(this.nbBooks / this.nbBooksPerPage);
        },
        MyLibrary() {
            if (this.$route.path == "/catalog-library-page") {
                return true;
            } else {
                return false;
            }

        },
        recomandations() {
            if (this.$route.path == "/catalog-recs-page") {
                return true;
            } else {
                return false;
            }
        },
        isAdmin() {
            console.log("isAdmin",JSON.parse(localStorage.getItem("isAdmin")))
            if( JSON.parse(localStorage.getItem("isAdmin"))){
                if (this.$route.path == "/catalog-admin-page") {
                    return true;
                } 
            }
            return false;
        },
        userData() {
            return JSON.parse(localStorage.getItem("userData"))
        },
        token() {
            return localStorage.getItem("token")
        },
        watchLiked() {
            if (this.MyLibrary && this.liked){
                return true;
            }
            else{
                return false;
            }
        },
        watchRead() {
            if (this.MyLibrary && this.read){
                return true;
            }
            else{
                return false;
            }
        },
        watchRecos() {
            if (this.recomandations){
                return true;
            }
            else{
                return false;
            }
        },
        // fonction de filtrage edes livres
        filteredBooks(){
            let books = this.books;
            // if (this.searchBar != "") {
            //     books = books.filter(book => book.titre.toLowerCase().includes(this.searchBar.toLowerCase()));
            // }
            // if(this.selectedGenres.length > 0){
            //     books = books.filter(book => this.selectedGenres.includes(book.genre));
            // }
            // if(this.selectedLanguages.length > 0){
            //     books = books.filter(book => this.selectedLanguages.includes(book.langue));
            // }
            
            // if(this.selectedNumberOfPages.length > 0){
            //     let books1 = [];
            //     if(this.selectedNumberOfPages.includes("Under 100")){
            //         books1 = books1.concat(books.filter(book => book.pages < 100));
            //     }
            //     if(this.selectedNumberOfPages.includes("100 ~ 500")){
            //         books1 = books1.concat(books.filter(book => book.pages >= 100 && book.pages < 500));
            //     }
            //     if(this.selectedNumberOfPages.includes("500 ~ 1000")){
            //         books1 = books1.concat(books.filter(book => book.pages >= 500 && book.pages < 1000));
            //     }
            //     if(this.selectedNumberOfPages.includes("Over 1000")){
            //         books1 = books1.concat(books.filter(book => book.pages >= 1000));
            //     }
            //     books = books1;
            // }
            // if(this.selectedParutionYears.length > 0){
            //     let books1 = [];
            //     if(this.selectedParutionYears.includes("Before 1980")){
            //         books1 = books1.concat(books.filter(book => book.date_parution < 1980));
            //     }
            //     if(this.selectedParutionYears.includes("1980 ~ 2000")){
            //         books1 = books1.concat(books.filter(book => book.date_parution >= 1980 && book.date_parution < 2000));
            //     }
            //     if(this.selectedParutionYears.includes("2000 ~ 2010")){
            //         books1 = books1.concat(books.filter(book => book.date_parution >= 2000 && book.date_parution < 2010));
            //     }
            //     if(this.selectedParutionYears.includes("2010 ~ 2020")){
            //         books1 = books1.concat(books.filter(book => book.date_parution >= 2010 && book.date_parution < 2020));
            //     }
            //     if(this.selectedParutionYears.includes("After 2020")){
            //         books1 = books1.concat(books.filter(book => book.date_parution >= 2020));
            //     }
            //     books = books1;
            // }
            return books;
        },

    },
    // Definit les méthodes utilisées dans la page
    methods: {

        // Permet d'afficher le pop up de suppression du livre
        OpenDeleteBook(book) {
            this.deleteBook = book;
            document.getElementById("myModalDeleteBook").style.display = "block";
        },

        // Permet de fermer le pop up de suppression du livre
        CloseDeleteBook() {
            document.getElementById("myModalDeleteBook").style.display = "none";
            console.log("close"+this.deleteBook);
        },

        // Permet de supprimer le livre selectionné
        DeleteBook() {
            this.deleteBookAPI(this.deleteBook.reference)
            this.books.splice(this.books.indexOf(this.deleteBook),1);
            this.nbBooks = this.books.length;
            this.CloseDeleteBook()
            console.log("deleted index = "+this.deleteBook);
        },
        // incremente ou décremente la page selectionnée
        ChangePage (value) {
            this.selectedPage += parseInt(value);
            if (this.selectedPage < 0) {
                this.selectedPage = 0;
            }
            if (this.selectedPage > this.nbPages - 1) {
                this.selectedPage = parseInt(this.nbPages - 1);
            }
        },
        // permet de faire des action dés que la page change de taille
        handleWindowResize() {
            let firstBook = this.selectedPage*this.nbBooksPerPage;
            this.nbBooksPerPage = this.getNbBooksPerPage();
            this.booksNotVisible = this.getBooksNotVisible();
            this.selectedPage = Math.floor(firstBook/this.nbBooksPerPage);
            console.log(window.innerWidth);
        },
        // permet de définir le nombre de livre par page en fonction de la taille de la page
        getNbBooksPerPage() {
            if (this.isAdmin){
                    if (window.innerWidth < 900) {
                        return 4;
                    } 
                    else if (window.innerWidth <= 1200) {
                        return 8;
                    }
                    else {
                        return 16;
                    }

            }else{
                if (window.innerWidth < 1000) {
                    return 4;
                } 
                else if (window.innerWidth <= 1100) {
                    return 8;
                }
                else {
                    return 16;
                }
            }
        },

        getBooksNotVisible() {
            if ( 1200 < window.innerWidth  && window.innerWidth < 1555) {
                console.log("4");
                return 4;
                
            } else {
                return 0;
            }
        },
        // permet de créer un tableau de la taille du nombre de livre (juste pour les tests)
        // getBooks() {
        //     var books = [];
        //     let genres = this.genres;
        //     let languages = this.languages;
        //     for (var i = 0; i < this.nbTotalBooks; i++) {
        //         let myGenres = [];
        //         for (var j = 0; j < Math.floor(Math.random() * genres.length) + 1; j++) {
        //             let genre = genres[Math.floor(Math.random() * genres.length)];
        //             if ( myGenres.includes(genre.genre_id) == false) {
        //                 myGenres.push(genre.genre_id);
        //             }
        //         }
        //         let language = languages[Math.floor(Math.random() * languages.length)];
        //         let numberOfPages = Math.floor(Math.random() * 1500);
        //         let parutionYear = Math.floor(Math.random() * 100) + 1970;
        //         let book = {
        //             titre: "Book " + (i+1),
        //             auteur: "Author " + (i+1) ,
        //             image_src: "Book_example.jpg",
        //             genres: myGenres,
        //             langue: language,
        //             date_parution: parutionYear,
        //             pages: numberOfPages,
        //             resume: "Cindy and Jim Green can't wait to start a family but can only dream about what their child would be like. When young Timothy shows up on their doorstep one stormy night, Cindy and Jim—and their small town of Stanleyville—learn that sometimes the unexpected can bring some of life's greatest gifts.",
        //             url: "https://www.imdb.com/title/tt1462769/?ref_=fn_al_tt_1",
        //         }
        //         books.push(book);
        //     }
        //     //console.log(books);
        //     return books;
        // },


        // -----------------------------------------------------------Communication avec l'API-----------------------------------------------------------
        
        // Permet d'ajouter des livres à l'API
        addBooks(newBooks){
            console.log("newBooks",newBooks);
            newBooks.forEach(book => {
                axios.post("http://129.151.226.75:8080/api/livre/store", book).then((response) => {
                    if (response.status === 200) {
                        return response.data;
                    } else {
                        console.log(new Error(JSON.stringify(response.data)));
                        throw new Error(JSON.stringify(response.data));
                    }
                })
            });  
        },
        
        
        // Permet de récupérer les livres de l'API
        
        async getAllGenres() {
            try {
                const response = await axios.get('http://129.151.226.75:8080/api/genre/all');
                const data = response.data;
                console.log("getAllGenres", data);
                this.genres = data;
            } catch (error) {
                console.error(error);
                throw error;
            }
        },

        async getFilteredBooks() {
            console.log("user data",JSON.parse(localStorage.getItem("userData")));           
            const filters = {
                token : this.token,
                texte: this.searchBar,
                genres: this.selectedGenres,
                langues: this.selectedLanguages,
                pages: this.selectedNumberOfPages,
                date_parution: this.selectedParutionYears,
                liked: this.watchLiked,
                read: this.watchRead,
                recomanded: this.watchRecos,  
            }
            console.log(filters);

            
            await axios.post("http://129.151.226.75:8080/api/livre/filter", filters).then((response) => {
                    if (response.status === 200) {
                        this.books = response.data;
                        this.selectedPage = 0
                        return response.data;
                    } else {
                        console.log(new Error(JSON.stringify(response.data)));
                        throw new Error(JSON.stringify(response.data));
                    }
                })
        },

        async deleteBookAPI(id) {
            await axios.delete("http://129.151.226.75:8080/api/livre/delete/" + id ,{  
                params: {
                    token:this.token
                }
            }).then((response) => {
                if (response.status === 200) {
                    this.books = this.books.filter((book) => book.reference !== id);
                    return response.data;
                } else {
                    console.log(new Error(JSON.stringify(response.data)));
                    throw new Error(JSON.stringify(response.data));
                }
            })
        },

        redirection() {
            if(this.$route.path === '/catalog-admin-page'){
                if (this.isAdmin) {
                    this.$router.push("/catalog-admin-page");
                } else {
                    this.$router.push("/catalog-page");
                }      
            }
        },
        resetMylibrary(){
            if (this.MyLibrary){
                this.liked = true;
                this.read = true;
            }
            this.getFilteredBooks()

        },

        async onMounted (){

            var thisID = document.getElementById("TopBtn");
            var SearchClass = document.getElementById("search-container-fixe");
            var myScrollFunc = function () {
                var y = window.scrollY;
                if (y >= 300) {
                    thisID.className = "fa fa-angle-double-up show";
                } else {
                    thisID.className = "fa fa-angle-double-up hide";
                }
            };
            var myScrollFunc1 = function () {
                var z = window.scrollY;
                if (z >= 315) {
                    SearchClass.className = "search-container search-container-fixe show";
                } else {
                    SearchClass.className = "search-container-fixe hide";
                }
            };
            window.addEventListener("scroll", myScrollFunc);
            window.addEventListener("scroll", myScrollFunc1);
            // permet de faire des action dés que la page change de taille
            window.addEventListener('resize', this.handleWindowResize);
            
            console.log(this.MyLibrary)
            if (this.MyLibrary){
                this.liked = true;
                this.read = true;
            }
            //récupére les genres et les livres dans la db
            await this.getAllGenres();
            await this.getFilteredBooks();
    
            
        },

    },

    watch: {
        $route(to) {
            if (to.path === '/catalog-admin-page' || to.path === '/catalog-page' || to.path === '/catalog-library-page' || to.path === '/catalog-recs-page') {
                if (this.MyLibrary){
                    this.liked = true;
                    this.read = true;
                }
                this.getFilteredBooks(); // Appeler la méthode mounted() manuellement
            }
        }
    },


    async mounted  ()  {
        this.redirection()
        await this.onMounted();
    },

    beforeUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
    },
}
</script>