import DarkLightMode from '@/components/DarkLightMode.vue';

<template>
  <!-- Comment ca va jean claude? -->

  <div id="nav">
    <router-link to="/add-book-page">AddBook Page</router-link> |
    <router-link to="/book-page">Book page</router-link>|
    <router-link to="/catalog-page">Catalog Page</router-link>|
    <router-link to="/catalog-library-page">Catalog Library Page</router-link>|
    <router-link to="/catalog-admin-page">Catalog Admin Page</router-link>|
    <router-link to="/epub-reader-page">EPUB reader</router-link>|
    <router-link to="/fgpassword-page">FGPassword Page</router-link>|
    <router-link to="/help-page">Help Page</router-link> |
    <router-link to="/landing-page">Landing Page</router-link> |
    <router-link to="/login-page">Login Page</router-link> |
    <router-link to="/register-page">Register Page</router-link> |
    <router-link to="/reset-password-page">Reset Password</router-link> |
    <router-link to="/profile-page">Profile Page</router-link> |

  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>


