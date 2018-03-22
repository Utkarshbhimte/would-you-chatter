import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

// Screens
import LoginScreen from "./screens/LoginScreen";
import ChatList from "./screens/ChatList";
import ChatScreen from "./screens/ChatScreen";

// Components
import firebase from "firebase";
import "./components/firebaseConfig";

const auth = firebase.auth();

export default class App extends React.Component {
  state = {
    user: null
  };

  componentDidMount = () => {
    auth.onAuthStateChanged(data => {
      user = data ? data.providerData[0] : null;
      this.setState({ user });
    });
  };

  _logout = () => auth.signOut();
  render() {
    if (this.state.user)
      return <ChatScreen user={this.state.user} logOut={this._logout} />;
    else return <LoginScreen user={this.state.user} login={this._login} />;
  }
}
