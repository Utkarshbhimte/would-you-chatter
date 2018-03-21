import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";

import Screen from "../components/Screen";

export default class ChatList extends Component {
  render() {
    return (
      <Screen>
        <Text>You are now logged in!</Text>
        <Button onPress={this.props.logout} title="Log out" />
      </Screen>
    );
  }
}
