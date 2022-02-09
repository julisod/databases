import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'; //npm install @react-navigation/native
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; //npm install @react-navigation/bottom-tabs
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
//expo install react-native-screens react-native-safe-area-context

import Sqlite from './components/Sqlite';
import Firebase from './components/Firebase';

const screenOptions = ({ route }) => ({
  tabBarIcon: () => {
    if (route.name === 'SQLite') {
      return <FontAwesome5 name="feather" size={24} color="black" />;
    } else if (route.name === 'Firebase') {
      return <Ionicons name="logo-firebase" size={24} color="black" />
    }
  }
});

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="SQLite" component={Sqlite} />
        <Tab.Screen name="Firebase" component={Firebase} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
