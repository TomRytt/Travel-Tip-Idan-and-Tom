// TODOS: Enable the user to pick a location by clicking on the map.
// TODOS: Build the LocationService managing Locations: {id, name, lat, lng, createdAt, updatedAt, BONUS:weather, }
// TODOS: Locations are saved to localStorage
// TODOS: Render the locations table:a. Show the location information
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
		document.querySelector('.locs').innerText = JSON.stringify(locs);
	});
}

function onClickLoc(event) {
	google.maps.event.addListener(map, 'click', getLoc(event));
	google.maps.event.addListener(alert('hi'));
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
function onPanTo() {
	console.log('Panning the Map');
	mapService.panTo(35.6895, 139.6917);
}

// Functions to work with and change names and variables accordingly
function onDone() {
	let name = document.querySelector('.modalText').value;
	var currLocation = {
		id: makeId(),
		lat: gLat,
		lng: gLng,
		name: name,
	};
	manageLocation(currLocation);
	onCloseModal();
}

function onCloseModal() {
	gLat = null;
	gLng = null;
	document.querySelector('.modalText').value = '';
	var elBtn = document.querySelector('.submitLocationBtn');
	elBtn.removeEventListener('click', onDone);
	document.querySelector('.modal').classList.remove('open');
}
