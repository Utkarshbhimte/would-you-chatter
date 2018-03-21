import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import LoginScreen from "./src/screens/LoginScreen";
import ChatList from "./src/screens/ChatList";

export default class App extends React.Component {
  state = {
    user: null
  };

  _login = () => this.setState({ user: "Utkarsh Bhimte" });

  _logout = () => this.setState({ user: null });

  render() {
    if (this.state.user) return <ChatList logout={this._logout} />;
    else return <LoginScreen login={this._login} />;
  }
}
