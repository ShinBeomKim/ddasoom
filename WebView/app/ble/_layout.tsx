import React from "react";
import { Stack } from "expo-router";

const BleLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="index">
      <Stack.Screen name="index" options={{ presentation: "transparentModal" }} />
    </Stack>
  );
};

export default BleLayout;