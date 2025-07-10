import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, HomeScreen } from '../pages/HomeScreen/HomeScreen';
import { NewNote, NewNoteScreen } from '../pages/NewNoteScreen/NewNoteScreen';
import Icon from '@react-native-vector-icons/lucide';
import styles from '../styles/styles';
import { Platform } from 'react-native';
import { ReportScreen } from '../pages/ReportScreen/ReportScreen';
import { PromptScreen } from '../pages/PromptScreen/PromptScreen';
import { AccountScreen } from '../pages/AccountScreen/AccountScreen';
import { DefaultNavigatorOptions } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const screenOptions = ({ route }) => ({
  tabBarStyle: {
    height: 100,
  },
  tabBarItemStyle: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  tabBarIcon: ({ focused }) => {
    var iconMap = {
      Home: 'house',
      Prompt: 'box',
      NewNote: 'plus',
      Report: 'smile',
      Account: 'user',
    };
    var icon = iconMap[route.name];
    var color = focused ? 'black' : 'grey';
    return <Icon name={icon} size={30} color={color} />;
  },
  tabBarLabelStyle: {
    fontSize: 15,
    fontFamily: Platform.select({
      android: 'monospace',
      ios: 'Futura',
    }),
    textAlign: 'center',
  },
  tabBarShowLabel: false,
  tabBarInactiveTintColor: 'grey',
  tabBarActiveTintColor: 'black',
  animation: 'shift',
});

export const BottomTabBar = () => {
  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Prompt"
        component={PromptScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="NewNote"
        component={NewNoteScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Report"
        component={ReportScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};
