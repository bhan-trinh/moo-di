/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { NoteItem } from '../../../models/note';
import { useContext, useEffect, useRef, useState } from 'react';
import { delNoteItem, getDBConnection } from '../../../services/NotesDB';
import styles from '../../../styles/styles';
import { NoteItemComponent } from '../../../components/NoteItemComponent';
import { NotesContext } from '../../../services/NoteContext';
import { NotesScreenNavigationProp } from '../../../navigation/type';
import { MONTHS } from '../../../models/Months';
import { useNavigation } from '@react-navigation/native';

export const user = 'user';

export const NotesScreen: React.FC<NotesScreenNavigationProp> = ({ route }) => {
  const navigation = useNavigation();
  const { month, year } = route.params;
  const { notes } = useContext<NoteItem[]>(NotesContext);
  const [filteredNotes, setFilteredNotes] = useState<NoteItem[]>([]);
  const [searchWord, setSearch] = useState('');
  const flatlistRef = useRef<FlatList>(null);
  const [notesByDate, setNotesByDate] = useState([]);

  const delNote = async (id: number) => {
    try {
      const db = await getDBConnection();
      await delNoteItem(db, id);

      // Remove note from notes state variable
      setNotes((oldNotes: NoteItem[]) => {
        // Remove by database id
        // Since there might be notes deleted inbetween which changes pos but not actual id in db, index in array and the actual id might be mismatched
        var newNotes = [...oldNotes];
        for (var i = 0; i < newNotes.length; i++) {
          if (notes[i].id == id) {
            newNotes.splice(i, 1);
            break;
          }
        }

        return newNotes;
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const empty = [];
    for (var note of notes) {
      const date = new Date(note.created_at);
      if (
        date.getFullYear().toString() === year &&
        MONTHS[date.getMonth()] === month
      ) {
        empty.push(note);
      }
    }
    setNotesByDate(empty);
  }, [month, year, notes]);

  // Refresh notes display everytime notes context / searched word change
  useEffect(() => {
    if (searchWord === '') setFilteredNotes(notesByDate);

    // Find notes that match searched keywords
    var newNotes: NoteItem[] = [];
    for (var note of notesByDate) {
      if (note.value.includes(searchWord)) {
        newNotes.push(note);
      }
    }
    setFilteredNotes(newNotes);
  }, [notesByDate, searchWord]);

  return (
    <>
      {/* Header */}
      <View flex={1}>
        <Text style={styles.welcomeText}>
          {month} {year}
        </Text>
        <TextInput
          style={[styles.textInput, styles.text]}
          value={searchWord}
          onChangeText={text => {
            setSearch(text);
          }}
          placeholder="search a word"
        />

        {/* Display notes */}

        <View style={styles.noteList}>
          <TouchableOpacity
            style={{ zIndex: 5 }}
            onPress={() => {
              flatlistRef.current?.scrollToEnd();
            }}
          >
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: 'black',
                backgroundColor: '#EEE',
                width: '100%',
                bottom: 0,
                alignSelf: 'center',
                position: 'absolute',
                justifyContent: 'center',
              }}
            >
              <Text style={{ color: 'black', textAlign: 'center' }}>^</Text>
            </View>
          </TouchableOpacity>

          <FlatList
            // If filtered notes lag behind and has none
            data={
              !filteredNotes.length && searchWord === ''
                ? notesByDate
                : filteredNotes
            }
            renderItem={({ item }) => {
              return (
                <NoteItemComponent
                  key={item.id}
                  note={item}
                  deleteItem={delNote}
                />
              );
            }}
            showsVerticalScrollIndicator={false}
            initialNumToRender={5}
            ref={flatlistRef}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'flex-end',
            }}
            inverted
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('TabBar');
        }}
      >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </>
  );
};
