import { Text, View } from 'react-native';
import styles from '../../styles/styles';
import UserSvg from '../../assets/svg/UserSvg';
import { AccountButton } from './components/AccountButton';
import { AccountScreenNavigationProp } from '../../navigation/type';
import SettingsSvg from '../../assets/svg/SettingsSvg';
import HelpSvg from '../../assets/svg/HelpSvg';

export const AccountScreen: React.FC<AccountScreenNavigationProp> = ({
  navigation,
}: AccountScreenNavigationProp) => {
  const accountButtonMap = [
    {
      text: 'My Account',
      icon: <UserSvg width={20} height={20} color="black" />,
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
    <View alignItems="center" padding={30} gap={20}>
      <Text style={styles.welcomeText}>account</Text>
      <View
        borderRadius={1000}
        borderWidth={1}
        borderColor={'black'}
        height={200}
        width={200}
      />
      {accountButtonMap.map((item, index) => (
        <AccountButton key={index} text={item.text} iconSvg={item.icon} />
      ))}
    </View>
  );
};
