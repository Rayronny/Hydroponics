import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import React from "react";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";

type Props = {};

const PhComponent = (props: Props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      // @ts-ignore
      onPress={() => navigation.navigate("ph")}
      style={tw`flex flex-col flex-1`}
    >
      <View style={tw`flex flex-col flex-1 bg-gray-100 rounded-lg p-2`}>
        <View style={tw`flex flex-row`}>
          <View style={tw`flex flex-row bg-green-700 p-2 rounded-full`}>
            <Feather name="wind" size={24} color="white" />
          </View>
        </View>
        <Text style={tw`text-xl text-gray-500 py-4`}>pH</Text>
        <Text style={tw`text-3xl font-semibold text-gray-800 pb-2 text-center`}>
          {" "}
          6
        </Text>
        <View style={tw`border-t border-gray-300 flex-1 pb-2`} />
        <Text style={tw`text-center text-lg text-red-700`}>Info</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PhComponent;

const styles = StyleSheet.create({});
