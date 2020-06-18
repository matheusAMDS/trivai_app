import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  result: {
    color: 'white',
    fontSize: 26
  },
  resultMessage: {
    fontSize: 22,
    color: 'lightgray',
    marginTop: 16,
    marginBottom: 24
  },
  moreTrivia: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'green',
    borderRadius: 8
  },
  moreTriviaLabel: {
    textAlign: 'center',
    color: 'white',
    fontSize: 22
  }
})