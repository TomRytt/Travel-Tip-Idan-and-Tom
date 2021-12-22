import {StorageService} from './storage-service.js';
export const locService = {
	getLocs,
	manageLocation,
};
const LOCATION_KEY = 'userLocationsDB'
const locs = StorageService.loadFromStorage(LOCATION_KEY) || [
	{name: 'Greatplace', lat: 32.047104, lng: 34.832384},
	{name: 'Neveragain', lat: 32.047201, lng: 34.832581},
];

function getLocs() {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(locs);
		}, 2000);
	});
}

function manageLocation(location) {
    locs.push(location);
    StorageService.saveToStorage(LOCATION_KEY, locs);
}
