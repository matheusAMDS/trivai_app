import api from './api'
import { convertFromBase64 } from '../lib/Base64'
import shuffle from 'lodash/shuffle'

export interface Params {
  category: number;
  amount: number;
  type: string;
  difficulty: string;
}

export interface Question {
  question: string;
  correct_answer: string;
  options: string[];
}

export interface Category {
  id: number;
  name: string;
  subtitle: string;
}

interface RawQuestion {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface RawCategory {
  id: number;
  name: string;
}

class OpenTrivia {
  private encoding:string = 'base64'

  async getCategories() {
    const response = await api.get('/api_category.php') 
    const categories:RawCategory[] = response.data.trivia_categories.slice(1,)
    const serializedCategories = categories.map(category => {
      const [subtitle, name] = category.name
        .split(':')
        .map(cat => cat.trim())

      return {
        id: category.id,
        name: name || subtitle,
        subtitle: name ? subtitle : "General"
      }
    })

    return serializedCategories
  }

  async getQuestions(params: Params) {
    const response = await api.get('/api.php', {
      params: {
        ...params,
        encode: this.encoding
      }
    })
    const rawQuestions:RawQuestion[] = response.data.results 
    const serializedQuestions:Question[] = rawQuestions.map(rawQuestion => {
      let { question, correct_answer, incorrect_answers } = rawQuestion
      
      correct_answer = convertFromBase64(correct_answer)
      
      const options = incorrect_answers
        .map(answer => convertFromBase64(answer))
        .concat([correct_answer])

      return {
        correct_answer,
        question: convertFromBase64(question),
        options: shuffle(options)
      }
    })

    return serializedQuestions
  }
}

export default new OpenTrivia()