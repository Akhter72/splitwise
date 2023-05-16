import {Provider, useDispatch, useSelector} from 'react-redux';
import {store} from './src/redux/store';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GlobalStyles} from './src/constants/styles';
import Homepage from './src/screens/Homepage';
import AddGroup from './src/screens/AddGroup';
import Expenses from './src/screens/Expenses';
import ManageExpense from './src/screens/ManageExpenses';
import AddUser from './src/screens/AddUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './src/screens/login';
import RegisterScreen from './src/screens/register';
import {View, Text} from 'react-native';
import {setAuthentication} from './src/redux/groupReducer';
import {useEffect, useLayoutEffect, useState} from 'react';
import LoadingOverlay from './src/components/UI/LoadingOverlay';
import 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

function DemoStack() {
  return (
    <View style={{flex: 1}}>
      <SideDrawer />
    </View>
  );
}

export function AuthenticatedStack() {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
          headerTintColor: 'white',
        }}>
        <Stack.Screen
          name="Homepage"
          component={Homepage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AddGroup"
          component={AddGroup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Expenses"
          component={Expenses}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ManageExpense"
          component={ManageExpense}
          options={{
            presentation: 'modal',
          }}
        />
        <Stack.Screen
          name="AddUser"
          component={AddUser}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </>
  );
}

function AuthStack() {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
          headerTintColor: 'white',
        }}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </>
  );
}

// async function getKeys() {
//   const dispatch = useDispatch();
//     const keys = await AsyncStorage.getAllKeys();
//     if(keys.includes('@loggedUser')) {
//       dispatch(setAuthentication(true));
//     }
// }

function Navigation() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    async function getKeys() {
      const keys = await AsyncStorage.getAllKeys();
      if (keys.includes('@loggedUser')) {
        dispatch(setAuthentication(true));
      }
      setLoading(false);
    }
    getKeys();
  });
  const authenticated = useSelector(state => state.groupReducer.authenticated);

  if (loading) {
    return <LoadingOverlay />;
  }

  return (
    <>
      {authenticated && <AuthenticatedStack />}
      {!authenticated && <AuthStack />}
    </>
  );
}
export default function App() {
  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </Provider>
    </>
  );
}
