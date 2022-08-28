import React, { createContext, useContext, useState } from 'react'

import {
  RecipeContexProps,
  RecipeResult,
  RecipeDetails,
} from '@myTypes/RecipeTypes'
import axios from 'axios'

export const RecipeContex = createContext<RecipeContexProps | null>(null)

export const RecipeProvider = ({ children }: any) => {
  const [mealData, setMealData] = useState<RecipeResult[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [detailsInfo, setDetailsInfo] = useState<RecipeDetails | null>(null)

  const fetchMealData = async () => {
    setLoading(true)
    const result = await axios({
      method: 'get',
      url: `https://api.spoonacular.com/recipes/complexSearch?addRecipeNutrition=true&apiKey=${process.env.REACT_APP_API_KEY}`,
    })
    setMealData(
      result.data.results.map((raw: any) => ({
        id: raw.id,
        image: raw.image,
        title: raw.title,
        calories: raw.nutrition.nutrients[0].amount,
        ingredients: raw.nutrition.ingredients.map(
          (piece: { name: string }) => piece.name
        ),
      }))
    )
    setLoading(false)
  }

  // const fetchSearch = async (searchValue: string) => {
  //   // const fetch = async () => {
  //   setLoading(true)
  //   const result = await axios({
  //     method: 'get',
  //     url: `https://api.spoonacular.com/recipes/complexSearch?query=${searchValue}&addRecipeInformation=true&apiKey=83bff821e7514569972160e6b849ee2f`,
  //   })
  //   setSearchData(
  //     result.data.results.map((raw: RecipeResult) => ({
  //       id: raw.id,
  //       image: raw.image,
  //       title: raw.title,
  //       calories: raw.nutrition.nutrients[0].amount,
  //       ingredients: raw.nutrition.ingredients.map((piece) => piece.name),
  //     })),
  //   )
  //   setLoading(false)
  //   // }
  // }

  const fetchDetailsInfo = async (id: string) => {
    setLoading(true)
    try {
      const res = await axios({
        method: 'get',
        url: `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY_V_1}`,
      })
      setDetailsInfo({
        id: res.data.id,
        image: res.data.image,
        title: res.data.title,
        summary: res.data.summary,
      })
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }
  return (
    <RecipeContex.Provider
      value={{
        fetchMealData,
        mealData,
        loading,
        fetchDetailsInfo,
        detailsInfo,
      }}
    >
      {children}
    </RecipeContex.Provider>
  )
}

export const useRecipeContext = () => {
  const checkContext = useContext(RecipeContex)
  if (!checkContext) {
    throw new Error('useRecipeContext must be called within RecipeProvider')
  }
  return checkContext
}
