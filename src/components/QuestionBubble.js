import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default props => {
  if (!props.isSender)
    return (
      <View
        style={[
          styles.questionBubble,
          { marginTop: props.joinedQuestions ? 2 : 5 }
        ]}
      >
        <Text style={styles.smallHeading}>
          {`${props.sender.name} asked you`}
        </Text>
        <Text style={styles.wouldYouHeading}>Would you rather</Text>
        <View style={styles.buttonWrap}>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.buttonText}>{props.options[0]}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Text style={styles.buttonText}>{props.options[1]}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  else
    return (
      <View
        style={[
          styles.questionBubble,
          { marginTop: props.joinedQuestions ? 2 : 5 }
        ]}
      >
        <Text style={styles.smallHeading}>Question sent</Text>
        <Text style={styles.sentQuestion}>{`Would you rather ${
          props.options[0]
        } or ${props.options[1]}?`}</Text>
      </View>
    );
};

const styles = StyleSheet.create({
  smallHeading: {
    fontSize: 12,
    textAlign: "center",
    color: "white",
    opacity: 0.8
  },
  wouldYouHeading: {
    textAlign: "center",
    marginVertical: 5,
    fontSize: 18,
    marginHorizontal: 5,
    color: "#32ccf4",
    fontWeight: "bold"
  },
  sentQuestion: {
    textAlign: "center",
    color: "white"
  },
  questionBubble: {
    backgroundColor: "#18294f",
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  buttonWrap: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center"
  },
  option: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
    minHeight: 60
  },
  buttonText: {
    color: "white",
    textAlign: "center"
  }
});
