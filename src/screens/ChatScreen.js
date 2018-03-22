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

import { messages } from "../components/sampleData";
import Screen from "../components/Screen";
import QuestionBubble from "../components/QuestionBubble";
import ChatInput from "../components/ChatInput";

import firebase from "firebase";

export default class ChatScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages,
      messagesText: "",
      loading: true
    };

    this.dbRef = firebase.database().ref(`chat-rooms/test-room`);
    this.user = {
      name: this.props.user.displayName,
      uid: this.props.user.uid
    };
  }

  componentDidMount = () => {
    this.dbRef.on("value", snapshot => {
      const messages =
        snapshot && !!snapshot.val() ? Object.values(snapshot.val()) : [];

      this.setState({
        messages,
        loading: false
      });
    });
  };

  _handleSubmit = async () => {
    const messagesText = this.state.messagesText;

    if (messagesText && messagesText !== "") {
      const newMessageRef = await this.dbRef.push();
      const newMessageKey = newMessageRef.getKey();

      newMessageRef.set({
        _id: newMessageKey,
        type: "text",
        text: messagesText,
        sender: this.user
      });

      // http://graph.facebook.com/67563683055/picture?type=square
      await this.setState({ messagesText: "" });
    }
  };

  renderBubble = (message, index) => {
    const sameSender =
      index > 0 &&
      this.state.messages[index - 1].sender.uid === message.sender.uid;

    const myMessage = message.sender === this.user.uid;

    if (message.type === "text")
      return (
        <View
          key={index}
          style={[
            myMessage ? styles.receivedBubble : styles.sentBubble,
            styles.chatBubble,
            {
              marginTop: sameSender ? -2 : 3,
              paddingTop: sameSender ? 0 : 3
            }
          ]}
        >
          <Text>{message.text}</Text>
        </View>
      );
    if (message.type === "question")
      return <QuestionBubble key={index} {...message} />;
  };
  render() {
    return (
      <Screen title="Utkarsh" showStatusBar>
        <ScrollView style={styles.messageWrap}>
          {/* Messages */}
          {!this.state.loading && this.state.messages.map(this.renderBubble)}

          {/* Loading Tag */}
          {this.state.loading && (
            <Text style={styles.emptyIndicator}>Loading . . .</Text>
          )}

          {/* Empty Tag */}
          {!this.state.loading &&
            this.state.messages.length === 0 && (
              <Text style={styles.emptyIndicator}>There are no messages</Text>
            )}
        </ScrollView>

        {/* Chat Input */}
        <ChatInput
          messagesText={this.state.messagesText}
          updateMessage={messagesText => this.setState({ messagesText })}
          handleSubmit={this._handleSubmit}
        />
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
    paddingBottom: 2,
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
  },
  emptyIndicator: {
    textAlign: "center",
    opacity: 0.6
  }
});
