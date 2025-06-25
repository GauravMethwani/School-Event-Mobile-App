import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { persistor, store } from '../src/redux';
import { PersistGate } from 'redux-persist/integration/react';
import RootNavigator from './navigation/RootNavigator';
import { useEffect } from 'react';
// import SplashScreen from 'react-native-splash-screen';
// import Toast from 'react-native-toast-message';
const App = () => {
  // useEffect(() => {
  //   SplashScreen.hide(); 
  // }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};
export default App;

