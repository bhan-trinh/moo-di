import { ScrollView, Text, View } from 'react-native';
import styles from '../../../styles/styles';
import UserSvg from '../../../assets/svg/UserSvg';
import { AccountButton } from './components/AccountButton';
import { AccountScreenNavigationProp } from '../../../navigation/type';
import SettingsSvg from '../../../assets/svg/SettingsSvg';
import HelpSvg from '../../../assets/svg/HelpSvg';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { UserContext } from '../../../services/UserContext';

export const AccountScreen: React.FC<AccountScreenNavigationProp> = () => {
  const { userName } = useContext(UserContext);
  const navigation = useNavigation();
  const accountButtonMap = [
    {
      text: 'My Account',
      icon: <UserSvg width={20} height={20} color="black" />,
      onPress: () => navigation.navigate('MyAccount'),
    },
    {
      text: 'Settings',
      icon: <SettingsSvg width={20} height={20} color="black" />,
    },
    {
      text: 'Help Center',
      icon: <HelpSvg width={20} height={20} color="black" />,
    },
  ];
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
    >
      <View alignItems="center" padding={30} gap={20}>
        <Text style={styles.welcomeText}>hello, {userName}</Text>
        <View
          borderRadius={1000}
          borderWidth={1}
          borderColor={'black'}
          height={200}
          width={200}
          justifyContent="center"
          alignItems="center"
        >
          <UserSvg width={100} height={100} color="black" />
        </View>
        {accountButtonMap.map((item, index) => (
          <AccountButton
            key={index}
            text={item.text}
            iconSvg={item.icon}
            onPress={item.onPress ? item.onPress : undefined}
          />
        ))}
      </View>
    </ScrollView>
  );
};
