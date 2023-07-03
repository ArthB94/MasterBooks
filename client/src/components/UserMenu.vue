<template>
    <nav class="nav-user-menu">
        <!-- <div class="User-profile-icon"></div> -->
        <div class="User-menu-container">
            <div class="user-pix-containe">
                <font-awesome-icon icon="fa-solid fa-user-large" class="User-profile-icon" />
            </div>
            <div class="user-menu">
                <ul>
                    <li @click="this.$router.push('/profile-page')">
                        <router-link to="/profile-page" class="to-page-user-nav">My Profile</router-link>
                    </li>
                    <li @click="this.$router.push('/request-page')">
                        <router-link to="/request-page" class="to-page-user-nav">Request a book</router-link>
                    </li>
                    <li @click="this.$router.push('/help-page')">
                        <router-link to="/help-page" class="to-page-user-nav">Help</router-link>
                    </li>
                    <li @click="disconnectUser">
                        <router-link to="/login-page" class="to-page-user-nav">Disconnect</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
  
<script>
export default {
    component: 'UserMenu',
    mounted() {
        let profile = document.querySelector('.User-profile-icon');
        let menu = document.querySelector('.user-menu');
        profile.onclick = function () {
            menu.classList.toggle('active')
        }
    },
    methods: {
        disconnectUser() {
            if (typeof localStorage !== 'undefined') {
                localStorage.removeItem('userData');
            }
            this.$router.push('/login-page');
        }
    }

}
</script>
  
<style></style>