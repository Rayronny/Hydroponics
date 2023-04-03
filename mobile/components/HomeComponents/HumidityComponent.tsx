import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import React from "react";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";

type Props = {
  value: number
};

const HumidityComponent = ({value}: Props) => {
    const navigation = useNavigation();
  return (
    <TouchableOpacity
      // @ts-ignore
      onPress={() => navigation.navigate("humidity")}
      style={tw`flex flex-col mr-2 flex-1`}
    >
      <View style={tw`flex flex-col flex-1 bg-gray-100 rounded-lg p-2`}>
        <View style={tw`flex flex-row`}>
          <View style={tw`flex flex-row bg-blue-700 p-2 rounded-full`}>
            <Feather name="droplet" size={24} color="white" />
          </View>
        </View>
        <Text style={tw`text-xl text-gray-500 py-4`}>Humidity</Text>
        <Text style={tw`text-3xl font-semibold text-gray-800 pb-2 text-center`}>
          {" "}
          {value}&#x25;
        </Text>
        <View style={tw`border-t border-gray-300 flex-1 pb-2`} />
        <Text style={tw`text-center text-lg text-red-700`}>Info</Text>
      </View>
    </TouchableOpacity>
  );
};

export default HumidityComponent;

const styles = StyleSheet.create({});
