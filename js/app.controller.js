// Enable the user to pick a location by clicking on the map.
// TODOS: Build the LocationService managing Locations: {id, name, lat, lng, createdAt, updatedAt, BONUS:weather, }
// Locations are saved to localStorage
// Render the locations table:a. Show the location information
// TODOS: Add an Actions column with buttons: Go and Delete
//                                           a. Go – pans the map to that location
//                                           b. Delete – use the service to delete the location
// TODOS: Create a “my-location” button that pan the map to the user’s location.
// TODOS: Implement search: user enters an address (such as Tokyo) use the google Geocode API to turn it into cords
//        (such as: {lat: 35.62, lng:139.79}) pan the map and also add it as new location.
// TODOS: Create a ‘copy link’ button that saves a link to the clipboard.
//        The link will be to your application (URL for GitHub pages) with the Lat and Lng params.
//        When opening the link your proj should open a map showing the location according to the lat/lng from the query string parameters.
//           a. This app should be deployed to github-pages, so the URL should be something like: https://github.io/me/travelTip/index.html?lat=3.14&lng=1.63
//           b. When app loads it looks into the query string params and if there are lat/lng params (see here), it will display accordingly.

import {locService} from './services/loc.service.js';
import {mapService} from './services/map.service.js';

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onCloseModal = onCloseModal;
window.onDone = onDone;
window.onRemoveLocation = onRemoveLocation;
window.goToMyLocation = goToMyLocation;

function onInit() {
	mapService
		.initMap()
		.then(() => {
			console.log('Map is ready');
		})
		.catch(() => console.log('Error: cannot init map'));
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
	console.log('Getting Pos');
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject);
	});
}

function onAddMarker() {
	console.log('Adding a marker');
	mapService.addMarker({lat: 32.0749831, lng: 34.9120554});
}

function onGetLocs() {
	locService.getLocs().then((locs) => {
		console.log('Locations:', locs);
		// document.querySelector('.locs').innerText = JSON.stringify(locs);
		renderUserLocations(locs);
	});
}

function onGetUserPos() {
	getPosition()
		.then((pos) => {
			console.log('User position is:', pos.coords);
			document.querySelector(
				'.user-pos'
			).innerText = `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`;
		})
		.catch((err) => {
			console.log('err!!!', err);
		});
}
function onPanTo(lat = 35.6895, lng = 139.6917) {
	console.log(lat, lng);
	console.log('Panning the Map');
	mapService.panTo(lat, lng);
}

// function getCoords() {

// }
// Functions to work with and change names and variables accordingly
function onDone() {
	let pos = mapService.getLngAndLat();
	let name = document.querySelector('.modalText').value;
	var currLocation = {
		id: 'id' + Math.random().toString(16).slice(2),
		lat: pos.lat,
		lng: pos.lng,
		name: name,
		createdAt: new Date(),
	};
	locService.manageLocation(currLocation);
	onCloseModal();
}

function onCloseModal() {
	document.querySelector('.modalText').value = '';
	var elBtn = document.querySelector('.submitLocationBtn');
	elBtn.removeEventListener('click', onDone);
	document.querySelector('.modal').classList.remove('open');
}

function renderUserLocations(locs) {
	// var userLocations = getUserLocations();
	var strHTML = locs.map((location) => {
		return `<tr>
         <td>${location.name}</td>
        <td>${location.lat}</td>
        <td>${location.lng}</td>
		 <td>${location.createdAt}</td>
		 <td class="go-to-location-td"><button onclick="onPanTo(
				${location.lat}, ${location.lng}
			)">Go There</button></td>
        <td class="remove-loc-td"><button onclick="onRemoveLocation('${location.id}')">x</button></td>
        </tr>`;
	});
	document.querySelector('.user-locations').innerHTML = strHTML.join('');
}

function onRemoveLocation(locationId) {
	locService.getLocationById(locationId);
	locService.removeLocation(locationId);
	onGetLocs();
}

function goToMyLocation() {
	getPosition().then((pos) => {
		onPanTo(pos.coords.latitude, pos.coords.longitude);
	});
}

// function getPosition() {
//     if (!navigator.geolocation) {
//         alert("HTML5 Geolocation is not supported in your browser.");
//         return;
//     }
//     navigator.geolocation.getCurrentPosition(showLocation, handleLocationError);
// }
// function showLocation(position) {
//     console.log(position);
//     document.getElementById("latitude").innerHTML = position.coords.latitude;
//     document.getElementById("longitude").innerHTML = position.coords.longitude;
//     document.getElementById("accuracy").innerHTML = position.coords.accuracy;

//     var date = new Date(position.timestamp);
//     document.getElementById("timestamp").innerHTML = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
//     initMap(position.coords.latitude, position.coords.longitude);
// }

// function handleLocationError(error) {
//     var locationError = document.getElementById("locationError");

//     switch (error.code) {
//         case 0:
//             locationError.innerHTML = "There was an error while retrieving your location: " + error.message;
//             break;
//         case 1:
//             locationError.innerHTML = "The user didn't allow this page to retrieve a location.";
//             break;
//         case 2:
//             locationError.innerHTML = "The browser was unable to determine your location: " + error.message;
//             break;
//         case 3:
//             locationError.innerHTML = "The browser timed out before retrieving the location.";
//             break;
//     }
// }
