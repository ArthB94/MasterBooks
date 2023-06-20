<template>
    <!-- <?php
  session_start();
  include 'dbConn.php';
  
  if(isset($_POST['btnChange'])){
      $newpassword=md5($_POST['newpassword']);
      $uid=$_SESSION['uid'];
      $query="UPDATE `tblusers` SET `password`='$newpassword' WHERE ID='$uid'";
      $result=mysqli_query($connection,$query);
      header("Location: index.php");
  }
  
  mysqli_close($connection);
  ?> -->
  
  
  <body>
      <section class="ResetPage">
          <div class="resetBox">
              <div class="loginContainer">
                  <div class="loginForm">
                      <h2>New Password</h2>
                      <p class="NewPswdPrompt">Please enter a <bold>personnalized password </bold>to ensure maximum protection.</p>
                      <form @submit.prevent action="" method="post" style="display:flex; align-items: center; flex-direction: column;">
                          <div class="loginInputBox" style="max-width: 350px;">
                              <input v-model = "oldpassword" type="password" placeholder="Old Password" name="oldpassword">
                          </div>
                          <div class="loginInputBox" style="max-width: 350px;">
                              <input v-model = "newpassword" type="password" placeholder="New Password" name="newpassword">
                          </div>
                          <div class = "message" style="margin-top: 40px;"> {{message}}</div>
                          <div class="loginInputBox" style="margin-left: 270px;">
                              <input @click ="()=>reset()"  id="NewPwdbtn" type="submit" value="Edit" name="btnChange">
                          </div>
                      </form>
                      <p class="forgotPswd">Need Help ?<router-link to="/help-page">Contact us</router-link></p>
                  </div>
              </div>
          </div>
      </section>
  </body>
  
  
  </template>
  
  <script>
  export default {
      name: 'ResetPwdPage',
      data(){
        return{
          oldpassword: "",
          newpassword : "",
          message : "",
        }
      },
      methods:{
        reset(){
          const token = localStorage.getItem('token');
          fetch("api/api/auth/password", 
          {
              method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify({old_password : this.oldpassword, new_password: this.newpassword})})
          .then((response)=>{    
            if (response.ok) {
              this.message = 'Password Changed Successfully';
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
                          this.message = errorMessage.message;
                      }
                      if(errorMessage.status === false){
  
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
  
  <style>
  
  </style>