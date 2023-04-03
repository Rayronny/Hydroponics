import React from "react";
import { ReactNode } from "react";
import { StyleSheet, View, ScrollView, SafeAreaView, Text } from "react-native";
import tw from "twrnc";
import CustomHeader from "../components/Navigation/CustomHeader";

type Props = {
  children?: ReactNode;
};

const GeneralLayout = ({ children }: Props) => {
  return (
    <SafeAreaView style={[tw`bg-white`,{ flex: 1 }]}>
      <View>
        <CustomHeader />
      </View>
      <ScrollView
        style={[
          tw`min-h-full flex-1`,
          { paddingHorizontal: 5, backgroundColor: "#fff" },
        ]}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

export default GeneralLayout;
