import { StatusBar } from "expo-status-bar";
import React, { ReactNode } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import tw from "twrnc";
import ExploreHeader from "../components/Navigation/ExploreHeader";

interface Props {
  children?: ReactNode;
  header_title?: string;
  header__back__activity?: () => void;
}

const ExploreLayout = ({
  children,
  header_title,
  header__back__activity,
}: Props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={tw`flex-1`}>
        <StatusBar style="light" />
        <View>
          <ExploreHeader
            heading__title={header_title}
            header__back__activity={header__back__activity}
          />
        </View>
        <View style={tw`bg-gray-50 px-2 flex-1 w-full`}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExploreLayout;

const styles = StyleSheet.create({});
