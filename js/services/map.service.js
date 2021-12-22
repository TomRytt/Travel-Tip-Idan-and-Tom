
import { API_KEY } from './api.js';
import { GEOAPI_KEY } from './api.js';
import { locService } from './loc.service.js';

export const mapService = {
	initMap,
	addMarker,
	panTo,
	clickLoc,
	getLngAndLat,
	goToSearchLocation,
};

var gMap;
var gLat;
var gLng;

function initMap(lat = 32.0749831, lng = 34.9120554) {
	console.log('InitMap');
	return _connectGoogleApi().then(() => {
		console.log('google available');
		gMap = new google.maps.Map(document.querySelector('#map'), {
			center: { lat, lng },
			zoom: 15,
		});
		google.maps.event.addListener(gMap, 'click', function (event) {
			let elModal = document.querySelector('.modal');
			elModal.classList.add('open');
			var elBtn = document.querySelector('.submitLocationBtn');
			gLat = event.latLng.lat();
			gLng = event.latLng.lng();
<<<<<<< HEAD
			getLngAndLat(gLat, gLng)
			elBtn.addEventListener('click', onDone);
=======
			getLngAndLat(gLat, gLng);
			elBtn.addEventListener('click', onAddLocation);
>>>>>>> 318fac16507aab713cb87847bb747c61b097c789
		});
	});
}

function getLngAndLat() {
<<<<<<< HEAD
	let pos = { lat: gLat, lng: gLng }
	return pos
=======
	let pos = {lat: gLat, lng: gLng};
	return pos;
>>>>>>> 318fac16507aab713cb87847bb747c61b097c789
}

function addMarker(loc) {
	var marker = new google.maps.Marker({
		position: loc,
		map: gMap,
		title: 'Hello World!',
	});
	return marker;
}

function clickLoc(loc) { }

function panTo(lat, lng) {
	var laLatLng = new google.maps.LatLng(lat, lng);
	gMap.panTo(laLatLng);
}

function _connectGoogleApi() {
	if (window.google) return Promise.resolve();
	var elGoogleApi = document.createElement('script');
	elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
	//    
	elGoogleApi.async = true;
	document.body.append(elGoogleApi);

	return new Promise((resolve, reject) => {
		elGoogleApi.onload = resolve;
		elGoogleApi.onerror = () => reject('Google script failed to load');
	});
}

<<<<<<< HEAD
function goToSearchLocation(value) {
	console.log('goToSearch Test')
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = () => {
		if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
			const data = JSON.parse(xhr.responseText)
				const currLocation = {
				id: 'id' + Math.random().toString(16).slice(2),
				lat: data.results[0].geometry.location.lat,
				lng: data.results[0].geometry.location.lng,
				name: value,
				createdAt: new Date(),
			}
			locService.manageLocation(currLocation);
			panTo(data.results[0].geometry.location.lat, data.results[0].geometry.location.lng)
		}
	}
	xhr.open('GET', `https://maps.googleapis.com/maps/api/geocode/json?address=${value}&key=${GEOAPI_KEY}`, true);
	xhr.send();
}

=======
// function onDone() {
// 	let pos = mapService.getLngAndLat();
// 	let name = document.querySelector('.modalText').value;
// 	var currLocation = {
// 		id: 'id' + Math.random().toString(16).slice(2),
// 		lat: pos.lat,
// 		lng: pos.lng,
// 		name: name,
// 		createdAt: new Date(),
// 		updatedAt: new Date(),
// 	};
// 	locService.manageLocation(currLocation);
// 	onCloseModal();
// }
>>>>>>> 318fac16507aab713cb87847bb747c61b097c789
