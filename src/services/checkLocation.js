import { getDistance } from "geolib";
import axios from "axios";
import { Alert } from "react-native";


const val = {
  latitude: 28.548113, longitude: 77.332077
}
const checkDistance = (startCoords, destinationCoords) => {
  const distance = getDistance(
    { latitude: startCoords.latitude, longitude: startCoords.longitude },
    {latitude: val.latitude, longitude: val.longitude},
    //{ latitude: destinationCoords.latitude, longitude: destinationCoords.longitude }
  );

  if (distance <= 50) {
    Alert.alert(
      "Success",
      `Checkout successful! Distance: ${distance} meters`,
      [
        {
          text: "OK",
          onPress: () => console.log("OK Pressed"),
        },
      ]
    );
    return { isInRange: true, distance };
  } else {
    Alert.alert(
      "Cancel",
      `User is far away from the range. Distance: ${distance} meters`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ]
    );
    return { isInRange: false, distance };
  }
};


const fetchCoordinates = async (address) => {
  try {
    const response = await axios.get(
      `https://geocode.maps.co/search?city=Noida&state=Uttar%20Pradesh&postalcode=201301&country=India&api_key=670fb9252ce96160409503poe51d02d`
    );
    // const response = await axios.get(`https://geocode.maps.co/search?q=${encodeURIComponent(address)}&api_key=670fb9252ce96160409503poe51d02d`);

    if (response.data && response.data.length > 0) {
      const { lat, lon } = response.data[0];
      return { latitude: lat, longitude: lon };
    } else {
      throw new Error("No results found");
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    throw error;
  }
};

export { checkDistance, fetchCoordinates };