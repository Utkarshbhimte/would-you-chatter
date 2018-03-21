import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Screen from "../components/Screen";

export default class LoginScreen extends Component {
  render() {
    return (
      <Screen>
        <Text>You are currently not logged in </Text>
        <Button onPress={this.props.login} title="Login" />
      </Screen>
    );
  }
}
