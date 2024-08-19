import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import screens from './screens';
import HomeScreen from '../screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import CalculationTable from '../screens/CalcTable';
import Plot3DScreen from '../screens/Plot3DScreen';
const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
        <Stack.Navigator
      initialRouteName={screens.HOME}
      screenOptions={{
        gestureEnabled: false,
      }}
    >
      <Stack.Screen
        name={screens.HOME}
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={screens.CalculationTable}
        component={CalculationTable}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={screens.Plot3D}
        component={Plot3DScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigation