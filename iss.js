/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require("request");

const fetchMyIP = function (callback) {
  // use request to fetch IP address from JSON API
  let url = "https://api.ipify.org/?format=json"
  request(url, (error, response, body) => {

    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    ipParsed = JSON.parse(body).ip;
    return callback(null, ipParsed);

  })
}

const fetchCoordsByIP = function (ip, callback) {
  let url = `http://ipwho.is/${ip}`
  request(url, (error, response, body) => {

    if (error) {
      return callback(error, null);
    }

    const parsedBody = JSON.parse(body);
    if (!parsedBody.success) {
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      callback(Error(message), null);
      return;
    }

    latitude = JSON.parse(body).latitude;
    longitude = JSON.parse(body).longitude;
    let obj = { latitude, longitude }

    return callback(null, obj);

  })
}

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
 const fetchISSFlyOverTimes = function(coords, callback) {
  let lon = coords.longitude
  let lat = coords.latitude

  let url = `https://iss-flyover.herokuapp.com/json/?lat=${lat}&lon=${lon}`
  request(url, (error, response, body) => {

    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    let output = JSON.parse(body).response;
    return callback(null, output);


  })
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };
