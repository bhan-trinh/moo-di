import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../../styles/styles';
import { useCallback, useContext, useEffect, useState } from 'react';
import { NotesContext } from '../../services/NoteContext';
import {
  getDBConnection,
  getMood,
  saveNoteItems,
} from '../../services/NotesDB';
import Icon from '@react-native-vector-icons/lucide';
import Slider from '@react-native-community/slider';
import { user } from '../HomeScreen/HomeScreen';
import { LineChart } from 'react-native-gifted-charts';
import { MoodLabel } from '../../models/MoodLabel';
import { NoteItem } from '../../models/NoteItem';
import { ReportScreenNavigationProp } from '../../navigation/type';

export const ReportScreen: React.FC<ReportScreenNavigationProp> = ({
  navigation,
}: ReportScreenNavigationProp) => {
  /*
    const [moods, setMoods] = useState<MoodLabel[]>([])
    useEffect(() => {async () => {
        var db = await getDBConnection()
        var storedMoods = await getMood(db)  
        setMoods(storedMoods)
    }}, [])
    */
  var moodsData = [];
  const { notes, setNotes } = useContext(NotesContext);
  var totalMood: number = 0;
  moodsData = notes.map((note: NoteItem) => {
    totalMood += note.mood;
    return { value: note.mood, label: note.id };
  });

  var avgMood = Math.floor(totalMood / moodsData.length);
  var avgMoodData = moodsData.map(mood => {
    return {
      value: avgMood,
      label: mood.label,
    };
  });

  console.log(avgMoodData);

  return (
    <View>
      <Text style={styles.welcomeText}>mood report</Text>
      <View
        style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}
      >
        <LineChart
          //   data={avgMoodData}
          data2={moodsData}
          //   hideDataPoints1
          xAxisLabelTextStyle={[styles.text, { fontSize: 15 }]}
          yAxisTextStyle={[styles.text, { fontSize: 15 }]}
          color1={'#BBB'}
          dataPointsColor2={'black'}
          maxValue={100}
          mostNegativeValue={1}
          height={300}
        />
      </View>
    </View>
  );
};
