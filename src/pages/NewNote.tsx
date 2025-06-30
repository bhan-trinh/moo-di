import { Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import styles from "../styles/styles"
import { useContext, useState } from "react"
import { NotesContext } from "../services/NoteContext"
import { getDBConnection, saveNoteItems } from "../services/db-service"

export const NewNote = ({navigation}) => {
    const [newNote, setNewNote] = useState('')
    const {notes, setNotes} = useContext(NotesContext)

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

    return (
        <SafeAreaView>
        <TouchableOpacity style={[styles.button]} onPress={() => navigation.navigate("Home")}>
            <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
            <Text style={styles.welcomeText}>create a note!</Text>
                 {/* Add New Note */}
        <TextInput
        style={[styles.textInput, styles.text]}
        value={newNote}
        onChangeText={(text) => setNewNote(text)}
        placeholder='write a new note'
        />

        <TouchableOpacity style={styles.button} onPress={
        addNote
        }>
        <Text style={styles.buttonText}>+New</Text>
      </TouchableOpacity>

        </SafeAreaView>
    )
}