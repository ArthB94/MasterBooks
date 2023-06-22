// import { createRouter, createWebHashHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

// const routes = [
//   {
//     path: '/',
//     name: 'home',
//     component: HomeView
//   },
//   {
//     path: '/about',
//     name: 'about',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
//   },
//   {
//     path: '/login',
//     name: 'login',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
//   },
//   {
//     path: '/calendar',
//     name: 'calendar',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () => import(/* webpackChunkName: "about" */ '../views/CalendarView.vue')
//   }
// ]

// const router = createRouter({
//   history: createWebHashHistory(),
//   routes
// })

// export default router
import { createWebHistory, createRouter } from "vue-router";
import HelloWorld from "@/views/HelloWorld.vue";
import LandingPage from "@/views/LandingPage.vue";
import Login from "@/views/Login.vue";
import LoginFgPwd from "@/views/LoginFgPwd.vue";
import Register from "@/views/Register.vue";
import ForgotPwd from "@/views/ForgotPwd.vue";
import ResetPwd from "@/views/ResetPwd.vue";
import EntryForm from "@/views/RequestForm.vue";
import BookInfoPage from "@/views/BookInfoPage.vue";
import EntryForm2 from "@/views/AddBookPage.vue";
import CatalogPage from "@/views/CatalogPage.vue";
import CatalogPageAdmin from "@/views/CatalogPage_Admin.vue";
import HelpPage from "@/views/HelpPage.vue";
import ProfilePage from "@/views/UserProfilePage.vue";
import CatalogLibraryPage from "@/views/CatalogPage_Mylib.vue";
import CatalogPageRecs from "@/views/CatalogPage_Recs.vue";

const routes = [
  {
    path: "/",
    name: "HelloWorld'",
    component: HelloWorld,
  },
  {
    path: "/landing-page",
    name: "LandingPage",
    component: LandingPage,
  },
  {
    path: "/login-page",
    name: "LoginPage",
    component: Login,
  },
  {
    path: "/login-Fg-Pwd-page",
    name: "LoginFgPwdPage",
    component: LoginFgPwd,
  },
  {
    path: "/register-page",
    name: "RegisterPage",
    component: Register,
  },
  {
    path: "/fgpassword-page",
    name: "ForgotPwdPage",
    component: ForgotPwd,
  },
  {
    path: "/reset-password-page",
    name: "ResetPwdPage",
    component: ResetPwd,
  },
  {
    path: "/entry-form-page",
    name: "EntryFormPage",
    component: EntryForm,
  },
  {
    path: "/book-info-page",
    name: "BookInfoPage",
    component: BookInfoPage,
  },
  {
    path: "/entry-form2-page",
    name: "EntryFormPage2",
    component: EntryForm2,
  },
  {
    path: "/catalog-page",
    name: "CatalogPage",
    component: CatalogPage,
  },
  {
    path: "/catalog-library-page",
    name: "CatalogLibraryPage",
    component: CatalogLibraryPage,
  },
  {
    path: "/catalog-admin-page",
    name: "CatalogPageAdmin",
    component: CatalogPageAdmin,
  },
  {
    path: "/help-page",
    name: "HelpPage",
    component: HelpPage,
  },
  {
    path: "/profile-page",
    name: "ProfilePage",
    component: ProfilePage,
  },
  {
    path: "/catalog-recs-page",
    name: "CatalogPageRecs",
    component: CatalogPageRecs,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;