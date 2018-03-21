import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default props => {
  return (
    <View style={styles.questionBubble}>
      <Text style={styles.smallHeading}>Utkarsh asked you</Text>
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
  questionBubble: {
    backgroundColor: "#18294f",
    marginVertical: 10,
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  buttonWrap: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
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
    color: "white"
  }
});
