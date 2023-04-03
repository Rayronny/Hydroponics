import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import tw from "twrnc";
import GeneralLayout from "../../layouts/GeneralLayout";
import TempComponent from "../../components/HomeComponents/TempComponent";
import HumidityComponent from "../../components/HomeComponents/HumidityComponent";
import PhComponent from "../../components/HomeComponents/PhComponent";
import DepthComponent from "../../components/HomeComponents/DepthComponent";
import LightComponent from "../../components/HomeComponents/LightComponent";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://192.168.198.150:5557/";

const socket = socketIOClient(ENDPOINT, {
  transports: ["websocket", "polling", "flashsocket"],
  forceNew: true,
  withCredentials: true,
});

type Props = {};

const Home = (props: Props) => {
  const [all_info, setAllInfo] = useState<any>();

  useEffect(() => {
    socket.on("values_updates", (data) => {
      setAllInfo(data);
      console.log("got info from backednfr", data);
    });
  }, [socket]);

  console.log("all info data", all_info);

  return (
    <GeneralLayout>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, flex: 1 }}>
          <StatusBar style="auto" />
          <View style={tw`flex flex-col w-full bg-white pb-4 flex-1 h-full`}>
            <View
              style={tw`flex flex-row items-center p-1 bg-gray-100 rounded`}
            >
              <View style={tw`bg-green-700 px-2 py-3 rounded flex-1`}>
                <Text style={tw`text-white text-xl font-semibold text-center`}>
                  Overview
                </Text>
              </View>
              <View style={tw`px-2 rounded flex-1`}>
                <Text
                  style={tw`text-gray-500 text-center text-xl font-semibold`}
                >
                  Notes
                </Text>
              </View>
            </View>
          </View>
          {/* weather info item on top of page */}
          {/* <>
          <CurrentWeather />
        </>
        <Text style={tw`text-2xl text-center text-gray-700 py-8`}>
          Properties
        </Text> */}
          {/* item for weather info */}
          <View style={tw`flex flex-col justify-between `}>
            <>
              <TempComponent value={all_info?.values?.temp} />
            </>

            <View style={tw`flex flex-row`}>
              {/* item fot humidity info */}
              <>
                <HumidityComponent value={all_info?.values?.humidity} />
              </>

              {/* item for winf info */}
              <>
                <PhComponent />
              </>
            </View>
            <View style={tw`flex flex-row pt-2`}>
              {/* item fot humidity info */}
              <>
                <DepthComponent value={all_info?.values?.distance} />
              </>

              {/* item for winf info */}
              <>
                <LightComponent value={all_info?.values?.light} />
              </>
            </View>
          </View>
        </ScrollView>
      </View>
    </GeneralLayout>
  );
};

export default Home;

const styles = StyleSheet.create({});
