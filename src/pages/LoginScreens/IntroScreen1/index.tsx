import { Text, TouchableOpacity, View } from 'react-native';
import styles from '../../../styles/styles';
import { NoteItem } from '../../../models/note';
import { useNavigation } from '@react-navigation/native';
import { intro } from '../intro';

export const IntroductionScreen1 = ({ route }) => {
  const navigation = useNavigation();
  const { index } = route.params;
  return (
    <View height="100%">
      <View
        flex={1}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
        }}
      >
        <Text style={[styles.welcomeText, { fontSize: 20 }]}>
          {intro[index]}
        </Text>
      </View>
      <View>
        <TouchableOpacity
          style={[styles.button]}
          onPress={
            index >= intro.length - 1
              ? () => navigation.navigate('TabBar')
              : () => navigation.navigate('IntroScreen', { index: index + 1 })
          }
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
