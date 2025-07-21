/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * Ideas:
 * Auto detect common words and show rel graphs
 * Unlock effects when you type in certain words
 * Customize Login text
 * I think it could be fun if we can see other people's notes suggested based on keywords in common...
 * it would be cool for people to reach out and interact with each other based purely on interest!
 * theres no image in the app either so you literally have no avatar, no identity, except your name and your words
 * dont you think its beautiful that it can resemble the
 */

import { View } from 'react-native';
import styles from './styles/styles';
import { NavigationContainer } from '@react-navigation/native';
import { NotesProvider } from './services/NoteContext';
import { BottomTabBar } from './navigation/BottomTabBar';
import { RootStackNavigator } from './navigation/RootStack';
import { PaperProvider } from 'react-native-paper';
import { UserProvider } from './services/UserContext';
import { SafeAreaView } from 'react-native-safe-area-context';

function App() {
  return (
    <PaperProvider>
      <UserProvider>
        <NotesProvider>
          <SafeAreaView style={styles.centeredView}>
            <NavigationContainer>
              <RootStackNavigator />
            </NavigationContainer>
          </SafeAreaView>
        </NotesProvider>
      </UserProvider>
    </PaperProvider>
  );
}

export default App;
