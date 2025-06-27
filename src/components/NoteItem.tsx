import React from 'react'
import { NoteItem } from '../../models'
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import styles from '../styles/styles';

export const NoteItemComponent: React.FC<{
    note: NoteItem;
    deleteItem: Function;
}> = ({ note: { id, value, datetime }, deleteItem }) => {
    var dt = datetime.split(" ")
    var t = dt[4].split(":")
    var datetimeTrim = `${t[0]}:${t[1]} ${dt[1]} ${dt[2]} ${dt[3]}`

    return (
        <View style={nStyle.noteContainer}>
            <View style={nStyle.noteHeader}>
                <View style={nStyle.headerLeftSide}>
                <TouchableOpacity style={nStyle.headerButton} onPress={() => deleteItem(id)}>
                    <Text style={[nStyle.headerButtonText, nStyle.text]}>x</Text>
                </TouchableOpacity>
                <TouchableOpacity style={nStyle.headerButton}>
                    <Text style={[nStyle.headerButtonText, nStyle.text]}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity style={nStyle.headerButton}>
                    <Text style={[nStyle.headerButtonText, nStyle.text]}>+</Text>
                </TouchableOpacity>
                </View>
                <View style={nStyle.headerRightSide}>
                    <Text style={[nStyle.text, {color: "white", fontSize: 15}]}>{datetimeTrim}</Text>
                </View>
            </View>
            <View style={nStyle.noteBody}>
                <Text
                    style={[nStyle.text, nStyle.bodyText]}>
                    {value} 
                </Text>
            </View>
        </View>
    );
};

const nStyle = StyleSheet.create({
  text: {
    fontFamily: Platform.select({
      android: 'monospace',
      ios: 'Futura'}),
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
        flexWrap: "wrap",
    },

    headerLeftSide:{
        width: "30%",
        flexDirection: "row",
        justifyContent: "flex-start",
    },

    headerRightSide:{
        width: "70%",
        flexDirection: "row",
        justifyContent: "flex-end",
    },

    headerButton: {
        borderRadius: 0,
        backgroundColor: "white",
        marginHorizontal: 3,
        justifyContent: "center",
        alignContent: "center",
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
        fontSize: 20,
    }
}
)