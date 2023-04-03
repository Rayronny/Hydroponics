import React, { useState } from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import tw from "twrnc";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";


const CustomHeader = () => {
  const navigation = useNavigation();


  return (
    <SafeAreaView style={[tw`bg-white`, styles.header]}>
      <View
        style={tw`flex flex-row w-full items-center justify-between my-auto`}
      >

        <>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7} style={tw`p-2 rounded-full bg-gray-100`}>
            <Entypo name="chevron-thin-left" size={22} color="#4B5563" />
          </TouchableOpacity>
         
          <TouchableOpacity activeOpacity={0.7} style={tw`p-2 rounded-full bg-gray-100`}>
            <Entypo name="dots-three-horizontal" size={22} color="#4B5563" />
          </TouchableOpacity>
        </>
      </View>
    </SafeAreaView>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  header: {
    height: 100,
    padding: 10,
    overflow: "hidden",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },


});
