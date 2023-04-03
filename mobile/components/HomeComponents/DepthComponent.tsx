import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons';

type Props = {
  value: number
};

const DepthComponent = ({value}: Props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      // @ts-ignore
      onPress={() => navigation.navigate("humidity")}
      style={tw`flex flex-col mr-2 flex-1`}
    >
      <View style={tw`flex flex-col flex-1 bg-gray-100 rounded-lg p-2`}>
        <View style={tw`flex flex-row`}>
          <View style={tw`flex flex-row bg-orange-700 p-2 rounded-full`}>
            <MaterialIcons name="height" size={24} color="white" />
          </View>
        </View>
        <Text style={tw`text-xl text-gray-500 py-4`}>Water Level</Text>
        <Text style={tw`text-3xl font-semibold text-gray-800 pb-2 text-center`}>
          {" "}
          {value}cm
        </Text>
        <View style={tw`border-t border-gray-300 flex-1 pb-2`} />
        <Text style={tw`text-center text-lg text-red-700`}>Info</Text>
      </View>
    </TouchableOpacity>
  );
};

export default DepthComponent;

const styles = StyleSheet.create({});
