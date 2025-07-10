import {
  FlatList,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { NoteItem } from '../../models/NoteItem';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import {
  createTable,
  delNoteItem,
  delTable,
  getDBConnection,
  getNoteItems,
  saveNoteItems,
} from '../../services/NotesDB';
import styles from '../../styles/styles';
import { NoteItemComponent } from '../../components/NoteItemComponent';
import { NotesContext } from '../../services/NoteContext';
import { HomeScreenNavigationProp } from '../../navigation/type';

export const user = 'user';

export const HomeScreen: React.FC<HomeScreenNavigationProp> = ({
  navigation,
}: HomeScreenNavigationProp) => {
  const { notes, setNotes } = useContext<NoteItem[]>(NotesContext);
  const [filteredNotes, setFilteredNotes] = useState<NoteItem[]>([]);
  const [searchWord, setSearch] = useState('');
  const flatlistRef = useRef<FlatList>(null);

  const loadDataCallback = useCallback(async () => {
    try {
      const initNotes = [
        {
          id: 0,
          value: 'todo: fix navbar',
          datetime: new Date().toString(),
          user: user,
          mood: 0,
        },
        {
          id: 1,
          value:
            'i saw a squirrel today. i think i will bring nuts for it tomorrow, hopefully its at the same spot. im glad i have something to look forward to.',
          datetime: new Date().toString(),
          user: user,
          mood: 20,
        },
      ];
      const db = await getDBConnection();
      await delTable(db);
      await createTable(db);
      const storedNoteItems = await getNoteItems(db);
      if (storedNoteItems.length) {
        setNotes(storedNoteItems);
      } else {
        console.log('Here are stored note items');
        console.log(storedNoteItems);
        await saveNoteItems(db, initNotes);
        setNotes(initNotes);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  // Refresh notes display everytime notes context / searched word change
  useEffect(() => {
    console.log(`Home: ${notes}`);
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* Header */}
      <Text style={styles.welcomeText}>good morning.</Text>
      <TextInput
        style={[styles.textInput, styles.text]}
        value={searchWord}
        onChangeText={text => {
          setSearch(text);
        }}
        placeholder="search a word"
      />

      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
          }}
        >
          <Text style={[styles.buttonText, { color: 'black' }]}>For You</Text>
        </TouchableOpacity>

        <View style={{ backgroundColor: 'black', width: 1 }} />

        <TouchableOpacity
          style={{
            justifyContent: 'center',
          }}
        >
          <Text style={[styles.buttonText, { color: 'black' }]}>
            Group by Date
          </Text>
        </TouchableOpacity>
      </View>

      {/* Display notes */}

      <View style={styles.noteList}>
        {
          <FlatList
            // If filtered notes lag behind and has none
            data={
              !filteredNotes.length && searchWord === '' ? notes : filteredNotes
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
            inverted={true}
            showsVerticalScrollIndicator={false}
            initialNumToRender={5}
            ref={flatlistRef}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'flex-end',
            }}
          />
        }
      </View>
      <TouchableOpacity
        onPress={() => {
          let index = notes.length - 1;
          flatlistRef.current.scrollToIndex({ index: index });
        }}
      >
        <View
          style={{
            borderRadius: 45,
            borderWidth: 1,
            borderColor: 'black',
            backgroundColor: '#EEE',
            height: 50,
            width: 50,
            alignSelf: 'flex-end',
            position: 'absolute',
            bottom: 25,
            right: 25,
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: 'black', textAlign: 'center' }}>^</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};
