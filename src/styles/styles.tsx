import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  welcomeBox: {
    height: 200,
  },

  welcomeText: {
    color: 'black',
    fontFamily: Platform.select({
      android: 'monospace',
      ios: 'Futura'}),
    fontSize: 30,
    textAlign: 'center',
  },

  homeBox: {
    borderRadius: 20,
    backgroundColor: 'black',
    height: 100,
    justifyContent: 'center',
  },

  homeText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 50,
    fontFamily: Platform.select({
      android: 'monospace',
      ios: 'Futura'}),
  },

  container: {
    flex: 1,
    margin: 12,
    marginTop: 50,
  },

  text: {
    fontSize: 20,
    fontFamily: Platform.select({
      android: 'monospace',
      ios: 'Futura'}),
    textAlign: 'center',
  },

  buttonBox: {
    height: 150,
    display: 'flex',
    padding: 20,
    justifyContent: 'space-around',

  },

  button: {
    backgroundColor: 'black',
    justifyContent: 'center',
    margin: 10,
  },

  buttonText: {
    fontSize: 20,
    fontFamily: Platform.select({
      android: 'monospace',
      ios: 'Futura'}),
    textAlign: 'center',
    color: 'white',
    margin: 10,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  textInput: {
    borderColor: 'black',
    borderWidth: 1,
    margin: 5,
  },

  noteList: {
    padding: 20,
    justifyContent: 'space-around',
    flex: 1,
    flexDirection: "column-reverse",
  },

  botNavBar: {
    borderColor: 'black',
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: "auto",
    padding: 10,
    borderTopStartRadius: 20,
  }
});


export default styles