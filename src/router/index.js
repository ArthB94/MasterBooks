
import { createWebHistory, createRouter } from "vue-router";
import HelloWorld from "@/views/HelloWorld.vue";
import LandingPage from "@/views/LandingPage.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import ForgotPwd from "@/views/ForgotPwd.vue";
import EntryForm from "@/views/EntryForm.vue";
import EntryForm2 from "@/views/EntryForm copy 2.vue";
import CatalogPage from "@/views/CatalogPage.vue";
import HelpPage from "@/views/HelpPage.vue";
import ProfilePage from "@/views/UserProfilePage.vue";


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
    path: "/entry-form-page",
    name: "EntryFormPage",
    component: EntryForm,
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
    path: "/help-page",
    name: "HelpPage",
    component: HelpPage,
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