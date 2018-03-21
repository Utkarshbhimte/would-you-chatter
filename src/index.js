import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

// Screens
import LoginScreen from "./screens/LoginScreen";
import ChatList from "./screens/ChatList";

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
      // if (data) console.log({ data });
      this.setState({ user });
    });
  };

  _logout = () => auth.signOut();

  render() {
    if (this.state.user) return <ChatList logOut={this._logout} />;
    else return <LoginScreen login={this._login} />;
  }
}
