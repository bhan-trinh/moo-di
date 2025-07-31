import React from 'react';
import { NoteItem } from '../models/note';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export const NoteItemComponent: React.FC<{
  note: NoteItem;
  deleteItem: Function;
}> = ({ note: { id, value, created_at, user, mood, prompt }, deleteItem }) => {
  var dt = new Date(created_at).toString().split(' ');
  var t = dt[4].split(':');
  var created_atTrim = `${t[0]}:${t[1]} ${dt[1]} ${dt[2]} ${dt[3]}`;

  return (
    <View style={nStyle.noteContainer}>
      <View style={nStyle.noteHeader}>
        <View style={nStyle.headerLeftSide}>
          <TouchableOpacity
            style={nStyle.headerButton}
            onPress={() => deleteItem(id)}
          >
            <Text style={[nStyle.headerButtonText, nStyle.text]}>x</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={nStyle.headerButton}>
            <Text style={[nStyle.headerButtonText, nStyle.text]}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={nStyle.headerButton}>
            <Text style={[nStyle.headerButtonText, nStyle.text]}>+</Text>
          </TouchableOpacity> */}
        </View>
        <View style={nStyle.headerRightSide}>
          <Text style={[nStyle.text, { color: 'white', fontSize: 15 }]}>
            {created_atTrim}
          </Text>
        </View>
      </View>
      <View style={nStyle.noteBody}>
        <Text style={[nStyle.text, nStyle.bodyText]}>{value}</Text>
        <Text style={[nStyle.text, nStyle.bottomText]}>
          {'\n'}from {user}
          {'\n'}mood {mood}
          {prompt ? `${'\n'}prompt ${prompt}` : ''}
        </Text>
        <View flex={1} borderWidth={1} height={20}>
          <View flex={1} backgroundColor="grey" width={`${mood}%`} />
        </View>
      </View>
    </View>
  );
};

const nStyle = StyleSheet.create({
  text: {
    fontFamily: Platform.select({
      android: 'monospace',
      ios: 'Futura',
    }),
  },

  noteContainer: {
    borderColor: 'black',
    borderWidth: 1,
    margin: 10,
  },

  noteHeader: {
    flex: 1,
    backgroundColor: 'black',
    height: 30,
    padding: 5,
    flexWrap: 'wrap',
  },

  headerLeftSide: {
    width: '30%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  headerRightSide: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  headerButton: {
    borderRadius: 0,
    backgroundColor: 'white',
    marginHorizontal: 3,
    justifyContent: 'center',
    alignContent: 'center',
  },

  headerButtonText: {
    marginHorizontal: 5,
    fontSize: 15,
    textAlign: 'center',
  },

  noteBody: {
    padding: 10,
  },

  bodyText: {
    fontSize: 18,
  },
  bottomText: {
    fontSize: 14,
  },
});
