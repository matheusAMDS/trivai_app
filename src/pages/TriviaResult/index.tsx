import React from 'react'
import { View, Text } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler'

import styles from './styles'

interface Params {
  correctAnswers: number;
}

export default function TriviaResult() {
  const navigation = useNavigation()
  const params = useRoute().params as Params

  function rating(correct: number) {
    if (correct === 0)
      return "Lol, you are veeery dumb, kill yourself!"
    else if (correct < 4) 
      return "Urgh, that was very bad..."
    else if (correct < 7 )
      return "You can do better!"
    else if (correct < 10)
      return "You nailed it!"
    else 
      return "I kneel before such wisdom..."
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.result}>You answered correctly</Text>
      <Text style={styles.result}>
        {params.correctAnswers}/10 questions!
      </Text>
      <Text style={styles.resultMessage}>
        {rating(params.correctAnswers)}
      </Text>
      <RectButton
        style={styles.moreTrivia}
        onPress={() => navigation.navigate('Categories')}
      >
        <Text style={styles.moreTriviaLabel}>More Trivia</Text>
      </RectButton>

    </View>
  )
}