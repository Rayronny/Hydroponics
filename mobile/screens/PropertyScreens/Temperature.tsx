import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext, useState } from "react";
import GeneralLayout from "../../layouts/GeneralLayout";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import tw from "twrnc";
import { data } from "../../utils/data";
import { Store } from "../../context/Store";

type Props = {};

const Temperature = (props: Props) => {
  const [current_temp, setCurrentTemp] = useState(data.OPTIMAL_TEMP);

  const { dispatch } = useContext(Store);

  const increase_temp = () => {
    setCurrentTemp((current_temp) => current_temp + 1);
    dispatch({ type: "CHANGE_TEMP", payload: current_temp + 1 });
  };

  const decrease_temp = () => {
    setCurrentTemp((current_temp) => current_temp - 1);
    dispatch({ type: "CHANGE_TEMP", payload: current_temp - 1 });
  };

  return (
    <GeneralLayout>
      <View style={tw`flex flex-col px-2`}>
        <Text style={tw`text-2xl font-semibold text-gray-700`}>
          Temperature
        </Text>
        <Text style={tw`text-gray-400 text-sm`}>
          You can control temperature from here
        </Text>
        <View
          style={tw`flex flex-col w-full p-4 rounded-xl border border-gray-100 w-full my-8`}
        >
          <View style={tw`flex flex-row w-full justify-between pb-4`}>
            <View style={tw`flex flex-col`}>
              <Text style={tw`text-3xl font-semibold text-gray-800`}>
                {current_temp}&#8451;
              </Text>
              <Text style={tw`text-gray-400 text-sm`}>19 November 2022</Text>
            </View>
            {current_temp > data.OPTIMAL_TEMP + data.ERROR_MARGIN ? (
              <Text style={tw`text-lg font-semibold text-red-700`}>
                Above Required
              </Text>
            ) : current_temp < data.OPTIMAL_TEMP - data.ERROR_MARGIN ? (
              <Text style={tw`text-lg font-semibold text-gray-700`}>
                Below Required
              </Text>
            ) : (
              <Text style={tw`text-lg font-semibold text-green-700`}>
                Optimal
              </Text>
            )}
          </View>

          <View
            style={tw`relative flex flex-col bg-green-700 p-4 w-full rounded-xl`}
          >
            <View
              style={tw`absolute items-center self-center  right-0 left-0 -top-4 mr-auto ml-auto`}
            >
              <View
                style={tw`w-6 h-6 bg-white text-center rounded-full p-1 self-center`}
              ></View>
            </View>
            <View>
              <View style={tw`flex flex-row items-center justify-between`}>
                <TouchableOpacity
                  onPress={decrease_temp}
                  style={tw`flex flex-row items-center `}
                >
                  <MaterialCommunityIcons
                    name="thermometer-minus"
                    size={24}
                    color="white"
                  />
                  <View style={tw`flex flex-col ml-2`}>
                    <Text style={tw`text-white`}>Dec Temp</Text>
                    <Text style={tw`text-white text-lg font-bold`}>
                      {current_temp - 1}&#8451;
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={increase_temp}
                  style={tw`flex flex-row items-center `}
                >
                  <MaterialCommunityIcons
                    name="thermometer-plus"
                    size={24}
                    color="white"
                  />
                  <View style={tw`flex flex-col ml-2`}>
                    <Text style={tw`text-white`}>Inc Temp</Text>
                    <Text style={tw`text-white text-lg font-bold`}>
                      {current_temp + 1}&#8451;
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </GeneralLayout>
  );
};

export default Temperature;

const styles = StyleSheet.create({});
