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

import { messages } from "../components/sampleData";
import Screen from "../components/Screen";
import QuestionBubble from "../components/QuestionBubble";

export default class ChatScreen extends Component {
  state = {
    messages
  };

  renderBubble = (message, index) => {
    if (message.type === "text")
      return (
        <View
          key={index}
          style={[
            message.sender === "me" ? styles.receivedBubble : styles.sentBubble,
            styles.chatBubble
          ]}
        >
          <Text>{message.text + "   " + index}</Text>
        </View>
      );
    if (message.type === "question")
      return <QuestionBubble key={index} {...message} />;
  };
  render() {
    return (
      <Screen>
        <StatusBar barStyle="light-content" />
        <ScrollView style={styles.messageWrap}>
          {this.state.messages.map(this.renderBubble)}
        </ScrollView>
        <View style={styles.inputWrap}>
          <TouchableOpacity style={styles.triggerIcon}>
            <Ionicons name="ios-add" size={30} color="black" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            onChangeText={email => this.setState({ email })}
            ref={ref => (this._emailInput = ref)}
            placeholder="Type a message..."
            autoCapitalize="none"
            autoCorrect={true}
            returnKeyType="send"
            // onSubmitEditing={this._submit}
            blurOnSubmit={true}
          />
        </View>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  messageWrap: {
    flex: 1,
    flexDirection: "column",
    width: "100%"
  },
  chatBubble: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 0,
    marginVertical: 3,
    marginHorizontal: 5,
    alignSelf: "stretch",
    borderLeftWidth: 3
  },
  sentBubble: {
    borderLeftColor: "#fc5a7d"
  },
  receivedBubble: {
    borderLeftColor: "#32ccf4"
  },
  inputWrap: {
    alignSelf: "stretch",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 5
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
    fontSize: 20,
    flex: 1
  }
});
