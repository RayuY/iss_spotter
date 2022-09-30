const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require("./iss.js");


fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!: ", error);
    return;
  }

  console.log("It worked! Returned IP:", ip);

  fetchCoordsByIP(ip, (error, data) => {
    if (error) {
      console.log("it didn't work!", error);
      return;
    }
    console.log('It worked! Returned coordinates:', data);

    fetchISSFlyOverTimes(data, (error, message) => {
      if(error) {
        console.log("Error: ", data);
        return
      }
      console.log("Flyover times:", message);
    }
    );
  })
});