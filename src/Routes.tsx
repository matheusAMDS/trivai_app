import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Categories from './pages/Categories'
import TriviaQuestions from './pages/TriviaQuestions'
import TriviaResult from './pages/TriviaResult'

const Stack = createStackNavigator()

function Routes() {
  return (
    <NavigationContainer >
      <Stack.Navigator 
        headerMode="none"
        screenOptions={{
          cardStyle: {
            backgroundColor: 'purple'
          }
        }}
      >
        <Stack.Screen name="Categories" component={Categories} />
        <Stack.Screen name="Trivia Questions" component={TriviaQuestions} />
        <Stack.Screen name="Trivia Result" component={TriviaResult} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes