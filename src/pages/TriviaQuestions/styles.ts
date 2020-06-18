import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 16
  },
  questionNumber: {
    color: 'lightgray',
    fontSize: 20
  },
  question: {
    color: 'white',
    textAlign: 'center',
    fontSize: 26
  },
  optionsContainer: {
    marginTop: 32
  },
  option: {
    backgroundColor: 'white',
    padding: 16,
    marginTop: 16,
    borderRadius: 8
  },
  optionText: {
    fontSize: 22,
    textAlign: 'center'
  },
  modal: {
    maxWidth: 150,
    alignSelf: 'center',
    padding: 16,
    marginTop: 24,
    borderRadius: 8
  },
  modalCorrect: {
    backgroundColor: 'green'
  },
  modalWrong: {
    backgroundColor: 'red'
  },
  modalText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18
  }
})