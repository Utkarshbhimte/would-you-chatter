import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import firebase from "firebase";

// Common Components
import Screen from "../components/Screen";

export default class LoginScreen extends Component {
  state = {
    loading: false
  };
  _facebookLogin = async () => {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
      "224342114810183",
      { permissions: ["public_profile", "user_friends", "email"] }
    );

    if (type === "success") {
      // Sending the token to firebase
      const credential = firebase.auth.FacebookAuthProvider.credential(token);

      firebase
        .auth()
        .signInWithCredential(credential)
        .catch(err => console.error(err));

      // Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
    }
  };
  render() {
    return (
      <Screen>
        {!this.state.loading && (
          <Button onPress={this._facebookLogin} title="Login with Facebook" />
        )}
        {this.state.loading && <Text>Loading. . . </Text>}
      </Screen>
    );
  }
}
