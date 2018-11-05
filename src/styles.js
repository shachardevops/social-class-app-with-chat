import { StyleSheet, Platform, StatusBar } from 'react-native';

export const styles = StyleSheet.create({
  lolpadding: {
    flex: 1
  },
  imageRegister: {
    width: '100%',
    paddingTop: 50,
    justifyContent: 'flex-start',
    flex: 4,
    resizeMode: 'cover'
  },
  imageHome: {
    width: '100%',
    paddingTop: 50,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 3,
    resizeMode: 'cover'
  },
  portraitMain: {
    flex: 1,
    justifyContent: 'space-around'
  },
  landscapeMainmain: {
    flex: 1,
    justifyContent: 'space-around'
  },
  portraitTextHeadingMainPage: {
    paddingTop: 50,
    color: '#3a455c',

    fontSize: 40,
    fontWeight: 'bold'
  },
  portraitBody: {
    flexDirection: 'column'
  },
  landScapeBody: {
    flexDirection: 'row'
  },
  androidHeader: {
    ...Platform.select({
      android: {
        paddingTop: StatusBar.currentHeight
      }
    })
  },
  landscapedTextHeadingMainPage: {
    paddingTop: 1,

    fontSize: 40,
    fontWeight: 'bold'
  },
  portraitTextHeading: {
    color: '#3a455c',
    fontSize: 50,
    fontWeight: 'bold'
  },
  landscapedTextHeading: {
    paddingTop: 50,
    color: '#3a455c',
    fontSize: 50,
    fontWeight: 'bold'
  },
  buttonContainer: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'stretch'
  },

  donorButton: {
    flex: 1,
    paddingBottom: 50,
    justifyContent: 'flex-end'
  },
  userButton: {
    flex: 1,
    justifyContent: 'flex-start'
  },

  button: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#3a455c'
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  ItemIcon: {
    marginRight: 10
  },
  ItemIcon2: {
    marginLeft: 5
  }
});
