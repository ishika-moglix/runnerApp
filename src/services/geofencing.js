import * as geolib from "geolib";
import { isPointWithinRadius } from "geolib";
import { markDelivered } from "./tasks";
import { Alert } from "react-native";
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import axios from 'axios';


const checkLocation = async (data) => {
   
//const { latitude, longitude } = await markDelivered(data);
const userLocation = { latitude: data.latitude, longitude: data.longitude };

/*switch(type){
    case 'markDelivered': centerPoint = { latitude: 51.5175, longitude: 7.4678 };
    return centerPoint;

    case 'itemPickedup': centerPoint = {latitude: 51.5175, longitude: 7.4678 };
    return centerPoint;
}*/

const centerPoint = { latitude: 51.5175, longitude: 7.4678 };
const radius = 5000;


const isWithinRadius = isPointWithinRadius(userLocation, centerPoint, radius);
let message = "";

if (isWithinRadius) {
  message= "User is within the geofence!";
  console.log("User is within the geofence!");
} else {
  message= "User is outside the geofence!";
  console.log("User is outside the geofence.");
}

Alert.alert(
  "geo fencing",
  message[
    ({
      text: "Cancel",
      onpress: () => console.log("cancel Pressed"),
      style: "cancel",
    },
    {
      text: "Ok",
      onpress: () => console.log("OK Pressed"),
    })
  ]
);
}





export{
    checkLocation
};