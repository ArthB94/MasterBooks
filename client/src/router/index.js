
// export default router
import { createWebHistory, createRouter } from "vue-router";
import AddBookPage from "@/views/AddBookPage.vue";
import CatalogPageAdmin from "@/views/CatalogPage_Admin.vue";
import ForgotPwd from "@/views/ForgotPwd.vue";
import HelloWorld from "@/views/HelloWorld.vue";
import HelpPage from "@/views/HelpPage.vue";
import LandingPage from "@/views/LandingPage.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import ProfilePage from "@/views/UserProfilePage.vue";
// var userData = {email :"arthur.billebaut@efrei.net"}
const routes = [

  {
    path: "/add-book-page",
    name: "AddBookPage",
    component: AddBookPage,
  },
  {
    path: "/catalog-page",
    name: "CatalogPage",
    component: CatalogPageAdmin,
  },
  {
    path: "/catalog-library-page",
    name: "CatalogLibraryPage",
    component: CatalogPageAdmin,
  },
  {
    path: "/catalog-recs-page",
    name: "CatalogPageRecs",
    component: CatalogPageAdmin,
  },
  {
    path: "/catalog-admin-page",
    name: "CatalogPageAdmin",
    component: CatalogPageAdmin,
  },
  {
    path: "/fgpassword-page",
    name: "ForgotPwdPage",
    component: ForgotPwd,
  },
  {
    path: "/",
    name: "HelloWorld'",
    component: HelloWorld,
  },
  {
    path: "/help-page",
    name: "HelpPage",
    component: HelpPage,
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
    path: "/register-page",
    name: "RegisterPage",
    component: Register,
  },
  {
    path: "/profile-page",
    name: "ProfilePage",
    component: ProfilePage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;