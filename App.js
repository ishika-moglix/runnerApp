import React from "react";
import Setup from "./src/boot/setup";
import { PermissionsAndroid } from 'react-native';
async function request_READ_PHONE_STATE() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
            {
                'title': 'Read Device Information ',
                'message': 'We Need Device information for some security.'
            }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the camera")
        } else {
            console.log("Camera permission denied")
        }
    } catch (err) {
        console.warn(err)
    }
};
export default class App extends React.Component {
    async componentDidMount() {

        await request_READ_PHONE_STATE() ;

    }
  render() {

    return <Setup />;
  }
}
