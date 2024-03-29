
// export default router
import { createWebHistory, createRouter } from "vue-router";
import AddBookPage from "@/views/AddBookPage.vue";
import BookInfoPage from "@/views/BookInfoPage.vue";
import CatalogPageAdmin from "@/views/CatalogPage_Admin.vue";
import EpubReaderPage from "@/views/EpubReader1.vue";
import ForgotPwd from "@/views/ForgotPwd.vue";
import HelloWorld from "@/views/HelloWorld.vue";
import HelpPage from "@/views/HelpPage.vue";
import LandingPage from "@/views/LandingPage.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import RequestForm from "@/views/RequestForm.vue"
import ResetPassword from "@/views/ResetPassword.vue";
import ResetPwd from "@/views/ResetPwd.vue";
import ProfilePage from "@/views/UserProfilePage.vue";

const routes = [

  {
    path: "/add-book-page",
    name: "AddBookPage",
    component: AddBookPage,
  },
  {
    path: "/book-page",
    name: "BookInfoPag",
    component: BookInfoPage
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
    path: "/book-read-page",
    name: "EpubReaderPage",
    component: EpubReaderPage,
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
    path: "/request-page",
    name: "requestPage",
    component: RequestForm,
  },
  {
    path: "/reset-password-page",
    name: "ResetPasswordPage",
    component: ResetPassword,
  },
  {
    path: "/reset-pwd-page",
    name: "ResetPwdPage",
    component: ResetPwd,
  },
  {
    path: "/profile-page",
    name: "ProfilePage",
    component: ProfilePage,
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/landing-page'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
// Permet de vérifier si l'utilisateur est connecté, si il ne l'est pas, il est redirigé vers la page de connexion
router.beforeEach((to, from, next) => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  console.log("userdata  ",userData);

  if (!userData && to.path !== '/login-page' && to.path !== '/register-page' && to.path !== '/fgpassword-page' && to.path !== '/reset-password-page' && to.path !== '/reset-pwd-page' && to.path !== '/landing-page' && to.path !== '/book-read-page' && to.path !== '/help-page') {
    next("/landing-page"); // Redirige vers la page de connexion
  } else {
    next(); // Continue la navigation normalement
  }
});


export default router;