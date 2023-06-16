<template>
    <body>


        <header>
            <div class="headernav">
                <div class="header-container">
                    <div class="header-image">
                        <img alt="Vue logo" src="../assets/logo_book1.png" class="VueLogo" />
                    </div>
                </div>
                <div class="Navbar">
                    <router-link to="/catalog-page" class="to-page-nav">Book catalog</router-link>
                    <router-link to="/catalog-library-page" class="to-page-nav">My Library</router-link>
                    <router-link to="/catalog-admin-page" class="to-page-nav">Recommendations</router-link>
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
                                <div class="filters">
                                    <label class="task-container" v-for = "genre in genres" :key = "genre" >{{ genre }}
                                        <input type="checkbox" :value = genre  v-model="selectedGenres"/>
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
                                        <input type="checkbox" :value = "language" v-model="selectedLanguages"/>
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
                                        <input type="checkbox" :value = "numberOfPage" v-model="selectedNumberOfPages"/>
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
                                        <input type="checkbox" :value="parutionYear" v-model="selectedParutionYears"/>
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
                        <form action="">
                            <input type="text" placeholder="Search.." v-model="searchBar" name="search" id="search-bar" >
                            <button type="submit"><font-awesome-icon icon="fa-solid fa-magnifying-glass"  /></button>
                        </form>
                    </div>
                    <div class="lib-button-container" v-if="MyLibrary">
                        <div><font-awesome-icon icon="fa-regular fa-heart" /></div>
                        <div><font-awesome-icon icon="fa-regular fa-bookmark" /></div>
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
                            <button type="submit"><font-awesome-icon icon="fa-solid fa-magnifying-glass" /></button>
                        </form>
                    </div>
                    <div class="lib-button-container" v-if="MyLibrary">
                        <div><font-awesome-icon icon="fa-regular fa-heart" /></div>
                        <div><font-awesome-icon icon="fa-regular fa-bookmark" /></div>
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
                    <div class="book-catalog-container"  >
                        <router-link to="/book-page"  v-for="book in  filteredBooks.slice(selectedPage*nbBooksPerPage,(selectedPage+1)*nbBooksPerPage)"  :key = "books.indexOf(book)" :class="[isAdmin ? 'book-page-link1' : 'book-page-link']">
                            <button  v-if="isAdmin" :id="'CloseTask-' + book" class="CloseTask" @click.prevent="OpenDeleteBook(book)">
                                <font-awesome-icon icon="fa-solid fa-plus" size="sm" style="transform:rotate(45deg); margin-left: 15px;" />
                            </button>
                            <div class="book">
                                <div>
                                    <img :src="require('@/assets/'+book.image)" alt="book_pic" class="book-cover">
                                </div>
                                <div class="book-title">{{book.title }}</div>
                                <div class="book-specs">{{+book.parutionYear+" "+book.genre+" "+ book.numberOfPages+" p. "+book.language}}</div>
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
                                <div class="message"> {{ message }}</div>
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
import ListePage from "../components/CatalogPage/ListePage.vue";
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
            selectedPage: 0,
            nbTotalBooks: 100,
            searchBar: "",
            books: [],

            //filtres
            genres:["Action","Horror","Romance","Sci-fi"],
            selectedGenres:[],
            languages:["English","French","Arabic","German"],
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
            return this.$route.meta.MyLibrary
        },
        isAdmin() {
            return this.$route.meta.isAdmin;
        },

        filteredBooks(){
            let books = this.books;
            if (this.searchBar != "") {
                books = books.filter(book => book.title.toLowerCase().includes(this.searchBar.toLowerCase()));
            }
            if(this.selectedGenres.length > 0){
                books = books.filter(book => this.selectedGenres.includes(book.genre));
            }
            if(this.selectedLanguages.length > 0){
                books = books.filter(book => this.selectedLanguages.includes(book.language));
            }
            
            if(this.selectedNumberOfPages.length > 0){
                let books1 = [];
                if(this.selectedNumberOfPages.includes("Under 100")){
                    books1 = books1.concat(books.filter(book => book.numberOfPages < 100));
                }
                if(this.selectedNumberOfPages.includes("100 ~ 500")){
                    books1 = books1.concat(books.filter(book => book.numberOfPages >= 100 && book.numberOfPages < 500));
                }
                if(this.selectedNumberOfPages.includes("500 ~ 1000")){
                    books1 = books1.concat(books.filter(book => book.numberOfPages >= 500 && book.numberOfPages < 1000));
                }
                if(this.selectedNumberOfPages.includes("Over 1000")){
                    books1 = books1.concat(books.filter(book => book.numberOfPages >= 1000));
                }
                books = books1;
            }
            if(this.selectedParutionYears.length > 0){
                let books1 = [];
                if(this.selectedParutionYears.includes("Before 1980")){
                    books1 = books1.concat(books.filter(book => book.parutionYear < 1980));
                }
                if(this.selectedParutionYears.includes("1980 ~ 2000")){
                    books1 = books1.concat(books.filter(book => book.parutionYear >= 1980 && book.parutionYear < 2000));
                }
                if(this.selectedParutionYears.includes("2000 ~ 2010")){
                    books1 = books1.concat(books.filter(book => book.parutionYear >= 2000 && book.parutionYear < 2010));
                }
                if(this.selectedParutionYears.includes("2010 ~ 2020")){
                    books1 = books1.concat(books.filter(book => book.parutionYear >= 2010 && book.parutionYear < 2020));
                }
                books = books1;
            }
            return books;
        }






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
            this.selectedPage = Math.floor(firstBook/this.nbBooksPerPage);
            console.log(window.innerWidth);
        },
        // permet de définir le nombre de livre par page en fonction de la taille de la page
        getNbBooksPerPage() {
            if (window.innerWidth <= 1000) {
                return 4;
            } else {
                return 16;
            }
        },
        // permet de créer un tableau de la taille du nombre de livre (juste pour les tests)
        getBooks() {
            var books = [];
            let genres = this.genres;
            let languages = this.languages;
            for (var i = 0; i < this.nbTotalBooks; i++) {
                let genre = genres[Math.floor(Math.random() * genres.length)];
                let language = languages[Math.floor(Math.random() * languages.length)];
                let numberOfPages = Math.floor(Math.random() * 1500);
                let parutionYear = Math.floor(Math.random() * 100) + 1970;
                let book = {
                    title: "Book " + (i+1),
                    specs: "Author " + (i+1) ,
                    image: "Book_example.jpg",
                    genre: genre,
                    language: language,
                    parutionYear: parutionYear,
                    numberOfPages: numberOfPages,
                    
                }
                books.push(book);
            }
            return books;
        },
    },


    mounted() {
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
        
        this.books = this.getBooks();
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.handleWindowResize);
    },
    


}
</script>