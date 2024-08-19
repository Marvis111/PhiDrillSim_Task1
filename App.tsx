import React, {useEffect} from "react";
import {SafeAreaProvider} from "react-native-safe-area-context";

import {Platform} from "react-native";
import AppNavigation from "./navigations/AppNavigation";
const App = () => {
  useEffect(() => {
    if (Platform.OS === "android") {
      
    }
  }, []);
  return (
    <SafeAreaProvider>
        <AppNavigation />
    </SafeAreaProvider>
  );
};

export default App;
