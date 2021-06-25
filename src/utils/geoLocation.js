export default function geoLocation() {
  return new Promise((resolve, reject) => {
    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      resolve({
        lat: latitude,
        long: longitude,
      });
    }

    function error() {
      console.error("Unable to retrieve your location");
    }
    if (!navigator.geolocation) {
      console.info("Geolocation is not supported by your browser");
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  });
}
