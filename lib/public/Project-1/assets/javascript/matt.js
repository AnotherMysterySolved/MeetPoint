"use strict";

var peeps = [{
  name: "Morty",
  location: "NYC",
  lat: "40.712784",
  long: "-74.005941"
}, {
  name: "Harry",
  location: "ATL",
  lat: "33.748995",
  long: "-84.387982"
}, {
  name: "Bender",
  location: "LA",
  lat: "34.052234",
  long: "-118.243685"
}];

var sumLats = 0;
var averageLats = 0;

var sumLongs = 0;
var averageLongs = 0;


function meanLatLong() {

  for (i = 0; i < peeps.length; i++) {
    var lat = Number(peeps[i].lat);
    sumLats += lat;
    averageLats= sumLats/peeps.length;

    var long = Number(peeps[i].long);
    sumLongs += long;
    averageLongs= sumLongs/peeps.length;

  };
  console.log(averageLats);
  console.log(averageLongs);
};
meanLatLong();
