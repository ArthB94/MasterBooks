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
        <div class="catalog-page">
            <div class="filterblock-container">
                <div class="filter-title-container1">
                    <p class="filter-main-Title">Filters</p>
                </div>
                <div class="filter-container1">

                    <div class="filters-list">
                        <ul>

                            <li class="filters-list-li">
                                <div class="filter-title">
                                    Genre
                                </div>
                                <div class="filters">
                                    <label class="task-container">Action
                                        <input type="checkbox" />
                                        <span class="checkmark"></span>
                                    </label>
                                    <label class="task-container">Horror
                                        <input type="checkbox" />
                                        <span class="checkmark"></span>
                                    </label>
                                    <label class="task-container">Romance
                                        <input type="checkbox" />
                                        <span class="checkmark"></span>
                                    </label>
                                    <label class="task-container">Sci-fi
                                        <input type="checkbox" />
                                        <span class="checkmark"></span>
                                    </label>
                                </div>
                            </li>
                            <li class="filters-list-li">
                                <div class="filter-title">
                                    Language
                                </div>
                                <div class="filters">
                                    <label class="task-container">English
                                        <input type="checkbox" />
                                        <span class="checkmark"></span>
                                    </label>
                                    <label class="task-container">French
                                        <input type="checkbox" />
                                        <span class="checkmark"></span>
                                    </label>
                                    <label class="task-container">Arabic
                                        <input type="checkbox" />
                                        <span class="checkmark"></span>
                                    </label>
                                    <label class="task-container">German
                                        <input type="checkbox" />
                                        <span class="checkmark"></span>
                                    </label>
                                </div>
                            </li>
                            <li class="filters-list-li">


                                <div class="filter-title">
                                    Number of pages
                                </div>
                                <div class="filters">
                                    <label class="task-container"> Under 100
                                        <input type="checkbox" />
                                        <span class="checkmark"></span>
                                    </label>
                                    <label class="task-container">100 ~ 500
                                        <input type="checkbox" />
                                        <span class="checkmark"></span>
                                    </label>
                                    <label class="task-container">500 ~ 1000
                                        <input type="checkbox" />
                                        <span class="checkmark"></span>
                                    </label>
                                    <label class="task-container"> Over 1000
                                        <input type="checkbox" />
                                        <span class="checkmark"></span>
                                    </label>
                                </div>
                            </li>
                            <li class="filters-list-li">
                                <div class="filter-title">
                                    Parution year
                                </div>
                                <div class="filters">
                                    <label class="task-container">Before 1980
                                        <input type="checkbox" />
                                        <span class="checkmark"></span>
                                    </label>
                                    <label class="task-container">1980 ~ 2000
                                        <input type="checkbox" />
                                        <span class="checkmark"></span>
                                    </label>
                                    <label class="task-container">2000 ~ 2010
                                        <input type="checkbox" />
                                        <span class="checkmark"></span>
                                    </label>
                                    <label class="task-container">2010 ~ 2020
                                        <input type="checkbox" />
                                        <span class="checkmark"></span>
                                    </label>
                                    <label class="task-container">After 2020
                                        <input type="checkbox" />
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
                            <div><font-awesome-icon icon="fa-solid fa-magnifying-glass" /></div>
                        </form>
                    </div>
                    <div class="page-turner">
                        <p class="page">Page</p>
                        <font-awesome-icon icon="fa-solid fa-angle-left" class="arrow-left-calendar"
                            @click="ChangeWeek(-1)" />
                        <div class="custom-select">
                            <select>
                                <option value="0">1</option>
                                <option value="1">2</option>
                                <option value="2">3</option>
                                <option value="3">4</option>
                            </select>
                        </div>
                        <font-awesome-icon icon="fa-solid fa-angle-right" class="arrow-left-calendar"
                            @click="ChangeWeek(+1)" />
                    </div>
                </div>
                <div class="search-container-fixe hide" id="search-container-fixe">
                    <div class="search-bar-container">
                        <form action="">
                            <input type="text" placeholder="Search.." name="search">
                            <button type="submit"><font-awesome-icon icon="fa-solid fa-magnifying-glass" /></button>
                        </form>
                    </div>
                    <div class="page-turner">
                        <p class="page">Page</p>
                        <font-awesome-icon icon="fa-solid fa-angle-left" class="arrow-left-calendar"
                            @click="ChangeWeek(-1)" />
                        <div class="custom-select">
                            <select>
                                <option value="0">1</option>
                                <option value="1">2</option>
                                <option value="2">3</option>
                                <option value="3">4</option>
                            </select>
                        </div>
                        <font-awesome-icon icon="fa-solid fa-angle-right" class="arrow-left-calendar"
                            @click="ChangeWeek(+1)" />
                    </div>
                </div>
                <!-- <div class="custom-select">
                                <select>
                                    <option value="0">Order By :</option>
                                    <option value="1">A-Z Title</option>
                                    <option value="2">Z-A Title</option>
                                    <option value="3">A-Z Author</option>
                                    <option value="4">Z-A Author</option>
                                </select>
                            </div> -->
                <div class="book-counter-container">
                    <div class="book-catalog-container1">
                        <router-link to="/book-page" class="book-page-link2">
                            <div class="book-rec-score">
                                <div class="number-score">98%</div>
                                <div><font-awesome-icon icon="fa-regular fa-heart" /></div>
                            </div>
                            <div class="book1">
                                <div>
                                    <img src="..\assets\Book_example.jpg" alt="book_pic" class="book-cover">
                                </div>
                                <div class="book-title">Some girls do</div>
                                <div class="book-specs">Jennifer Dugan, 2019</div>
                            </div>
                        </router-link>
                        <router-link to="/book-page" class="book-page-link2">
                            <div class="book-rec-score">
                                <div class="number-score">81%</div>
                                <div><font-awesome-icon icon="fa-regular fa-heart" /></div>
                            </div>
                            <div class="book1">
                                <div>
                                    <img src="..\assets\Book_example.jpg" alt="book_pic" class="book-cover">
                                </div>
                                <div class="book-title">Some girls do</div>
                                <div class="book-specs">Jennifer Dugan, 2019</div>
                            </div>
                        </router-link>
                        <router-link to="/book-page" class="book-page-link2">
                            <div class="book-rec-score">
                                <div class="number-score">80%</div>
                                <div><font-awesome-icon icon="fa-regular fa-heart" /></div>
                            </div>
                            <div class="book1">
                                <div>
                                    <img src="..\assets\Book_example.jpg" alt="book_pic" class="book-cover">
                                </div>
                                <div class="book-title">Some girls do</div>
                                <div class="book-specs">Jennifer Dugan, 2019</div>
                            </div>
                        </router-link>
                        <router-link to="/book-page" class="book-page-link2">
                            <div class="book-rec-score">
                                <div class="number-score">68%</div>
                                <div><font-awesome-icon icon="fa-regular fa-heart" /></div>
                            </div>
                            <div class="book1">
                                <div>
                                    <img src="..\assets\Book_example.jpg" alt="book_pic" class="book-cover">
                                </div>
                                <div class="book-title">Some girls do</div>
                                <div class="book-specs">Jennifer Dugan, 2019</div>
                            </div>
                        </router-link>
                        <router-link to="/book-page" class="book-page-link2">
                            <div class="book-rec-score">
                                <div class="number-score">58%</div>
                                <div><font-awesome-icon icon="fa-regular fa-heart" /></div>
                            </div>
                            <div class="book1">
                                <div>
                                    <img src="..\assets\Book_example.jpg" alt="book_pic" class="book-cover">
                                </div>
                                <div class="book-title">Some girls do</div>
                                <div class="book-specs">Jennifer Dugan, 2019</div>
                            </div>
                        </router-link>
                        <router-link to="/book-page" class="book-page-link2">
                            <div class="book-rec-score">
                                <div class="number-score">35%</div>
                                <div><font-awesome-icon icon="fa-regular fa-heart" /></div>
                            </div>
                            <div class="book1">
                                <div>
                                    <img src="..\assets\Book_example.jpg" alt="book_pic" class="book-cover">
                                </div>
                                <div class="book-title">Some girls do</div>
                                <div class="book-specs">Jennifer Dugan, 2019</div>
                            </div>
                        </router-link>
                        <router-link to="/book-page" class="book-page-link2">
                            <div class="book-rec-score">
                                <div class="number-score">28%</div>
                                <div><font-awesome-icon icon="fa-regular fa-heart" /></div>
                            </div>
                            <div class="book1">
                                <div>
                                    <img src="..\assets\Book_example.jpg" alt="book_pic" class="book-cover">
                                </div>
                                <div class="book-title">Some girls do</div>
                                <div class="book-specs">Jennifer Dugan, 2019</div>
                            </div>
                        </router-link>
                        <router-link to="/book-page" class="book-page-link2">
                            <div class="book-rec-score">
                                <div class="number-score">27%</div>
                                <div><font-awesome-icon icon="fa-regular fa-heart" /></div>
                            </div>
                            <div class="book1">
                                <div>
                                    <img src="..\assets\Book_example.jpg" alt="book_pic" class="book-cover">
                                </div>
                                <div class="book-title">Some girls do</div>
                                <div class="book-specs">Jennifer Dugan, 2019</div>
                            </div>
                        </router-link>
                        <router-link to="/book-page" class="book-page-link2">
                            <div class="book-rec-score">
                                <div class="number-score">98%</div>
                                <div><font-awesome-icon icon="fa-regular fa-heart" /></div>
                            </div>
                            <div class="book1">
                                <div>
                                    <img src="..\assets\Book_example.jpg" alt="book_pic" class="book-cover">
                                </div>
                                <div class="book-title">Some girls do</div>
                                <div class="book-specs">Jennifer Dugan, 2019</div>
                            </div>
                        </router-link>
                        <router-link to="/book-page" class="book-page-link2">
                            <div class="book-rec-score">
                                <div class="number-score">98%</div>
                                <div><font-awesome-icon icon="fa-regular fa-heart" /></div>
                            </div>
                            <div class="book1">
                                <div>
                                    <img src="..\assets\Book_example.jpg" alt="book_pic" class="book-cover">
                                </div>
                                <div class="book-title">Some girls do</div>
                                <div class="book-specs">Jennifer Dugan, 2019</div>
                            </div>
                        </router-link>
                        <router-link to="/book-page" class="book-page-link2">
                            <div class="book-rec-score">
                                <div class="number-score">98%</div>
                                <div><font-awesome-icon icon="fa-regular fa-heart" /></div>
                            </div>
                            <div class="book1">
                                <div>
                                    <img src="..\assets\Book_example.jpg" alt="book_pic" class="book-cover">
                                </div>
                                <div class="book-title">Some girls do</div>
                                <div class="book-specs">Jennifer Dugan, 2019</div>
                            </div>
                        </router-link>
                        <router-link to="/book-page" class="book-page-link2">
                            <div class="book-rec-score">
                                <div class="number-score">98%</div>
                                <div><font-awesome-icon icon="fa-regular fa-heart" /></div>
                            </div>
                            <div class="book1">
                                <div>
                                    <img src="..\assets\Book_example.jpg" alt="book_pic" class="book-cover">
                                </div>
                                <div class="book-title">Some girls do</div>
                                <div class="book-specs">Jennifer Dugan, 2019</div>
                            </div>
                        </router-link>
                        <router-link to="/book-page" class="book-page-link2">
                            <div class="book-rec-score">
                                <div class="number-score">98%</div>
                                <div><font-awesome-icon icon="fa-regular fa-heart" /></div>
                            </div>
                            <div class="book1">
                                <div>
                                    <img src="..\assets\Book_example.jpg" alt="book_pic" class="book-cover">
                                </div>
                                <div class="book-title">Some girls do</div>
                                <div class="book-specs">Jennifer Dugan, 2019</div>
                            </div>
                        </router-link>
                        <router-link to="/book-page" class="book-page-link2">
                            <div class="book-rec-score">
                                <div class="number-score">98%</div>
                                <div><font-awesome-icon icon="fa-regular fa-heart" /></div>
                            </div>
                            <div class="book1">
                                <div>
                                    <img src="..\assets\Book_example.jpg" alt="book_pic" class="book-cover">
                                </div>
                                <div class="book-title">Some girls do</div>
                                <div class="book-specs">Jennifer Dugan, 2019</div>
                            </div>
                        </router-link>
                        <router-link to="/book-page" class="book-page-link2">
                            <div class="book-rec-score">
                                <div class="number-score">98%</div>
                                <div><font-awesome-icon icon="fa-regular fa-heart" /></div>
                            </div>
                            <div class="book1">
                                <div>
                                    <img src="..\assets\Book_example.jpg" alt="book_pic" class="book-cover">
                                </div>
                                <div class="book-title">Some girls do</div>
                                <div class="book-specs">Jennifer Dugan, 2019</div>
                            </div>
                        </router-link>
                        <router-link to="/book-page" class="book-page-link2">
                            <div class="book-rec-score">
                                <div class="number-score">98%</div>
                                <div><font-awesome-icon icon="fa-regular fa-heart" /></div>
                            </div>
                            <div class="book1">
                                <div>
                                    <img src="..\assets\Book_example.jpg" alt="book_pic" class="book-cover">
                                </div>
                                <div class="book-title">Some girls do</div>
                                <div class="book-specs">Jennifer Dugan, 2019</div>
                            </div>
                        </router-link>
                        <router-link to="/book-page" class="book-page-link2">
                            <div class="book-rec-score">
                                <div class="number-score">98%</div>
                                <div><font-awesome-icon icon="fa-regular fa-heart" /></div>
                            </div>
                            <div class="book1">
                                <div>
                                    <img src="..\assets\Book_example.jpg" alt="book_pic" class="book-cover">
                                </div>
                                <div class="book-title">Some girls do</div>
                                <div class="book-specs">Jennifer Dugan, 2019</div>
                            </div>
                        </router-link>
                        <router-link to="/book-page" class="book-page-link2">
                            <div class="book-rec-score">
                                <div class="number-score">98%</div>
                                <div><font-awesome-icon icon="fa-regular fa-heart" /></div>
                            </div>
                            <div class="book1">
                                <div>
                                    <img src="..\assets\Book_example.jpg" alt="book_pic" class="book-cover">
                                </div>
                                <div class="book-title">Some girls do</div>
                                <div class="book-specs">Jennifer Dugan, 2019</div>
                            </div>
                        </router-link>
                        <router-link to="/book-page" class="book-page-link2">
                            <div class="book-rec-score">
                                <div class="number-score">98%</div>
                                <div><font-awesome-icon icon="fa-regular fa-heart" /></div>
                            </div>
                            <div class="book1">
                                <div>
                                    <img src="..\assets\Book_example.jpg" alt="book_pic" class="book-cover">
                                </div>
                                <div class="book-title">Some girls do</div>
                                <div class="book-specs">Jennifer Dugan, 2019</div>
                            </div>
                        </router-link>
                        <router-link to="/book-page" class="book-page-link2">
                            <div class="book-rec-score">
                                <div class="number-score">98%</div>
                                <div><font-awesome-icon icon="fa-regular fa-heart" /></div>
                            </div>
                            <div class="book1">
                                <div>
                                    <img src="..\assets\Book_example.jpg" alt="book_pic" class="book-cover">
                                </div>
                                <div class="book-title">Some girls do</div>
                                <div class="book-specs">Jennifer Dugan, 2019</div>
                            </div>
                        </router-link>
                    </div>
                    <div class="page-turner">
                        <p class="page">Page</p>
                        <font-awesome-icon icon="fa-solid fa-angle-left" class="arrow-left-calendar"
                            @click="ChangeWeek(-1)" />
                        <div class="custom-select">
                            <select>
                                <option value="0">1</option>
                                <option value="1">2</option>
                                <option value="2">3</option>
                                <option value="3">25</option>
                            </select>
                        </div>
                        <font-awesome-icon icon="fa-solid fa-angle-right" class="arrow-left-calendar"
                            @click="ChangeWeek(+1)" />
                    </div>
                    <div id="myModalDeleteTask" class="modal">
                        <!-- Modal content -->
                        <div class="modal-content">
                            <span class="close" @click='CloseDeleteTask'>&times;</span>
                            <h1 class="modal-Title">Delete Book</h1>
                            <div class="modal-center">
                                <p style="margin-top: 50px;">Are you sure you want to delete this Book ?</p>
                                <div class="message"> {{ message }}</div>
                                <div class="delete-list-button">
                                    <div class="AddTaskInputBox no">
                                        <input class="close" type="submit" value="Cancel" name="submit"
                                            @click='CloseDeleteTask' />
                                    </div>
                                    <div class="AddTaskInputBox no">
                                        <input style="margin-left: 0px;" type="submit" value="Delete" name="submit"
                                            @click='DeleteTask' />
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
export default {
    name: "CatalogPageRecs",
    components: {
        DarkLightMode,
        UserMenu
    },
    mounted() {
        var thisID = document.getElementById("TopBtn");
        var SearchClass = document.getElementById("search-container-fixe");
        // Get a reference to the element
        var element = document.getElementById("first-searchy-bar");

        // // Extract the position values
        // var position = {
        //     top: rect.top,
        //     left: rect.left,
        //     right: rect.right,
        //     bottom: rect.bottom,
        //     width: rect.width,
        //     height: rect.height
        // };

        var myScrollFunc = function () {
            var y = window.scrollY;
            if (y >= 300) {
                thisID.className = "fa fa-angle-double-up show";
            } else {
                thisID.className = "fa fa-angle-double-up hide";
            }
        };
        window.addEventListener("scroll", myScrollFunc);
        window.addEventListener("scroll", function () {
            // Get the position of the target element
            var elementPosition = element.getBoundingClientRect();

            // Check if the top of the element is above the viewport
            if (elementPosition.top < 0) {
                // Get the position of the element relative to the viewport
                SearchClass.className = "search-container search-container-fixe show";
            } else {
                SearchClass.className = "search-container-fixe hide";
            }
        })

        // window.addEventListener("scroll", myScrollFunc1);
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