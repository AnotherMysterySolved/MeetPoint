"use strict";

$(document).ready(function() {

// FIREBASE============================================================================================
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

  var displayNameDiv = $(document.getElementById("display-name"));
  var credentialsDiv = $(document.getElementById("credentials"));
  var signupBtn = $(document.getElementById("btn-signup"));
  var cancelSignupBtn = $(document.getElementById("btn-signup-cancel"));
  var loginBtn = $(document.getElementById("btn-login"));
  var cancelLoginBtn = $(document.getElementById("btn-login-cancel"));
  var logoutBtn = $(document.getElementById("btn-logout"));
  var nameInputField = $(document.getElementById("input-name"));
  var emailInputField = $(document.getElementById("input-email"));
  var pwdInputField = $(document.getElementById("input-pwd"));

  var clickCount = 0;

  function emptyFields() {
    nameInputField.val("");
    emailInputField.val("");
    pwdInputField.val("");
  }

  displayNameDiv.hide();
  credentialsDiv.hide();
  cancelSignupBtn.hide();
  cancelLoginBtn.hide();

  signupBtn.on("click", function(e) {
    e.preventDefault();

    if (clickCount == 0) {
      displayNameDiv.show();
      credentialsDiv.show();
      cancelSignupBtn.show();
      loginBtn.hide();
      clickCount++;
    }
    else if (clickCount == 1) {
      
      var displayName = nameInputField.val().trim();
      var email = emailInputField.val().trim();
      var pwd = pwdInputField.val().trim();
      emptyFields();
      window.location.href = "profile.html";

      auth.createUserWithEmailAndPassword(email, pwd).catch(function(error) {

        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode == "auth/weak-password") {
          console.log("The password is too weak.");
        }
        else {
          console.log(errorMessage);
        }

        console.log(error);
        console.log("test");

        

      })


    }
  });

  loginBtn.on("click", function(e) {
    e.preventDefault();

    if (clickCount == 0) {
      credentialsDiv.show();
      cancelLoginBtn.show();
      signupBtn.hide();
      clickCount++;
    }
    else if (clickCount == 1) {

      var email = $("")
    }
  });

  cancelSignupBtn.on("click", function(e) {
    e.preventDefault();
    displayNameDiv.hide();
    credentialsDiv.hide();
    cancelSignupBtn.hide();
    loginBtn.show();
    clickCount = 0;
  });

  cancelLoginBtn.on("click", function(e) {
    e.preventDefault();
    credentialsDiv.hide();
    cancelLoginBtn.hide();
    signupBtn.show();
    clickCount = 0;
  });


  logoutBtn.on("click", function(e) {
    e.preventDefault();

    logoutBtn.on("click", function() {
    auth.signOut();
  })




// On click "Create Account"...
//   signupBtn.on("click", function(e) {
//     e.preventDefault();

//     var email = emailInput.val();
//     var pwd = pwdInput.val();
//     emptyFields();

//     console.log(email, pwd); // Problem: pwd is visible in console; need security measure to encrypt pwd

//     auth.createUserWithEmailAndPassword(email, pwd).catch(function(error) {

//       var errorCode = error.code;
//       var errorMessage = error.message;

//       if (errorCode == "auth/weak-password") {
//         alert("The password is too weak.");
//       }
//       else {
//         alert(errorMessage);
//       }

//       console.log(error);

//     });
//   });

// // On click "Login"...
//   loginBtn.on("click", function(e) {
//     e.preventDefault();

//     var email = emailInput.val();
//     var pwd = pwdInput.val();
//     emptyFields();
    
//     auth.signInWithEmailAndPassword(email, pwd).catch(function(error) {

//       var errorCode = error.code;
//       var errorMessage = error.message;

//       if (errorCode == "auth/wrong-password") {
//         alert("Wrong password.");
//       }
//       else {
//         alert(errorMessage);
//       }

//       console.log(error);

//     });
//   });

// // On click "Logout"...
//   logoutBtn.on("click", function() {
//     auth.signOut();
//   });

// // When user state changes...
//   auth.onAuthStateChanged(function(user) {
//     if (user) {
//       console.log("you are logged in");
//       logoutBtn.show();
//       console.log(user.uid);
//       console.log(user.email);
//     }
//     else {
//       alert("you are not logged in");
//       logoutBtn.hide();
//     }
//   });

//================================================================================================









// Google autocomplete function for HTML element "#autocomplete"
//   function init() {
//     var input = document.getElementById("input-loc");
//     var autocomplete = new google.maps.places.Autocomplete(input);
//   }
//   google.maps.event.addDomListener(window, 'load', init);


// // Loading Google map
//   var center = {lat: 40, lng: -96};

//   var map = new google.maps.Map(document.getElementById("map"), {
//     zoom: 3,
//     center: center
//   });

// // Creating marker on map
//   function createMarker(lat, lng) {
    
//     var marker = new google.maps.Marker({
//       position: {lat: lat, lng: lng},
//       map: map
//     });
//   }
// // Testing createMarker() with Atlanta
//   var atlanta = {lat: 33.7489954, lng: -84.3879824};
//   createMarker(atlanta.lat, atlanta.lng);




  // $("#yelp-btn").on("click", function(e) {

  //   e.preventDefault();

  //   function getMeters(i) {
  //     return i*1609.344;
  //   }

  //   var yelpURL = "/api/yelp/v3/businesses/search";
  //   var term = $("#yelp-term").val();
  //   var location = $("#yelp-loc").val();
  //   var radiusMiles = $("#radius-input option:selected").attr("value");
  //   var radiusMeters = getMeters(radiusMiles);
  //   // Yelp takes radius in meters

  //   yelpURL += "?" + $.param({
  //       "term": term,
  //       "location": location,
  //       "limit": 10,
  //       "distance": radiusMeters //not sure if this works properly; check again later
  //     });
  //   // GLOBAL var for access token
  //   var accessToken = "dansSf9_Muex3BxxaCcbl3S2Up3UnypA";

  //   // do this one time
  //   $.ajax({
  //     url: "/api/yelp/oauth2/token",
  //     method: "POST",
  //     data: {
  //       grant_type: "client_credentials",
  //       client_id: "DKj-IPb7Z7qjDMphovCP9g",
  //       client_secret: "nL0yFJUv5cA95FmDE6Fq5B1jo4ss6z2dGpvvK5XFM9T6ii0ehmP6dypGBzA4rxuj"
  //     }
  //   }).done(function (response) {
  //     console.log(response);

  //     // update global variable for your accessToken
  //     accessToken = response.access_token;

  //     $.ajax({
  //       // '/api/yelp/' + everything in the examples after 'https://api.yelp.com/' i.e.
  //       url: yelpURL,
  //       method: "GET",
  //       headers: {
  //         // use your access token in every API request to proxy
  //         Authorization: "Bearer " + accessToken
  //       }
  //     }).done(function (response) {
  //     console.log(response);
  //       for (var i = 0; i < response.businesses.length; i++) {
  //         var businessName = response.businesses[i].name;
  //         var businessAddress = response.businesses[i].location.display_address[0] + ", " + response.businesses[i].location.display_address[1];
  //         var yelpLink = response.businesses[i].url;

  //         $("#yelp-results").append("<tr><td>" + businessName + "</td></td><td>" + businessAddress + "</td><td><a href='" + yelpLink + "' target='_blank'>Go to Yelp Page</a></td></tr>");
  //       }
  //     });
  //   }).fail(function (err) {
  //     console.error(err)
  //   });
  // });

  //   $("#geocode-btn").on("click", function(event) {

  //   event.preventDefault();

  //   var geocodeURL = "/api/geocode";
  //   var address = $("#geocode-input").val();
  //   var geocodeKey = "AIzaSyBDX_eXekJVgS9WjggIhZRQbvNXlbFQDsc";

  //   geocodeURL += "?" + $.param({
  //       "api_key": geocodeKey,
  //       "address": address
  //     });

  //   $.ajax({
  //     // '/api/flightstats/' + everything in the examples after '/v2/json/' i.e.
  //     url: geocodeURL,
  //     method: "GET"
  //   }).done(function (response) {
  //     console.log(response);
  //     var formattedAddress = response.results[0].formatted_address;
  //     var lat = response.results[0].geometry.location.lat;
  //     var lng = response.results[0].geometry.location.lng;
  //     var coordinates = "(" + lat + ", " + lng + ")";

  //     $("#geocode-results").append("<tr><td>" + formattedAddress + "</td><td>" + coordinates + "</td></tr>");

  //   }).fail(function (err) {
  //     console.error(err)
  //   });

  //   $("#geocode-input").val("");
  // });




});