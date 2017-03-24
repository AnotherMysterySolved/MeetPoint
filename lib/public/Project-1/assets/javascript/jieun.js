"use strict";

// Add the following in the <head> of your HTML to link to Google's Places Library:
// <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBDX_eXekJVgS9WjggIhZRQbvNXlbFQDsc&libraries=places"></script>
//
// Add the following in the <body> of your HTML to get the input box for Google's autocomplete:
// <div id="locationField">
//   <input id="autocomplete" placeholder="Enter your address" type="text"></input>
// </div>
//

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


  var clickCount = 0;

  var hide = {
    signupForm: function() {
      displayNameDiv.hide();
      credentialsDiv.hide();
      cancelSignupBtn.hide();
      loginBtn.show();
    },
    loginForm: function() {
      credentialsDiv.hide();
      cancelLoginBtn.hide();
      signupBtn.show();
    }
  }

  var show = {
    signupForm: function() {
      displayNameDiv.show();
      credentialsDiv.show();
      cancelSignupBtn.show();
      loginBtn.hide();
    },
    loginForm: function() {
      credentialsDiv.show();
      cancelLoginBtn.show();
      signupBtn.hide();
    },
    createGroupForm: function() {
      createGroupDiv.show();
    }
  }

  function emptyFields() {
    nameField.val("");
    emailField.val("");
    pwdField.val("");
  }

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

  signupBtn.on("click", function(e) {
    e.preventDefault();

    if (clickCount == 0) {
      show.signupForm();
      clickCount++;
    }
    else if (clickCount == 1) {
      clickCount = 0;
      
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
        console.log("testing signup");
      })
    }

    if ((nameField.val() !== "") && (emailField.val() !== "") && (pwdField.val() !== "")) {
      setTimeout(loadPage.profile, 500);
    }
    

  });

  loginBtn.on("click", function(e) {
    e.preventDefault();

    if (clickCount == 0) {
      show.loginForm();
      clickCount++;
    }
    else if (clickCount == 1) {
      clickCount = 0;

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
        console.log(error);
        console.log("testing login");
      })
      if ((emailField.val() !== "") && (pwdField.val() !== "")) {
        setTimeout(loadPage.profile, 500);
      }
    }

  });

  createGroupBtn.on("click", function(e) {
    e.preventDefault();
    if (clickCount == 0) {
      show.createGroupForm();
      alert("loading create group page!");
      clickCount++;
      
    }
    else if (clickCount == 1) {
      clickCount = 0;

      var groupName = groupNameField.val();
      var groupPurpose = groupPurposeField.val();
      var groupPlace = groupPlaceField.val();

      console.log(groupName, groupPurpose, groupPlace);

      database.ref("groups").push({
        name: groupName,
        purpose: groupPurpose,
        place: groupPlace
      }).then(function(snap) {
        var key = snap.getKey();
        var currentUser = auth.currentUser.uid;
        database.ref("users/" + currentUser + "/groups/" + key).set(true);
        database.ref("groups/" + key + "/members/" + currentUser).set(true);
      });



    }
  });

  cancelSignupBtn.on("click", function(e) {
    e.preventDefault();
    hide.signupForm();
    clickCount = 0;
  });

  cancelLoginBtn.on("click", function(e) {
    e.preventDefault();
    hide.loginForm();
    clickCount = 0;
  });


  logoutBtn.on("click", function(e) {
    clickCount = 0;
    e.preventDefault();
    auth.signOut();
    loadPage.start();

  });

  auth.onAuthStateChanged(function(user) {

    if (user) {
      console.log("you are logged in");
    }
    else {
      console.log("you are not logged in");
    }
  });




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