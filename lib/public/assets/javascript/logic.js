$(document).ready(function() {



  var signupModalBtn = $(document.getElementById("btn-signup-modal"));
  var signupFormBtn = $(document.getElementById("btn-signup-form"));
  
  var nameField = $(document.getElementById("input-name"));
  var emailField = $(document.getElementById("input-email"));
  var pwdField = $(document.getElementById("input-pwd"));
  var groupNameField = $(document.getElementById("input-group-name"));
  var groupPurposeField = $(document.getElementById("input-group-purpose"));
  var groupPlaceField = $(document.getElementById("input-group-place"));

  var displayNameSpan = $(document.getElementById("span-display-name"));
  var userEmailSpan = $(document.getElementById("span-user-email"));
  var uidSpan = $(document.getElementById("span-user-uid"));

  var loadPage = {
    start: function() {
      top.location = "http://localhost:1337/Project-1/jieun-testing/homepage.html";
    },
    profile: function() {
      top.location = "http://localhost:1337/Project-1/jieun-testing/profile.html";
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


  var modal = document.getElementById('myModal');

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];


  signupModalBtn.on("click", function(e){
    e.preventDefault();
    modal.style.display = "block";
  });

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
      modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }

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
        })
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
      })
    }

    loadPage.profile();

  })




});