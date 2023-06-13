<template>
    <!-- <?php 
  include 'dbConn.php';
  session_start();
  
  if(isset($_POST['btnRegister'])){
      $fname=$_POST['txtFName'];
      $email=$_POST['txtEmail'];
      $confirmationemail=$_POST['txtConfirmationEmail'];
      if($email != $confirmationemail){
          echo '<script type="text/javascript">
          window.onload = function () { alert("The two emails are different : please enter the same email in both fields."); } 
          </script>';
      }
      else{
          $checkquery="SELECT * FROM tblusers WHERE email='$email'";
          $checkresult=mysqli_query($connection,$checkquery);
          $row = mysqli_num_rows($checkresult); 
          if($row!=0){
              echo '<script type="text/javascript">
                  window.onload = function () { alert("You already have an account : please log in."); } 
              </script>';
              header("refresh:1;url=login.php");
          }
          else{
              $password=md5($_POST['txtPassword']); /*32 character output*/
  
              $query = "INSERT INTO `tblusers`(`firstname`, `email`, `password`) VALUES ('$fname','$email','$password')";
              if(mysqli_query($connection,$query)){
                  $_SESSION['fullname'] = $fname;
                  $_SESSION['email'] = $email;
                  echo $email;
                  $newquery="SELECT * FROM tblusers WHERE email='$email'";
                  $newresult=mysqli_query($connection,$newquery);
                  $newrow=mysqli_fetch_assoc($newresult);
                  echo var_dump($newrow);
                  $_SESSION['admin'] = $newrow['admin'];
                  echo $_SESSION['admin'];
                  $_SESSION['uid'] = $newrow['ID'];
                  echo $_SESSION['uid'];
                  echo 'Record succesfully added!';
                  //redirect user to another page
                  header("refresh:2,url=confirmRegistration.php");
              }else{
                  echo 'Error in inserting data, please try again.';
              }
          }
      }
  mysqli_close($connection);
  }
  
  ?> -->
  
  <body>
      <section class="RegisterPage">
          <div class="loginBox">
              <div class="loginContainer">
                  <div class="loginForm">
                      <h2>Get Started</h2>
                      <form @submit.prevent action="" method="post">
                          <div class="loginInputBox">
                              <input v-model = "name" type="text" placeholder="Username" name="txtFName">
                          </div>
                          <div class="loginInputBox">
                              <input v-model = "email" type="text" placeholder="Email" name="txtEmail">
                          </div>
                          <div class="loginInputBox">
                              <input v-model = "reemail" type="text" placeholder="Verify Email" name="txtConfirmationEmail">
                          </div>
                          <div class="loginInputBox">
                              <input v-model = "password" type="password" placeholder="Password" name="txtPassword">
                          </div>
                          <div class = "message" v-if = !matching> Email must be the same </div>
                          <div class = "message"> {{message}} </div>
                          <div class="loginInputBox">
                              <input @click="()=>register()" id="Registerbtn" type="submit" value="Register" name="btnRegister">
                          </div>           
                      </form>
                      <p class="forgotPswd">Already have an account ? <router-link to="/login-page">Login</router-link></p>
                      <p class="forgotPswd" style="margin-top:-2%;">Need Help ?<router-link to="/help-page">Contact us</router-link></p>
                  </div>
              </div>
              <img src="../assets/Register.png" alt="Calendar people" class="register-img">
          </div>
      </section>
  </body>
  
  </template>
  
  <script>
  export default {
      name: 'RegisterPage',
      data(){
        return{
          //True : login / False : register
          matching: true,
          name: "",
          email: "",
          reemail: "",
          password: "",
          message:""
        }
      },
      methods:{
      register(){
          this.matching = true;
          this.message = "";
          if(this.email === this.reemail){
            fetch("api/api/auth/register", 
            { method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name:this.name,email:this.email,password:this.password})})
            .then((response)=>{
              if (response.ok) {
                return response.json();
              } else {   
                  return response.json().then(error => {
                      throw new Error(JSON.stringify(error));
              });
            }})
            .then((parsed) => {localStorage.setItem('token',parsed.token)})
            .then(()=>{this.$router.push('/entry-form1-page');})
            .catch((error) => {
                      let errorMessage;
                      try {
                          errorMessage = JSON.parse(error.message);
                      } catch {
                          errorMessage = {
                          message: 'An error occurred while processing your request.'
                          };
                      }
                      const keys = Object.keys(errorMessage.error);
                      if (keys.length > 0) {
                          this.message = errorMessage.error[keys[0]][0];
                      }
                      else{
                          this.message = errorMessage.error
                      }
                      
                  });
              }else{
                  this.matching = false;
          }
      }
      }
  }
  
  
  
  
  </script>
   
  
  <style>
  
  </style>