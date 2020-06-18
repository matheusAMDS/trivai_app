import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import OpenTrivia, { Category } from '../../services/OpenTrivia'

import styles from './styles'

export default function Categories() {
  const navigation = useNavigation()
  const [ categories, setCategories ] = useState<Category[]>([])

  useEffect(() => {
    OpenTrivia.getCategories().then(result => setCategories(result))
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.description}>
        Select a category for the trivia
      </Text>
      <ScrollView >
        {categories.map(category => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryContainer}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Trivia Questions', {
              category: category.id,
              amount: 10,
              difficulty: 'medium',
              type: 'multiple'
            })}
          >
            <Text style={styles.typeTitle}>{category.subtitle}: </Text>
            <Text style={styles.triviaTitle}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}