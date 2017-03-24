$(document).ready(function() {

  var signupModalBtn = $(document.getElementById("btn-signup-modal"));
  var signupFormBtn = $(document.getElementById("btn-signup-form"));
  var loginModalBtn = $(document.getElementById("btn-login-modal"));
  var loginFormBtn = $(document.getElementById("btn-login-form"));

  var nameField = $(document.getElementById("input-name"));
  var emailField = $(document.getElementById("input-email"));
  var pwdField = $(document.getElementById("input-pwd"));
  var groupNameField = $(document.getElementById("input-group-name"));
  var groupPurposeField = $(document.getElementById("input-group-purpose"));
  var groupPlaceField = $(document.getElementById("input-group-place"));

  var loadPage = {
    start: function() {
      top.location = "http://localhost:1337/Project-1/jieun-testing/homepage.html";
    },
    profile: function() {
      top.location = "http://localhost:1337/profile.html";
    },
    createGroup: function() {
      top.location = "http://localhost:1337/Project-1/jieun-testing/creategroup.html";
    }
  }

  var config = {
    apiKey: "AIzaSyDWgY0ASwb81g1E0AVT5pvTR1DiDtXx1c4",
    authDomain: "meetpoint-8e687.firebaseapp.com",
    databaseURL: "https://meetpoint-8e687.firebaseio.com",
    storageBucket: "meetpoint-8e687.appspot.com",
    messagingSenderId: "800664455878"
  };

  firebase.initializeApp(config);

  var database = firebase.database();
  var auth = firebase.auth();


  var signupModal = $(document.getElementById("modal-signup"));

  // Get the <span> element that closes the modal
  var closeSignup = $(document.getElementById("close-signup"));

  signupModalBtn.on("click", function(e){
    e.preventDefault();
    signupModal.css("display", "block");
  });

  // When the user clicks on <span> (x), close the modal
  closeSignup.on("click", function(e) {
    e.preventDefault();
    signupModal.css("display","none");
  });

  var loginModal = $(document.getElementById("modal-login"));
  var closeLogin = $(document.getElementById("close-login"));

  loginModalBtn.on("click", function(e) {
    e.preventDefault();
    loginModal.css("display", "block");
  })

  closeLogin.on("click", function(e) {
    e.preventDefault();
    loginModal.css("display", "none");
  })


// SIGN UP===========================================================
  signupFormBtn.on("click", function(e) {
    e.preventDefault();

    var displayName = nameField.val().trim();
    var email = emailField.val().trim();
    var pwd = pwdField.val().trim();

    auth.createUserWithEmailAndPassword(email, pwd)
    .then(function(user) {

      user.updateProfile({
        displayName: displayName
      });

      console.log(user);

      sessionStorage.user = user.uid;

      database.ref("users/" + user.uid).set({
        name: displayName,
        email: user.email
      }).then(loadPage.profile());

    }).catch(function(error) {

      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == "auth/weak-password") {
        console.log("The password is too weak.");
      }
      else {
        console.log(errorMessage);
      }
      console.log(error);
      console.log("testing signup");
    });

  });



// LOGIN==============================================================
  loginFormBtn.on("click", function(e) {
    e.preventDefault();

    var email = emailField.val();
    var pwd = pwdField.val();
    // window.location.href = "profile.html";

    auth.signInWithEmailAndPassword(email, pwd).catch(function(error) {

      var errorCode = error.code;
      var errorMessage = error.message;

      if (errorCode == "auth/wrong-password") {
        console.log("Wrong password.");
      }
      else {
        console.log(errorMessage);
      }
      
      

    });

  })









});