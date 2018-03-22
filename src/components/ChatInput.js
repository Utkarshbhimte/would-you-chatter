import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TextInput,
  StatusBar,
  TouchableOpacity
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default class ChatInput extends Component {
  onSubmit = async () => {
    await this.props.handleSubmit();
    await this.props.scrollToInput(this.refs.input);
  };
  onFocus = () => {
    this.props.scrollToInput(this.refs.input);
  };
  render() {
    return (
      <View style={styles.inputWrap}>
        <TouchableOpacity
          onPress={this.props.showQuestion}
          style={styles.triggerIcon}
        >
          <Ionicons name="ios-add" size={30} color="black" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          onChangeText={this.props.updateMessage}
          value={this.props.messagesText}
          blurOnSubmit={false}
          placeholder="Type a message..."
          autoCapitalize="none"
          autoCorrect={true}
          returnKeyType="send"
          ref="input"
          onSubmitEditing={this.onSubmit}
          onLayout={this.props.onInputLayout}
          onFocus={this.onFocus}
        />
        <TouchableOpacity style={styles.triggerIcon} onPress={this.onSubmit}>
          <Ionicons name="ios-send-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputWrap: {
    alignSelf: "stretch",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 5,
    borderTopWidth: 0.5,
    borderTopColor: "#c3c3c3"
  },
  triggerIcon: {
    height: 40,
    width: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    paddingVertical: 10,
    fontSize: 16,
    flex: 1
  }
});
