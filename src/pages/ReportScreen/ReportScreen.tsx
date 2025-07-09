import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../../styles/styles';
import { useCallback, useContext, useEffect, useState } from 'react';
import { NotesContext } from '../../services/NoteContext';
import { getDBConnection, getMood, saveNoteItems } from '../../services/NotesDB';
import Icon from '@react-native-vector-icons/lucide';
import Slider from '@react-native-community/slider';
import { user } from '../HomeScreen/HomeScreen';
import { LineChart } from 'react-native-gifted-charts';
import { MoodLabel } from '../../models/MoodLabel';
import { NoteItem } from '../../models/NoteItem';

export const ReportScreen = ({ navigation }) => {
    /*
    const [moods, setMoods] = useState<MoodLabel[]>([])
    useEffect(() => {async () => {
        var db = await getDBConnection()
        var storedMoods = await getMood(db)  
        setMoods(storedMoods)
    }}, [])
    */
    var moods = [];
    const {notes, setNotes} = useContext(NotesContext)
    moods = notes.map((note: NoteItem) => {
        return {value: note.mood,
            label: note.id
        }
    })

    return (
    <LineChart data={moods}/>
)
};
