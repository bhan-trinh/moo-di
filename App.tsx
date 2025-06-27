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
import { NoteItem } from './models';
import { useCallback, useEffect, useState } from 'react';
import { createTable, delNoteItem, delTable, getDBConnection, getNoteItems, saveNoteItems } from './db-service';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import { NoteItemComponent } from './NoteItem';
import Icon from '@react-native-vector-icons/fontawesome6';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [newNote, setNewNote] = useState('')

  // Load data from SQL db
const loadDataCallback = useCallback(async () => {
  try {
    const initNotes = [
      {
      id: 1, 
      value: "eat",
      datetime: new Date().toString(),
    },
    {
      id: 0,
      value: "i saw a squirrel today. i think i will bring nuts for it tomorrow, hopefully its at the same spot. im glad i have something to look forward to.",
      datetime: new Date().toString()
    }, 
    ]
    const db = await getDBConnection()
    await delTable(db)
    await createTable(db)
    const storedNoteItems = await getNoteItems(db)
    if (storedNoteItems.length){
      setNotes(storedNoteItems)
    } else {
      await saveNoteItems(db, initNotes);
      setNotes(initNotes)
    }
  } catch (error) {
    console.error(error)
  }
}, [])

useEffect(() => {
  loadDataCallback()
}, [loadDataCallback])

const addNote = async() => {
  if (!newNote.trim()) return;
  var date = new Date().toString()
  try {
    const newNotes = [...notes, {
      id: notes.length ? notes.reduce((acc, cur) => {
        if (cur.id > acc.id) return cur;
        return acc;
      }).id + 1 : 0, value: newNote, datetime: date
    }];
    setNotes(newNotes)
    const db = await getDBConnection()
    await saveNoteItems(db, newNotes)
    setNewNote('')
  } catch (error) {
    console.error(error);
  }
};

  const delNote = async (id: number) => {
    try {
      const db = await getDBConnection()
      await delNoteItem(db, id);

      // Remove note from notes state variable
      setNotes((oldNotes) => {
        // If remove by using id as index, the pos in array and the actual id might be mismatched
        var newNotes = [...oldNotes]
        for (var i = 0; i < newNotes.length; i++){
          if (notes[i].id == id){
            newNotes.splice(i, 1)
            break
          }
        }
        return newNotes
    })
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <SafeAreaView style={styles.centeredView}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior='automatic'>

      {/* Header */}
      <Text style={styles.welcomeText}>good morning.</Text>

      {/* Add New Note */}
      <TextInput
      style={[styles.textInput, styles.text]}
      value={newNote}
      onChangeText={(text) => setNewNote(text)}
      />
      <TouchableOpacity style={styles.button} onPress={addNote}>
        <Text style={styles.buttonText}>+New</Text>
      </TouchableOpacity>

      {/* Notes */}
      <View style={styles.noteList}>
        {notes.map((note) => (
          <NoteItemComponent key={note.id} note={note} deleteItem={delNote}></NoteItemComponent> 
        ))}
      </View>

    </ScrollView>

    <View style={styles.botNavBar}>
        <Icon name="house" iconStyle='solid' size={30}/>
        <Icon name="user" iconStyle='solid' size={30}/>
    </View>
    </SafeAreaView>


  );
}



export default App;
