import {
  NativeStackScreenProps,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export type RootStackParamList = {
  IntroScreen: { index: number | undefined };
  TabBar: undefined;
  Notes: { month: string; year: string };
  MyAccount: undefined;
};

export type NativeStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface ParamList extends RootStackParamList {}
  }
}

export type BottomTabBarParamList = {
  Home: undefined;
  Prompt: undefined;
  NewNote: { prompt: string | undefined };
  Report: undefined;
  Account: undefined;
};

export type HomeScreenNavigationProp = NativeStackScreenProps<
  BottomTabBarParamList,
  'Home'
>;

export type NotesScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Notes'
>;

export type PromptScreenNavigationProp = NativeStackScreenProps<
  BottomTabBarParamList,
  'Prompt'
>;

export type NewNoteScreenNavigationProp = NativeStackScreenProps<
  BottomTabBarParamList,
  'NewNote'
>;

export type ReportScreenNavigationProp = NativeStackScreenProps<
  BottomTabBarParamList,
  'Report'
>;

export type AccountScreenNavigationProp = NativeStackScreenProps<
  BottomTabBarParamList,
  'Account'
>;
