$(document).ready(function() {

  var contentDiv = $(document.getElementById("div-content"));
  var displayNameDiv = $(document.getElementById("div-display-name"));
  var credentialsDiv = $(document.getElementById("div-credentials"));
  var createGroupDiv = $(document.getElementById("div-create-group"));

  var signupBtn = $(document.getElementById("btn-signup"));
  var loginBtn = $(document.getElementById("btn-login"));
  var logoutBtn = $(document.getElementById("btn-logout"));
  var cancelSignupBtn = $(document.getElementById("btn-signup-cancel"));
  var cancelLoginBtn = $(document.getElementById("btn-login-cancel"));
  var createGroupBtn = $(document.getElementById("btn-create-group"));

  var nameField = $(document.getElementById("input-name"));
  var emailField = $(document.getElementById("input-email"));
  var pwdField = $(document.getElementById("input-pwd"));
  var groupNameField = $(document.getElementById("group-name"));
  var groupPurposeField = $(document.getElementById("group-purpose"));
  var groupPlaceField = $(document.getElementById("group-place"));

  var displayNameSpan = $(document.getElementById("display-name"));
  var userEmailSpan = $(document.getElementById("user-email"));
  var uidSpan = $(document.getElementById("user-uid"));

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



});