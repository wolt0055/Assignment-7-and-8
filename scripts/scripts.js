var response = null;
var resp = null;
var cityLocation = null;
var newPos = {};
// const container = document.getElementById('container')
// let locations = [
//   {lat: 51.5074, lng:0.1278},
//   {lat:47.6762, lng:-122.3182}
// ]



//triggered when user clicks button
function yourLoc(){
  var parent = document.getElementById('container')
  parent.innerHTML = ""

  var roker = document.getElementById('alRoker')
  roker.innerHTML = ""
  var imgRoker = new Image();
  imgRoker.src = '../07/images/alRoker.JPG';
  roker.appendChild(imgRoker);
  let p = document.createElement('p');
  p.innerHTML = '"Here\'s what\'s happening in your neck of the woods" --Mr. Al Roker'
  roker.appendChild(p)
  //user loc from browser
  navigator.geolocation.getCurrentPosition(geolocSuccess, geolocError);

  // document.getElementById('container').appendChild(li);

  // document.getElementById("container").appendChild(ul);
//   //for each object in locations list, call the API
  // for(let i = 0; i<locations.length; i++){
    // getLocation(locations[i]);
  // }
}

//callback for succcessfully getting location from user's browser
function geolocSuccess(position){
//const = newPos
  newPos = {lat:position.coords.latitude, lng:position.coords.longitude};
  weatherUpdate(newPos);
}
//
// //callback for no success getting location from user broswer
function geolocError(){
  console.log("error getting user's location");
}


// helper function to print message to page
function printListItem(message){
  var parent = document.getElementById('container')
  // parent.innerHTML = ""
  // let ul = document.createElement('ul')
  // ul.id = 'listContainer'

  let li = document.createElement("li");
  li.innerHTML = message;
  // ul.appendChild(li);
  parent.appendChild(li);
}


//need to create function that appends information to DOM
function weatherUpdate(location){
  // cityLocation = location
  var parent = document.getElementById('container')
  parent.innerHTML = ""
//create the li
  // let li = document.createElement('li')
  // document.getElementById('container').appendChild(li)
if(location == 'Seattle'){
  cityLocation = 'Seattle'
  // console.log(cityLocation);
  var mapUri = 'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=47.608&lon=-122.335&units=imperial&APPID=ce2f30aab63d88137a39fc6ba70c3bdc'
  //used initial site for test
  // var mapUri = 'http://api.openweathermap.org/data/2.5/weather?lat=47.6762&lon=-122.3182&APPID=ce2f30aab63d88137a39fc6ba70c3bdc'
}
if(location == 'London'){
  //for each object, call the API
  cityLocation = 'London'
  // var mapUri = 'http://api.openweathermap.org/data/2.5/weather?lat=51.5074&lon=0.1278&APPID=ce2f30aab63d88137a39fc6ba70c3bdc'
  var mapUri = 'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=51.5085&lon=-0.076&units=imperial&APPID=ce2f30aab63d88137a39fc6ba70c3bdc'
}
if(typeof location === 'object')
  var mapUri = `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lng}&units=imperial&APPID=ce2f30aab63d88137a39fc6ba70c3bdc`
  // var mapUri = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=AIzaSyAR-3fGOzXLJnGRL7Cg6zqdPAqpzbiMjGw`;
//will need to add https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=51.5074&lon=0.1278&APPID=ce2f30aab63d88137a39fc6ba70c3bdc
  let request = new XMLHttpRequest();
  request.open("GET", mapUri, true);
  request.onload = onloadFunc;
  request.onerror = onerrorFunc;
  request.send()
}

function onloadFunc(){
  console.log("great success");
  //in the onload we want to check response.results.length > 0
  response = JSON.parse(this.response)
  // console.log(response);
  // console.log(response.temp);
    if(this.response.length > 0){
      // console.log("length greater than 0");
      let listItem = response.weather[0].description
      // console.log(listItem);
      printListItem(listItem)
//information for the main content
      printListItem(response.main.humidity + "% humidity")
      //info for weatherresponse

      printListItem("Blazing winds of " + response.wind.speed + " MPH");

    } else{console.log('length is 0 yo');}
    // console.log(response);
    // document.getElementById('container').innerHTML = response.results
}

function onerrorFunc() {
  console.log("uh oh");
  printListItem("oopsy daisy")
}


//
// //API call onload callback function
// function onloadFunc1(){
//   resp = JSON.parse(this.response);
//   // console.log(resp);
//   if(resp.results.length>0){
// //     //if tehre are results print results format to page
//     printListItem("latitude is " + resp.results[0].geometry.location.lat);
//     printListItem("longitude is " + resp.results[0].geometry.location.lng);
//     // console.log(resp.results[3].address_components[1].long_name);
//     // console.log("It'll work sometimes!");
//     weatherUpdate(resp.results[3].address_components[1].long_name);
//   } else{printListItem("sorry no results found");}
//   }
// //
// // //api call on error callback function
// function onerrorFunc1(){
//   printListItem("sorry an error happened yo")
// }
//
// //helper method to call API and convert longitude lat to a human friendly address
// function getLocation(locObj){
//   let mapUri = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${locObj.lat},${locObj.lng}&key=AIzaSyAR-3fGOzXLJnGRL7Cg6zqdPAqpzbiMjGw`;
//   console.log(mapUri);
// //   // new request object- open, define callbacks, send
//   let request = new XMLHttpRequest();
//   request.open("GET", mapUri, true);
//   request.onload = onloadFunc1;
//   request.onerror = onerrorFunc1;
//   request.send();
// }
