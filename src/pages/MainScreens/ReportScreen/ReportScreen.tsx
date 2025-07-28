import { Text, View } from 'react-native';
import styles from '../../../styles/styles';
import { useContext } from 'react';
import { NotesContext } from '../../../services/NoteContext';
import { LineChart } from 'react-native-gifted-charts';
import { NoteItem } from '../../../models/note';
import { ReportScreenNavigationProp } from '../../../navigation/type';

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
