/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  ScrollView,
  SectionList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { NoteItem } from '../../../models/note';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import {
  createTable,
  delNoteItem,
  delTable,
  getDBConnection,
  getNoteItems,
  getNoteYears,
  saveNoteItems,
} from '../../../models/NotesDB';
import styles from '../../../styles/styles';
import { NoteItemComponent } from '../../../components/NoteItemComponent';
import { NotesContext } from '../../../contexts/notes/NoteContext';
import {
  HomeScreenNavigationProp,
  RootStackParamList,
} from '../../../navigation/type';
import { DateBox } from './components/DateBox';
import { MONTHS } from '../../../models/months';
import { Portal } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { UserContext } from '../../../contexts/user/UserContext';

export const HomeScreen: React.FC<HomeScreenNavigationProp> = () => {
  const { userName } = useContext(UserContext);
  const navigation = useNavigation();
  const { notes, setNotes } = useContext<NoteItem[]>(NotesContext);
  const [filteredNotes, setFilteredNotes] = useState<NoteItem[]>([]);
  const [searchWord, setSearch] = useState('');
  const flatlistRef = useRef<FlatList>(null);
  const [noteView, setNoteView] = useState('l');
  const [notesDateFiltered, setNotesDateFiltered] = useState({});

  // Initialize database when app opens
  useEffect(() => {
    const initDB = async () => {
      const db = await getDBConnection();
      console.log('hi');
      await delTable(db);
      console.log('move on');
      await createTable(db);
      await db.close();
    };
    initDB();
  }, []);

  const loadDataCallback = useCallback(async () => {
    try {
      const db = await getDBConnection();
      const storedNoteItems = await getNoteItems(db);
      setNotes(storedNoteItems);
      await db.close();
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    var sortYear = {};
    for (var note of notes) {
      const date = new Date(note.created_at);
      const year = date.getFullYear().toString();
      const month = MONTHS[date.getMonth()];
      if (!(year in sortYear)) {
        sortYear[year] = {};
      }
      if (!(month in sortYear[year])) {
        sortYear[year][month] = [];
      }
      sortYear[year][month].push(note);
    }
    const sections = Object.keys(sortYear).map(year => ({
      title: year,
      data: Object.keys(sortYear[year]),
    }));
    setNotesDateFiltered(sections);
  }, [notes]);

  // Refresh notes display everytime notes context / searched word change
  useEffect(() => {
    if (searchWord === '') setFilteredNotes(notes);

    // Find notes that match searched keywords
    var newNotes: NoteItem[] = [];
    for (var note of notes) {
      if (note.value.includes(searchWord)) {
        newNotes.push(note);
      }
    }
    setFilteredNotes(newNotes);
  }, [notes, searchWord]);

  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);

  // Delete note
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
      await db.close();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* Header */}
      <View
        style={{
          flex: 1,
          padding: 16,
          backgroundColor: '#EEE',
        }}
      >
        <Text style={styles.welcomeText}>good morning.</Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            style={{
              justifyContent: 'center',
            }}
            onPress={() => setNoteView('l')}
          >
            <Text style={[styles.buttonText, { color: 'black' }]}>List</Text>
          </TouchableOpacity>

          <View style={{ backgroundColor: 'black', width: 1, height: '60%' }} />

          <TouchableOpacity
            style={{
              justifyContent: 'center',
            }}
            onPress={() => {
              setNoteView('c');
            }}
          >
            <Text style={[styles.buttonText, { color: 'black' }]}>
              Calendar
            </Text>
          </TouchableOpacity>
        </View>

        {/* Display notes */}

        {noteView === 'l' && (
          <>
            <TextInput
              style={[styles.textInput, styles.text]}
              value={searchWord}
              onChangeText={text => {
                setSearch(text);
              }}
              placeholder="search a word"
            />
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
              {
                <FlatList
                  // If filtered notes lag behind and has none
                  data={
                    !filteredNotes.length && searchWord === ''
                      ? notes
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
              }
            </View>
          </>
        )}

        {noteView === 'c' && (
          <SectionList
            sections={notesDateFiltered}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item, section: { title } }) => (
              <DateBox
                date={item}
                onPress={() => {
                  navigation.navigate('Notes', {
                    year: title,
                    month: item,
                  });
                }}
              />
            )}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.welcomeText}>{title}</Text>
            )}
            contentContainerStyle={{ padding: 20 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('NewNote', { prompt: undefined })}
      >
        <View
          style={{
            flex: 1,
            borderRadius: 45,
            borderWidth: 1,
            borderColor: 'black',
            backgroundColor: '#EEE',
            height: 50,
            width: 50,
            position: 'absolute',
            alignSelf: 'flex-end',
            justifyContent: 'center',
            bottom: 20,
            right: 20,
          }}
        >
          <Text style={{ color: 'black', textAlign: 'center' }}>+</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};
