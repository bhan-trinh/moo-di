import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import styles from '../../../styles/styles';
import { PromptScreenNavigationProp } from '../../../navigation/type';

export const PromptScreen: React.FC<PromptScreenNavigationProp> = ({
  navigation,
}: PromptScreenNavigationProp) => {
  const prompts = [
    'what did you eat today? did it remind you of anything?',
    'what is one thing you did this week that you would like to see or do again ?',
    'write a letter to yourself 5 years from now.',
    'how do you want to hug someone?',
    'count every bird you see today. how many did you greet?',
    'when is the best time to lie down and stare at the ceiling?',
    'where would you like to go if you get up early for a morning stroll?',
    'why do you still look back on it?',
    'you thought everything you have is the past,',
    'but it turns out even that is not yours from long ago.',
    'everything you have is now.',
    "you're breathing.",
  ];
  return (
    <View flex={1}>
      <Text style={styles.welcomeText}>prompts</Text>
      <View padding={10} flex={1}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={prompts}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{ paddingBottom: 30 }}
          style={{ flex: 1 }}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 1,
                width: 200,
                margin: 5,
                backgroundColor: 'black',
                alignSelf: 'center',
              }}
            />
          )}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('NewNote', { prompt: item })}
            >
              <View>
                <Text style={styles.text}>{item}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};
