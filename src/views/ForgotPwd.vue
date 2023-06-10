<template><!-- <?php

    include 'dbConn.php';
    
       //Include required PHPMailer files
       require 'includes/PHPMailer.php';
       require 'includes/SMTP.php';
       require 'includes/Exception.php';
       //Define name spaces
       use PHPMailer\PHPMailer\PHPMailer;
       use PHPMailer\PHPMailer\SMTP;
       use PHPMailer\PHPMailer\Exception;
    
    
    
    function sendMail(){
        //Create instance of PHPMailer
        $mail = new PHPMailer();
        //Set mailer to use smtp
        $mail->isSMTP();
        //Define smtp host
        $mail->Host = "smtp.gmail.com";
        //Enable smtp authentication
        $mail->SMTPAuth = true;
        //Set smtp encryption type (ssl/tls)
        $mail->SMTPSecure = "tls";
        //Port to connect smtp
        $mail->Port = "587";
        //Set gmail username
        $mail->Username = "pauline.david1911@gmail.com";
        //Set gmail password
        $mail->Password = "iwmajhdclfgkmxob";
        //Email subject
        $mail->Subject = "Test email using PHPMailer";
        //Set sender email
        $mail->setFrom('pauline.david1911@gmail.com');
        //Enable HTML
        $mail->isHTML(true);
        //Attachment
        // $mail->addAttachment('img/attachment.png');
        //Email body
        $mail->Body = "Here is your temporary password : hello123";
        //Add recipient
        $sendTo = $_POST['email'];
        $mail->addAddress($sendTo);
        $mail->addAddress('pauline.david1911@gmail.com');
        //Finally send email
        if($mail->send()){
            echo "Email sent !";
            echo md5($newpassword);
        }else{
            echo "Message could not be sent. Mailer error :";
        }
        //Closing smtp connection
        $mail->smtpClose();
    }
    
    
    if(isset($_POST['submit'])){
        $email = $_POST['email'];
        $query="SELECT * FROM tblusers WHERE email='$email'";
        $result=mysqli_query($connection,$query);
        $row = mysqli_fetch_assoc($result); //$row['email']
        $count = mysqli_num_rows($result); //1 or 0
        if($count == 1){
            //record found
            $tempPass=md5('hello123');
            $updateQuery="UPDATE `tblusers` SET `password`= '$tempPass' WHERE `email` = '$email'";
            if(mysqli_query($connection,$updateQuery)){
                sendMail();
                echo 'Password has been sent ! Please check your mail';
                header("refresh:2,url=loginfg.php");
            }
        }else{
            echo 'account does not exist';
            header("refresh:2,url=registration.php");
        }
    }
    
    mysqli_close($connection);
    ?> -->
    
    
        <body>
            <section class="LoginPage">
                <div class="loginBox">
                    <img src="../assets/Forgot.webp" alt="Calendar people" class="login-img">
                    <div class="loginContainer">
                        <div class="loginForm">
                            <h2>Reset your Password</h2>
                            <p class="forgotPswdPrompt">Please enter your <bold>Email Address</bold> to receive the
                                password-reset link </p>
                            <form @submit.prevent action="" method="post">
                                <div class="loginInputBox">
                                    <input  v-model = "email" type="text" placeholder="Email Address" name="email">
                                </div>
                                <div class = "message" style="margin-top: 40px;" >{{message}}</div>
                                <div class="loginInputBox">
                                    <input @click="()=>send()" type="submit" value="Send" name="submit" style="margin-left: 40%;">
                                </div>
                            </form>
    
                            <p class="forgotPswd">Remembered password ?<router-link to="/login-page">Login</router-link>
                            </p>
                            <p class="forgotPswd" style="margin-top:-2%;">Don't have an account ?<router-link
                                    to="/register-page">Register</router-link></p>
                            <p class="forgotPswd" style="margin-top:-2%;">Need Help ?<router-link to="/help-page">Contact us</router-link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </body>
    </template>
    
    <script>
    export default {
        name: 'ForgotPwdPage',
        data(){
          return{
            email: "",
            message : "",
          }
        },
        methods:{
          send(){
            fetch("api/api/auth/recovery", 
            {method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                
            },
            body: JSON.stringify({email:this.email})})
            .then((response)=>{       
              if (response.ok) {
                this.message = 'Email Sent Successfully';
                return response.json();
    
              }
              else {   
                    return response.json().then(error => {
                        throw new Error(JSON.stringify(error));
                });
            }})
            .catch((error) => {
                        let errorMessage;
                        try {
                            errorMessage = JSON.parse(error.message);
                        } catch {
                            errorMessage = {
                            message: 'An error occurred while processing your request.'
                            };
                        }
                        if(errorMessage.status === false){
                            console.log(errorMessage.message);
                            this.message = errorMessage.message;
                        }
                        else{
                            this.message = errorMessage.errors;
                        }
                    
                        
                    });
                }
          
        }
        }
    
    </script>
    
    <style></style>