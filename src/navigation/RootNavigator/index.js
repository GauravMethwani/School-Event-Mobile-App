// src/navigation/RootNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from '../../navigation/BottomTabNavigator';
import EventDetailsScreen from '../../screens/EventDetailsScreen';
import UpdateEventScreen from '../../screens/UpdateEventScreen';
import HomeScreen from '../../screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      {/* Bottom Tabs under Stack */}
      <Stack.Screen
        name="MainTabs"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />

      {/* Event Detail Page (navigate here from Home) */}
      <Stack.Screen
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        name="EventDetail"
        component={EventDetailsScreen}
        options={{ title: 'Event Detail' }}
      />
      <Stack.Screen
        name="UpdateEvent"
        component={UpdateEventScreen}
        options={{ title: 'Update Event' }}
      />
    </Stack.Navigator>
  );
}
