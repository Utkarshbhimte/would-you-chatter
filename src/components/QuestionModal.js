import React from "react";
import {
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  View,
  Button
} from "react-native";

export default ({
  sendQuestion,
  changeQuestion,
  getQuestion,
  closeModal,
  options
}) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={!!options}
      onRequestClose={() => {
        alert("Modal has been closed.");
      }}
    >
      <View style={styles.modalWrap}>
        <View style={styles.modal}>
          <Text style={styles.wouldYouTopic}>Would you rather</Text>
          <View style={styles.optionWrap}>
            <View>
              <Text style={styles.option}>{options[0]}</Text>
            </View>
            <View>
              <Text
                style={[
                  styles.option,
                  { borderTopColor: "#d2d2d2", borderTopWidth: 1 }
                ]}
              >
                {options[1]}
              </Text>
            </View>
          </View>
          <View style={styles.buttonWrap}>
            <TouchableOpacity onPress={closeModal}>
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={getQuestion}>
              <Text>Another Question</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={sendQuestion}>
              <Text>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalWrap: {
    backgroundColor: "#00000094",
    flex: 1,
    display: "flex",
    justifyContent: "center"
  },
  modal: {
    backgroundColor: "white",
    paddingHorizontal: 25,
    paddingVertical: 20,
    display: "flex"
  },
  wouldYouTopic: {
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "center"
  },
  optionWrap: {
    display: "flex",
    alignSelf: "stretch",
    marginVertical: 40
  },
  option: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    textAlign: "center"
  },
  buttonWrap: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row"
  },
  button: {}
});
