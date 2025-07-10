import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import styles from '../../styles/styles';
import { PromptScreenNavigationProp } from '../../navigation/type';

export const PromptScreen: React.FC<PromptScreenNavigationProp> = ({
  navigation,
}: PromptScreenNavigationProp) => {
  const prompts = [
    'what did you eat today?',
    'what is one thing you are grateful for this week?',
    'write a letter to yourself 5 years from now.',
  ];
  return (
    <View>
      <Text style={styles.welcomeText}>prompts</Text>
      <View padding={10}>
        <FlatList
          data={prompts}
          ItemSeparatorComponent={
            <View
              height={1}
              width={100}
              margin={5}
              backgroundColor={'black'}
              alignSelf={'center'}
            />
          }
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('NewNote', { prompt: item })}
              >
                <View>
                  <Text style={styles.text}>{item}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
};
