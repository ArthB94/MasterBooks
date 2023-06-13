<template>
    <!-- <?php
    //start a session
    session_start();
        include 'dbConn.php';
        if(isset($_POST['login'])){
            $email=$_POST['txtEmail'];
            $password=md5($_POST['txtPassword']);
            $query="SELECT * FROM tblusers WHERE email='$email' AND password='$password'";
            $result=mysqli_query($connection,$query);
            $row = mysqli_fetch_assoc($result); //$row['email']
            $count = mysqli_num_rows($result); //1 or 0
            if($count == 1){
                //record found
                echo 'login successful';
                $_SESSION['fullname'] = $row['firstname'];
                $_SESSION['email'] = $row['email'];
                $_SESSION['uid'] = $row['ID'];
                $_SESSION['admin'] = $row['admin'];
                echo '<hr>
                    ';
                                echo 'Full name :' . $_SESSION['fullname'] . '<br>';
                                echo 'Email : ' . $_SESSION['email'] . '<br>';
                                echo 'ID : ' . $_SESSION['uid'] . '<br>';
                                //redirect the user to the main page
                                header("Location: index.php");
                            }else{
                                echo 'invalid credentials';
                            }
                        }
                    mysqli_close($connection);
                    ?> -->
    
    
                    <body>
                        <div class="LoginPage">
                            <!-- <div class="loginColor"></div>
                            <div class="loginColor"></div>
                            <div class="loginColor"></div> -->
                            <div class="loginBox">
                                <!-- <div class="loginSquares" style="--i:0;"></div>
                                <div class="loginSquares" style="--i:1;"></div>
                                <div class="loginSquares" style="--i:2;"></div>
                                <div class="loginSquares" style="--i:3;"></div>
                                <div class="loginSquares" style="--i:4;"></div> -->
                                <div class="loginContainer">
                                    <div class="loginForm">
                                        <h2>Welcome back</h2>
                                        <form @submit.prevent action="" method="post">
                                            <div class="loginInputBox">
                                                <input v-model = "email" type="text" name="txtEmail" placeholder="Email">
                                            </div>
                                            <div class="loginInputBox">
                                                <input v-model = "password" type="password" placeholder="Password">
                                            </div>
                                            <div class = "message" style="color: red;">{{message}}</div>
                                            <div class="loginInputBox">
                                                <input @click="()=>login()" type="submit" value="Login">
                                            </div>
                                        </form>
                                        <p class="forgotPswd">Forgot your password ? <router-link to="/fgpassword-page">Reset it</router-link></p>
                                        <p class="forgotPswd" style="margin-top:-2%;">New here ? <router-link to="/register-page">Sign up</router-link></p>
                                        <p class="forgotPswd" style="margin-top:-2%;">Need Help ?<router-link to="/help-page">Contact us</router-link></p>
                                    </div>
                                </div>
                                <img src="../assets/Login.png" alt="Calendar people" class="login-img">
                            </div>
                        </div>
                    </body>
    </template>
    
    <script>
    export default {
        name: "LoginPage",
        data(){
          return{
            
            email: "",
            password: "",
            message : "",
          }
        },
        methods:{
          login(){
            fetch("http://127.0.0.1:8000/api/auth/login", 
            {method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:this.email,password:this.password})})
            .then((response)=>{
               
              if (response.ok) {
                return response.json();
              }
              else {   
                    return response.json().then(error => {
                        throw new Error(JSON.stringify(error));
                });
            }})
            
            .then((parsed) => {localStorage.setItem('token',parsed.token);})
            .then(()=>{this.$router.push('/calendar-page');})
            .catch((error) => {
                        let errorMessage;
                        try {
                            errorMessage = JSON.parse(error.message);
                        } catch {
                            errorMessage = {
                            message: 'An error occurred while processing your request.'
                            };
                        }
                        if(errorMessage.message === 'Email & Password does not match with our record.'){
                            this.message = errorMessage.message;
                        }
                        else{
                        const keys = Object.keys(errorMessage.errors);
                        if (keys.length > 0) {
                            this.message = errorMessage.errors[keys[0]][0];
                        }
                        else{
                            this.message = errorMessage.errors;
                        }
                    }
                        
                    });
                }
          
        }
        }
    
    //   data() {
    //     return {
    //       open: true,
    //     }
    //   },
    //   methods: {
    //     openModal() {
    //       this.open = true
    //     },
    //     closeModal() {
    //       this.open = false
    //     },
    //   },
    
    </script>
        
    <style>
    
    </style>