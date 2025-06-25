import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../../screens/HomeScreen';
// import StudentListScreen from './screens/StudentListScreen';
import CustomHeader from '../../component/CustomHeader';
import EventDetailsScreen from '../../screens/EventDetailsScreen';
import UpdateEventScreen from '../../screens/UpdateEventScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          header: () => <CustomHeader showBrand={true} />,
        }}
      />
      <Stack.Screen
        name="EventDetail"
        component={EventDetailsScreen}
        options={{
          header: () => <CustomHeader title="Event Detail" />,
        }}
      />
      <Stack.Screen
        name="CreateEvent"
        component={CreateEventScreen}
        options={{ title: 'Create Event' }}
      />
      <Stack.Screen
        name="UpdateEvent"
        component={UpdateEventScreen}
        options={{ title: 'Update Event' }}
      />
    </Stack.Navigator>
  );
}
