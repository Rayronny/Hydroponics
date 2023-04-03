import { StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

type Props = {};

const ProperrtyItem = (props: Props) => {
  return (
    <View style={tw`flex flex-col flex-1`}>
      <View style={tw`flex flex-col flex-1 bg-gray-100 rounded-lg p-2`}>
        <View style={tw`flex flex-row`}>
          <View style={tw`flex flex-row bg-green-700 p-2 rounded-full`}>
            <MaterialCommunityIcons
              name="coolant-temperature"
              size={24}
              color="white"
            />
          </View>
        </View>
        <Text style={tw`text-xl text-gray-500 py-4`}>Soil Temp</Text>
        <Text style={tw`text-3xl font-semibold text-gray-800 pb-2 text-center`}>
          {" "}
          +23&#8451;
        </Text>
        <View style={tw`border-t border-gray-300 flex-1 pb-2`} />
        <Text style={tw`text-center text-lg text-green-700`}>Info</Text>
      </View>
    </View>
  );
};

export default ProperrtyItem;

const styles = StyleSheet.create({});
