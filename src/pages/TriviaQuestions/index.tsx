import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, Modal } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import OpenTrivia, { Params, Question } from '../../services/OpenTrivia'
import styles from './styles'

export default function TriviaQuestions() {
  const routes = useRoute()
  const navigation = useNavigation()
  const params = routes.params as Params
  const init = {} as Question

  const [ questions, setQuestions ] = useState<Question[]>([])
  const [ actualQuestion, setActualQuestion ] = useState<Question>(init)
  const [ index, setIndex ] = useState(1)
  const [ correctAnswers, setCorrectAnswers ] = useState(0)
  const [ correctAnswer, setCorrectAnswer ] = useState(false)
  const [ showModal, setShowModal ] = useState(false)

  const modalBack = correctAnswer ? styles.modalCorrect : styles.modalWrong

  useEffect(() => {
    OpenTrivia.getQuestions(params).then(result => {
      setQuestions(result)
      setActualQuestion(result[0])
    })
  }, [])

  useEffect(() => {
    if (index === 10)
      navigation.navigate('Trivia Result', { correctAnswers })
  }, [correctAnswers])

  function selectQuestion(answer: string) {
    if (actualQuestion.correct_answer === answer) {
      setCorrectAnswers(correctAnswers + 1)
      setCorrectAnswer(true)
    } else
      setCorrectAnswer(false)

    setShowModal(true)
    setTimeout(() => {
      setShowModal(false)
      
      if (index <= 9) {
        setActualQuestion(questions[index])
        setIndex(index + 1)
      }
    }, 1000)
  }

  return (
    <View style={styles.container}>
      {showModal ? (
        <Modal transparent >
          <View style={[styles.modal, modalBack]}>
            <Text style={styles.modalText}>
              {correctAnswer ? "Correct" : "Wrong"}
            </Text>
          </View>
        </Modal>
      ) : null}
      <Text style={styles.questionNumber}>Question nº {index}</Text>
      <Text style={styles.question}>
        {actualQuestion.question}
      </Text>
      <FlatList
        style={styles.optionsContainer}
        data={actualQuestion.options}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.option}
            onPress={() => selectQuestion(item)}
          >
            <Text style={styles.optionText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}