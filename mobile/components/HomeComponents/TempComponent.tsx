import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useContext } from "react";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { Store } from "../../context/Store";
import { data } from "../../utils/data";

type Props = {
  value:number
};

const TempComponent = ({value}: Props) => {
  const navigation = useNavigation();
  const { state } = useContext(Store);
  const { current_temp } = state;

  return (
    <TouchableOpacity
      // @ts-ignore
      onPress={() => navigation.navigate("temperature")}
      style={tw`flex flex-col flex-1 mb-2`}
    >
      <View style={tw`flex flex-col flex-1 bg-gray-100 rounded-lg p-2`}>
        <View style={tw`flex flex-row items-center justify-between`}>
          <View style={tw`flex flex-col`}>
            <View style={tw`flex flex-row bg-green-700 p-2 rounded-full`}>
              <MaterialCommunityIcons
                name="coolant-temperature"
                size={24}
                color="white"
              />
            </View>
          <Text style={tw`text-xl text-gray-500 py-4`}>Temp</Text>
          </View>
          {current_temp > data.OPTIMAL_TEMP + data.ERROR_MARGIN ? (
            <Text style={tw`text-lg font-semibold text-red-700`}>
              Above Required
            </Text>
          ) : current_temp < data.OPTIMAL_TEMP - data.ERROR_MARGIN ? (
            <Text style={tw`text-lg font-semibold text-blue-700`}>
              Below Required
            </Text>
          ) : (
            <Text style={tw`text-lg font-semibold text-green-700`}>
              Optimal
            </Text>
          )}
        </View>
        <Text style={tw`text-3xl font-semibold text-gray-800 pb-2 text-center`}>
          {" "}
          {value ? value : current_temp}&#8451;
        </Text>
        <View style={tw`border-t border-gray-300 flex-1 pb-2`} />
        <Text style={tw`text-center text-lg text-red-700`}>Info</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TempComponent;

const styles = StyleSheet.create({});
