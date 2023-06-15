
// export default router
import { createWebHistory, createRouter } from "vue-router";
import HelloWorld from "@/views/HelloWorld.vue";
import LandingPage from "@/views/LandingPage.vue";
import Login from "@/views/Login.vue";
// import LoginFgPwd from "@/views/LoginFgPwd.vue";
import Register from "@/views/Register.vue";
import ForgotPwd from "@/views/ForgotPwd.vue";
// import ResetPwd from "@/views/ResetPwd.vue";
import EntryForm from "@/views/EntryForm.vue";
// import EntryForm1 from "@/views/EntryForm copy.vue";
import EntryForm2 from "@/views/EntryForm copy 2.vue";
//import CatalogPage from "@/views/CatalogPage.vue";
import CatalogPageAdmin from "@/views/CatalogPage_Admin.vue";
import HelpPage from "@/views/HelpPage.vue";
import ProfilePage from "@/views/UserProfilePage.vue";
import CatalogLibraryPage from "@/views/CatalogPage_Mylib.vue";
// import TodoList2Page from "@/views/TodolistPage2.vue";
// import CalendarPage from "@/views/CalendarPage.vue";

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
  // {
  //   path: "/login-Fg-Pwd-page",
  //   name: "LoginFgPwdPage",
  //   component: LoginFgPwd,
  // },
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
  // {
  //   path: "/reset-password-page",
  //   name: "ResetPwdPage",
  //   component: ResetPwd,
  // },
  {
    path: "/entry-form-page",
    name: "EntryFormPage",
    component: EntryForm,
  },
  // {
  //   path: "/entry-form1-page",
  //   name: "EntryFormPage1",
  //   component: EntryForm1,
  // },
  {
    path: "/entry-form2-page",
    name: "EntryFormPage2",
    component: EntryForm2,
  },
  {
    path: "/catalog-page",
    name: "CatalogPage",
    meta: { isAdmin: false },
    component: CatalogPageAdmin,
  },
  {
    path: "/catalog-library-page",
    name: "CatalogLibraryPage",
    component: CatalogLibraryPage,
  },
  {
    path: "/catalog-admin-page",
    name: "CatalogPageAdmin",
    meta: { isAdmin: true },
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
  // {
  //   path: "/calendar-page",
  //   name: "CalendarPage",
  //   component: CalendarPage,
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;