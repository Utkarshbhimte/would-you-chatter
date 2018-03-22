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
import ReactNative from "react-native";

import { messages } from "../components/sampleData";
import Screen from "../components/Screen";
import QuestionBubble from "../components/QuestionBubble";
import ChatInput from "../components/ChatInput";
import QuestionModal from "../components/QuestionModal";

import firebase from "firebase";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import sample from "lodash/sample";

export default class ChatScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages,
      messagesText: "",
      loading: true,
      ratherQuestion: null,
      scrollViewHeight: 0,
      inputHeight: 0
    };

    this.dbRef = firebase.database().ref(`chat-rooms/test-room`);
    this.user = {
      name: this.props.user.displayName,
      uid: this.props.user.uid
    };
  }

  componentDidMount = async () => {
    await this._fetchMessages();
    await this.scrollToBottom(false);
    this._fetchQuestions();
  };

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom(animate = true) {
    const { scrollViewHeight, inputHeight } = this.state,
      { chatHeight } = this.props;

    const scrollTo = chatHeight - scrollViewHeight + inputHeight;

    if (scrollTo > 0) {
      this.refs.scroll.scrollToPosition(0, scrollTo, animate);
    }
  }

  _scrollToInput = reactRef =>
    this.refs.scroll.scrollToFocusedInput(ReactNative.findNodeHandle(reactRef));

  _fetchMessages = () =>
    this.dbRef.on("value", snapshot => {
      const messages =
        snapshot && !!snapshot.val() ? Object.values(snapshot.val()) : [];

      this.setState({
        messages,
        loading: false
      });
    });

  _fetchQuestions = async () => {
    const ref = firebase.database().ref(`questions`);
    const questionSnapshot = await ref.once("value");

    const questions = questionSnapshot && questionSnapshot.val();

    this.questions = questions;
  };

  _getRandomQuestion = async () => {
    const ratherQuestion = await sample([...this.questions]).options;
    await this.setState({ ratherQuestion });
  };

  _handleSubmit = async e => {
    this._scrollToInput(e);
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

  _sendQuestion = async () => {
    const newMessageRef = await this.dbRef.push();
    const newMessageKey = newMessageRef.getKey();

    newMessageRef.set({
      _id: newMessageKey,
      type: "question",
      sender: this.user,
      options: this.state.ratherQuestion
    });

    // http://graph.facebook.com/67563683055/picture?type=square
    await this.setState({ ratherQuestion: null });
  };

  renderBubble = (message, index) => {
    const sameSender =
      index > 0 &&
      this.state.messages[index - 1].type !== "question" &&
      this.state.messages[index - 1].sender.uid === message.sender.uid;

    const myMessage = message.sender.uid === this.user.uid;

    const joinedQuestions =
      index > 0 && this.state.messages[index - 1].type === "question";

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
      return (
        <QuestionBubble
          key={index}
          {...message}
          isSender={myMessage}
          joinedQuestions={joinedQuestions}
        />
      );
  };

  render() {
    return (
      <Screen title="Utkarsh" showStatusBar>
        {this.state.ratherQuestion && (
          <QuestionModal
            getQuestion={this._getRandomQuestion}
            sendQuestion={this._sendQuestion}
            closeModal={() => this.setState({ ratherQuestion: null })}
            options={this.state.ratherQuestion}
          />
        )}
        <KeyboardAwareScrollView
          ref="scroll"
          onLayout={this.onScrollViewLayout}
        >
          <View style={styles.messageWrap}>
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
          </View>

          {/* Chat Input */}
          <ChatInput
            scrollToBottom={this.scrollToBottom}
            onInputLayout={this.onInputLayout}
            scrollToInput={this._scrollToInput.bind(this)}
            showQuestion={this._getRandomQuestion}
            messagesText={this.state.messagesText}
            updateMessage={messagesText => this.setState({ messagesText })}
            handleSubmit={this._handleSubmit}
          />
        </KeyboardAwareScrollView>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  messageWrap: {
    flex: 1,
    alignSelf: "stretch",
    flexDirection: "column",
    paddingBottom: 20
  },
  chatBubble: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    alignSelf: "stretch",
    paddingBottom: 2,
    marginHorizontal: 5,
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
