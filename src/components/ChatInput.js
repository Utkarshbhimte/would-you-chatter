import React from "react";
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

export default ({ messagesText, updateMessage, handleSubmit }) => {
  return (
    <View style={styles.inputWrap}>
      <TouchableOpacity style={styles.triggerIcon}>
        <Ionicons name="ios-add" size={30} color="black" />
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        onChangeText={updateMessage}
        value={messagesText}
        placeholder="Type a message..."
        autoCapitalize="none"
        autoCorrect={true}
        returnKeyType="send"
        onSubmitEditing={handleSubmit}
        blurOnSubmit={true}
      />
      <TouchableOpacity style={styles.triggerIcon} onPress={handleSubmit}>
        <Ionicons name="ios-send-outline" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

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
