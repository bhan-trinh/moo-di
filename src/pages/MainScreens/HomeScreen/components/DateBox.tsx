import { Text, TouchableOpacity, View } from 'react-native';
import styles from '../../../../styles/styles';

export const DateBox = ({ date, onPress }) => {
  return (
    <View style={{ marginBottom: 10 }}>
      <TouchableOpacity onPress={onPress}>
        <View
          borderWidth={1}
          backgroundColor="black"
          height={100}
          justifyContent="center"
        >
          <Text style={styles.buttonText}>{date}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
