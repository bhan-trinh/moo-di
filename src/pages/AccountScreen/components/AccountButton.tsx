import { Text, TouchableOpacity, View } from 'react-native';
import styles from '../../../styles/styles';
import { ReactNode } from 'react';

type AccountButtonProps = {
  iconSvg: ReactNode;
  text: string;
};

export const AccountButton = ({ iconSvg, text }: AccountButtonProps) => {
  return (
    <TouchableOpacity style={{ width: '100%' }}>
      <View
        flexDirection="row"
        borderRadius={20}
        borderWidth={1}
        borderColor={'black'}
        width="100%"
        height={80}
        padding={20}
        alignItems="center"
        gap={10}
      >
        {iconSvg}
        <Text style={[styles.text, { textAlign: 'left' }]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};
