const NodeGeocoder = require('node-geocoder');
//const OpenCageGeocoder = require('opencage-api-client');

// Set up the OpenCage geocoder
//const openCageGeocoder = new OpenCageGeocoder({ key: 'f278f54eebf640cd94d8ce1a76afb92d' });

// Set up the geocoder
const options = {
  provider: 'opencage',
  httpAdapter: 'https',
    apiKey: 'f278f54eebf640cd94d8ce1a76afb92d',
  formatter: null
};

const geocoder = NodeGeocoder(options);

// Define the latitude and longitude
const lat = 8.572839947797798;
const lng = 4.490035409111986;

// Reverse geocode the latitude and longitude
//openCageGeocoder.reverseGeocode(lat, lng)
//  .then((data) => {
//    const address = data.results[0].formatted;
//    console.log(address);
//  })
//  .catch((err) => {
//    console.log(err);
//  });

// Alternatively, you can use node-geocoder with OpenCage
geocoder.reverse({ lat, lon: lng })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
