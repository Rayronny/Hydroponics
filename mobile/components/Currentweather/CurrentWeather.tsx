import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";

type Props = {};

const CurrentWeather = (props: Props) => {
  return (
    <View style={tw`relative flex flex-col bg-gray-50 p-2 w-full rounded-lg`}>
      <View
        style={tw`absolute items-center self-center  right-0 left-0 mr-auto ml-auto`}
      >
        <View
          style={tw`w-1/3 bg-green-700 text-center rounded-b-3xl p-1 self-center`}
        >
          <Text style={tw`text-center text-white `}>Chihoyi</Text>
        </View>
      </View>
      <View style={tw`mt-5 flex flex-row items-center`}>
        <View style={tw`flex flex-col`}>
          <Text style={tw`text-gray-400 text-sm pt-2`}>Today, 12 Dec 2022</Text>
          <View style={tw`flex flex-row items-end py-4`}>
            <Text style={tw`text-green-700 text-5xl font-semibold`}>
              {" "}
              23&#8451;
            </Text>
            <Text style={tw`text-gray-400 text-xl font-semibold`}>
              /17&#8451;
            </Text>
          </View>
          <Text style={tw`text-gray-500`}>A sun with a cool</Text>
        </View>
        <View style={tw`pl-2 justify-center flex flex-col items-center flex-1`}>
          <Image
            style={{ width: 110, height: 100 }}
            source={require("../../assets/imgs/partly-cloudy.png")}
          />
        </View>
      </View>
    </View>
  );
};

export default CurrentWeather;

const styles = StyleSheet.create({});
