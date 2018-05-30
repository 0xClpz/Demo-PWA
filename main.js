const humanReadableDate = timeStamp => {
  let newDate = new Date();
  newDate.setTime(timeStamp);
  return newDate.toLocaleTimeString();
};

const setWheather = ({ temp, updatedAt }) => {
  const mount = document.getElementById("mount-point");
  mount.innerHTML = `It's ${temp}°C outside, last update was made at ${humanReadableDate(
    updatedAt
  )}`;
};

// To make sure the cache doesn't override the network value
let networkReceiveData = false;

fetch("http://localhost:9000/wheather")
  .then(res => res.json())
  .then(res => {
    setWheather(res);
    networkReceiveData = true;
  })
  .catch(() => {
    console.log("the server is down!");
  });

caches
  .match("http://localhost:9000/wheather")
  .then(response => response.json())
  .then(response => {
    if (response && !networkReceiveData) {
      setWheather(response);
    }
  });
