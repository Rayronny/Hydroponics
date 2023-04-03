import React, { ReactNode } from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  heading__title?: string;
  header__back__activity?: () => void;
}

const ExploreHeader = ({ heading__title, header__back__activity }: Props) => {
  return (
    <View style={styles.header}>
      <ExpoStatusBar style="auto" />
      <View style={styles.header__top}>
        <TouchableOpacity onPress={header__back__activity}>
          <Ionicons name="chevron-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <View>
          <Text style={{ fontSize: 25, color: "#374151" }}>
            {heading__title}
          </Text>
        </View>
        <Ionicons name="chevron-back-outline" size={24} color="white" />
      </View>
    </View>
  );
};

export default ExploreHeader;

const styles = StyleSheet.create({
  header: {
    height: 100,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#fff",
    borderBottomColor: "#F3F4F6", // if you need
    borderBottomWidth: 1,
    overflow: "hidden",
    shadowColor: "#F3F4F6",
    shadowRadius: 10,
    shadowOpacity: 1,
  },
  header__top: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
    marginBottom: 10,
  },
});
