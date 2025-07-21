import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from '../../../styles/styles';
import { useContext, useEffect, useState } from 'react';
import { NotesContext } from '../../../services/NoteContext';
import { getDBConnection, saveNoteItems } from '../../../services/NotesDB';
import Icon from '@react-native-vector-icons/lucide';
import Slider from '@react-native-community/slider';
import { useIsFocused } from '@react-navigation/native';
import { NewNoteScreenNavigationProp } from '../../../navigation/type';
import { NoteItem } from '../../../models/NoteItem';
import { UserContext } from '../../../services/UserContext';

export const NewNoteScreen: React.FC<NewNoteScreenNavigationProp> = ({
  navigation,
  route,
}: NewNoteScreenNavigationProp) => {
  const { userName } = useContext(UserContext);
  const [newNote, setNewNote] = useState('');
  const [newMood, setMood] = useState(50);
  const { notes, setNotes } = useContext<NoteItem[]>(NotesContext);
  const { prompt } = route.params ? route.params : '';
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
      // Clear prompt params when screen loses focus
      navigation.setParams({ prompt: undefined });
    }
  }, [isFocused, navigation]);

  // Async func to add new note to database
  const addNote = async () => {
    // If no text in new note text input
    if (!newNote.trim()) return;

    // Calculate date
    var date = new Date().toISOString();

    try {
      const newNoteItem: NoteItem = {
        id: notes.length
          ? // If already notes, find highest id then increment
            notes.reduce((acc: NoteItem, cur: NoteItem) => {
              if (cur.id > acc.id) return cur;
              return acc;
            }).id + 1
          : 0, // If no notes
        value: newNote,
        created_at: date,
        user: userName,
        mood: newMood,
        prompt: prompt,
      };
      const newNotes: NoteItem[] = [
        ...notes, // Copy old notes

        // Prepare new note
        newNoteItem,
      ];

      // Add to note context
      setNotes(newNotes);

      // Add to database
      const db = await getDBConnection();
      await saveNoteItems(db, newNotes);

      // Reset new note screen for next time
      setNewNote('');
      setMood(50);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
    >
      <View padding={30}>
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
    </ScrollView>
  );
};
