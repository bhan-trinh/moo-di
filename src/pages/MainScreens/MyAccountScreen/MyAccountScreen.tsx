import { Text, TouchableOpacity, View } from 'react-native';
import styles from '../../../styles/styles';
import UserSvg from '../../../assets/svg/UserSvg';
import { AccountButton } from './components/AccountButton';
import { AccountScreenNavigationProp } from '../../../navigation/type';
import SettingsSvg from '../../../assets/svg/SettingsSvg';
import HelpSvg from '../../../assets/svg/HelpSvg';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native';
import { UserContext } from '../../../services/UserContext';
import { useContext, useState } from 'react';

export const MyAccountScreen = () => {
  const navigation = useNavigation();
  const { userName, setUserName } = useContext<string>(UserContext);
  const [changingName, setChangingName] = useState(userName);
  return (
    <View flex={1}>
      <View alignItems="center" padding={30} gap={20} flex={1}>
        <Text style={styles.text}>change username</Text>
        <TextInput
          style={[styles.textInput, styles.text, { width: '100%' }]}
          value={changingName}
          onChangeText={text => setChangingName(text)}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => setUserName(changingName)}
        >
          <Text style={styles.buttonText}>Change</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('TabBar');
        }}
      >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};
