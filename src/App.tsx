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

import { NewAppScreen } from '@react-native/new-app-screen';
import { Button, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';
import { NoteItem } from '../models';
import { useCallback, useEffect, useState } from 'react';
import { createTable, delNoteItem, delTable, getDBConnection, getNoteItems, saveNoteItems } from './services/db-service';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles/styles';
import { NoteItemComponent } from './components/NoteItem';
import Icon from '@react-native-vector-icons/fontawesome6';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from './pages/Home';
import { NewNote } from './pages/NewNote';
import { NotesContext, NotesProvider } from './services/NoteContext';

function App() {

  // Load data from SQL db


  const Stack = createNativeStackNavigator()

  return (
    <NotesProvider>
    <SafeAreaView style={styles.centeredView}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown:false}}
          />
          <Stack.Screen
          name="NewNote"
          component={NewNote}
          options={{headerShown:false}}
          />
      
    </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaView>
    </NotesProvider>


  );
}



export default App;
