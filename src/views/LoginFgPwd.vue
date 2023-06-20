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
            echo '<hr>';
            echo 'Full name :' . $_SESSION['fullname'] . '<br>';
            echo 'Email : ' . $_SESSION['email'] . '<br>';
            echo 'ID : ' . $_SESSION['uid'] . '<br>';
            //redirect the user to the main page
            header("Location: changePassword.php");
        }else{
            echo 'invalid credentials';
        }
    }
mysqli_close($connection);
?>
--->




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
                                    <form action="" method="post">
                                        <div class="loginInputBox">
                                            <input type="text" name="txtEmail" placeholder="Email">
                                        </div>
                                        <div class="loginInputBox">
                                            <input type="password" placeholder="Password">
                                        </div>
                                        <div class="loginInputBox">
                                            <input type="submit" value="Login">
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
    name: "LoginFgPwdPage",

};
</script>
    
<style>

</style>