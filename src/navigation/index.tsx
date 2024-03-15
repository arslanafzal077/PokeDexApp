// navigation/AppNavigator.tsx
import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import HomeScreen from '../screens/Home';
import AddPokemonScreen from '../screens/AddPokemon';
import ViewPokemonScreen from '../screens/ViewPokemon';

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS, // Use transition animation
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddPokemon" component={AddPokemonScreen} />
      <Stack.Screen name="ViewPokemon" component={ViewPokemonScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
