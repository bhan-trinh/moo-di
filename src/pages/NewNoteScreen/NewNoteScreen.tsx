import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../../styles/styles';
import { useContext, useEffect, useState } from 'react';
import { NotesContext } from '../../services/NoteContext';
import { getDBConnection, saveNoteItems } from '../../services/NotesDB';
import Icon from '@react-native-vector-icons/lucide';
import Slider from '@react-native-community/slider';
import { user } from '../HomeScreen/HomeScreen';
import { useIsFocused } from '@react-navigation/native';

export const NewNoteScreen = ({ navigation, route }) => {
  const [newNote, setNewNote] = useState('');
  const [newMood, setMood] = useState(50);
  const { notes, setNotes } = useContext(NotesContext);
  const { prompt } = route.params;
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
      // Clear params when the screen loses focus
      navigation.setParams({ prompt: undefined });
    }
  }, [isFocused, navigation]);

  const addNote = async () => {
    if (!newNote.trim()) return;
    var date = new Date().toString();
    try {
      const newNotes = [
        ...notes,
        {
          id: notes.length
            ? notes.reduce((acc, cur) => {
                if (cur.id > acc.id) return cur;
                return acc;
              }).id + 1
            : 0,
          value: newNote,
          datetime: date,
          user: user,
          mood: newMood,
          prompt: prompt,
        },
      ];

      setNotes(newNotes);

      const db = await getDBConnection();
      await saveNoteItems(db, newNotes);
      setNewNote('');
      setMood(50);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ padding: 30 }}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={{ alignItems: 'flex-end' }}
      >
        <Icon name="x" size={30} />
      </TouchableOpacity>
      <Text style={styles.welcomeText}>create a note!</Text>

      {prompt && (
        <View>
          <Text style={styles.text}>{prompt}</Text>
        </View>
      )}
      {/* Add New Note */}
      <TextInput
        style={[
          styles.textInput,
          styles.text,
          { height: 300, textAlign: 'left' },
        ]}
        textAlignVertical="top"
        multiline
        numberOfLines={4}
        value={newNote}
        onChangeText={text => setNewNote(text)}
        placeholder="write a new note"
      />

      <Text style={styles.welcomeText}>{'\n'}how are you feeling now?</Text>
      <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={0}
        maximumValue={100}
        minimumTrackTintColor="black"
        maximumTrackTintColor="black"
        thumbTintColor="black"
        value={newMood}
        onValueChange={val => setMood(Math.floor(val))}
      />
      <Text style={styles.text}>{newMood}%</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          addNote();
          navigation.navigate('Home');
        }}
      >
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>
    </View>
  );
};
