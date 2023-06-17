<template>
  <header>
    <div>
        <h1>TIME 2 DO</h1>
    </div>
    <div v-if="isConnected">
        {{userName}}
        <button @click="handleLogout">Logout</button>
    </div>


    <div class="dropdown" v-if="!isConnected">
        <router-link  id="loginbutton" to="/Login">Login</router-link>
    </div>
  </header>
</template>

<script>
export default {
    name: 'SiteHeader',
    components: {

    },
    data() {
        return {
            isConnected: false,
            registering: false,
            userName: "proplayer",
        };
    },
    beforeMount(){
        if(localStorage.getItem("token")){
            console.log(localStorage.getItem("token"));
            fetch('api/api/user', {
                headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer '+ localStorage.getItem("token")
                }
            })
            .then((response)=>{return(response.json())})
            .then((parsed) => {this.isConnected = true; this.userName = parsed.name})
        }
    },
    methods:{
        handleLogout(){
            fetch('api/api/auth/logout', {
                headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer '+ localStorage.getItem("token")
                }
            }).then(() => {
                localStorage.clear();
                this.isConnected = false;
            }).then(setTimeout(() => this.$router.push('/'), 500))
        }
    }
}
</script>

<style scoped>
h1{
    color: #DCDCDD;
}
header{
    padding: 1vw;
    display: flex;
    justify-content: space-between;
    background-color: #46494C;
    height: 10vh;
    border-bottom: 2px solid #1985A1;
}
#loginbutton{
    text-decoration: none;
    border-radius: 5px;
    background-color: #1985A1;
    color: white;
    height: 5vh;
    width: 5vw;
}
</style>