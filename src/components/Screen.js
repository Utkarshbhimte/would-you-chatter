import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Constants } from "expo";

export default ({ title, children, showStatusBar }) => {
  return (
    <View style={styles.container}>
      {showStatusBar && <View style={styles.statusBar} />}
      {title && (
        <View style={styles.appHeader}>
          <Text style={styles.appHeaderText}>{title}</Text>
        </View>
      )}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: "#c3c3c3",
    height: Constants.statusBarHeight,
    alignSelf: "stretch"
  },
  appHeader: {
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  appHeaderText: {
    fontSize: 18
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
