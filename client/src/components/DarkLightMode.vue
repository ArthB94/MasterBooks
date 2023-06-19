<!-- <template>
<div id="page" v-bind:class="{ 'theme-dark' : nightMode }">
	<input type="checkbox" id="theme-toggle" v-model="nightMode">
	<label for="theme-toggle"><span></span></label>
</div>
</template>

<script>
    new Vue({
	el: "#page",
	watch: {
		nightMode: function() {
			localStorage.setItem("nightMode", JSON.stringify(this.nightMode));
			console.log('Night Mode: ' + JSON.stringify(this.nightMode))
		}
	},
	data: {
		nightMode: localStorage.getItem("nightMode") || false,
	},
});
</script>

<style>
    
</style> -->

<template>
  
	<div class="toggle">
	</div>
  
</template>


<script>
  export default {
    component: 'DarkLightMode',
    mounted() {
      const bod = document.querySelector('body');
      const toggle = document.querySelector('.toggle');
      const isDarkMode = localStorage.getItem('darkMode');

      if (isDarkMode === 'true') {
        bod.classList.add('dark');
      }

      toggle.onclick = function () {
        
        bod.classList.toggle('dark');
        const toggled = bod.classList.contains('dark');
        localStorage.setItem('darkMode', toggled);

      };
    },
  };
</script>

<style>

</style>