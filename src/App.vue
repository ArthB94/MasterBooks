<!-- <template>
  <nav v-if="false">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style> -->


<template>
  <div id="nav">
      <!-- <router-link to="/">HelloWorld</router-link> |
      <router-link to="/landing-page">Landing Page</router-link> -->
  <router-view /> 
  </div>
</template>

<!-- <script>
import HelloWorld from './views/HelloWorld.vue'

export default {
  name: 'App',
  components: {
      HelloWorld
  }
}
</script> -->

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #222634;
  margin-top: 60px; */
}
</style>
