import type { StaticParamList } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabBar } from './BottomTabBar';
import { RootStackParamList } from './type';
import { IntroductionScreen1 } from '../pages/LoginScreens/IntroScreen1/index.tsx';
import { NotesScreen } from '../pages/MainScreens/NotesScreen/NotesScreen.tsx';
import { MyAccountScreen } from '../pages/MainScreens/MyAccountScreen/MyAccountScreen.tsx';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const RootStackNavigator = () => {
  return (
    <RootStack.Navigator
      initialRouteName="TabBar"
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
    >
      <RootStack.Screen
        name="IntroScreen"
        component={IntroductionScreen1}
        initialParams={{ index: 0 }}
      />
      <RootStack.Screen name="TabBar" component={BottomTabBar} />
      <RootStack.Screen name="Notes" component={NotesScreen} />
      <RootStack.Screen name="MyAccount" component={MyAccountScreen} />
    </RootStack.Navigator>
  );
};
