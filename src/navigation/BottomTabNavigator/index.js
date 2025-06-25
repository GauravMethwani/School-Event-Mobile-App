import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/HomeScreen';
import CreateEventScreen from '../../screens/CreateEventScreen';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: '#7E57C2',
        tabBarInactiveTintColor: '#999',
        tabBarLabelStyle: {
          fontSize: 13,
          paddingBottom: 4,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: '#ddd',
          height: 64, // slightly increased height
          paddingBottom: 6,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Create Event"
        component={CreateEventScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="create-outline" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
