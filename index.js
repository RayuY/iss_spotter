const { nextISSTimesForMyLocation } = require("./iss.js");



const printTime = function(passTimes) {
  for (const value of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(value.risetime);
    const duration = value.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};


nextISSTimesForMyLocation((error, passTime) => {
  if (error) {
    console.log("Error: ", error);
    return
  }
  printTime(passTime);
  
});