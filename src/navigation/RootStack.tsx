import type { StaticParamList } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabBar } from './BottomTabBar';
import { RootStackParamList } from './type';

export const RootStack = createNativeStackNavigator<RootStackParamList>({
  screens: {
    TabBar: BottomTabBar,
  },
});
