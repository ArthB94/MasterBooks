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
                    <router-link to="/calendar-page" class="to-page-nav">Book catalog</router-link>
                    <router-link to="/catalog-library-page" class="to-page-nav">My Library</router-link>
                    <router-link to="/create-calendar-page" class="to-page-nav">Recommendations</router-link>
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
                <div class="filter-title-container">
                    <p class="filter-main-Title">Filters</p>
                </div>
                <div class="filter-container">

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
                            <input type="text" placeholder="Search.." name="search">
                            <button type="submit"><font-awesome-icon icon="fa-solid fa-magnifying-glass" /></button>
                        </form>
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
                <div class="search-container search-container-fixe hide" id="search-container-fixe">
                    <div class="search-bar-container">
                        <form action="">
                            <input type="text" placeholder="Search.." name="search">
                            <button type="submit"><font-awesome-icon icon="fa-solid fa-magnifying-glass" /></button>
                        </form>
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
                    <div class="book-catalog-container" v-if="isAdmin" >
                        <router-link to="/book-page"  v-for="book in  books.slice(selectedPage*nbBooksPerPage,(selectedPage+1)*nbBooksPerPage)" :key = "book" :id = "'Book-'+book" class="book-page-link1">
                            <button  :id="'CloseTask-' + book" class="CloseTask" @click.prevent="OpenDeleteBook(book)">
                                <font-awesome-icon icon="fa-solid fa-plus" size="sm" style="transform:rotate(45deg); margin-left: 15px;" />
                            </button>
                            <div class="book">
                                <div>
                                    <img src="..\assets\Book_example.jpg" alt="book_pic" class="book-cover">
                                </div>
                                <div class="book-title">Some girls do {{book +1}}</div>
                                <div class="book-specs">Jennifer Dugan, 2019</div>
                            </div>
                        </router-link>
                    </div>

                    <!----------- Sinon, on affiche pas le bouton et le css de base----------->
                    <div class="book-catalog-container" v-else>
                        <router-link to="/book-page" v-for="book in  books.slice(selectedPage*nbBooksPerPage,(selectedPage+1)*nbBooksPerPage)" :key = "book" :id = "'Book-'+book" class="book-page-link">
                            <div class="book">
                                <div>
                                    <img src="..\assets\Book_example.jpg" alt="book_pic" class="book-cover">
                                </div>
                                <div class="book-title">Some girls do {{book +1}}</div>
                                <div class="book-specs">Jennifer Dugan, 2019</div>
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
            nbBooks: 100,
            books : this.getBooks(),

            //filtres
            genres:["Action","Horror","Romance","Sci_fi"],
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
        nbPages() {
            return Math.ceil(this.nbBooks / this.nbBooksPerPage);
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
            
            this.books.splice(this.books.indexOf(this.deleteBook),1);
            this.nbBooks = this.books.length;
            this.CloseDeleteBook()
            console.log("deleted index = "+this.deleteBook);
        },




        // incremente ou décremente la page selectionnée
        ChangePage: function (value) {
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
        getBooks: function () {
            var books = [];
            for (var i = 0; i < this.nbBooks; i++) {
                books.push(i);
            }
            return books;
        },
    },


    mounted() {
        this.isAdmin = this.$route.meta.isAdmin;
        console.log("isAdmin =",this.isAdmin);
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