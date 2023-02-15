import { StyleSheet } from 'react-native';

export const sharedStyles = StyleSheet.create({
  fullWidthButton: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginBottom: 15,
    alignSelf: 'stretch',
    color: 'black',
    padding: 5,
    borderRadius: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  fullWidthButtonText: {
    fontSize: 24,
    color: 'black',
  },
});
