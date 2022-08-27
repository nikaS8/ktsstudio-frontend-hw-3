import React, { createContext, useContext, useEffect, useState } from 'react'

import {
  RecipeContexProps,
  RecipeResult,
  SearchRecipe,
} from '@myTypes/RecipeTypes'
import axios from 'axios'

export const RecipeContex = createContext<RecipeContexProps | null>(null)

export const RecipeProvider = ({ children }: any) => {
  const [mealData, setMealData] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchData, setSearchData] = useState([])
  const [recipeId, setRecipeId] = useState([])
  // useEffect(() => {
  //   fetch()
  // }, [])
  // const fetch = async () => {
  //   setLoading(true)
  //   const result = await axios({
  //     method: 'get',
  //     url: `https://api.spoonacular.com/recipes/complexSearch?addRecipeNutrition=true&apiKey=${process.env.REACT_APP_API_KEY}`,
  //   })
  //   setMealData(
  //     result.data.results.map((raw: RecipeResult) => ({
  //       id: raw.id,
  //       image: raw.image,
  //       title: raw.title,
  //       calories: raw.nutrition.nutrients[0].amount,
  //       ingredients: raw.nutrition.ingredients.map((piece) => piece.name),
  //     })),
  //   )
  //   setLoading(false)
  // }
  //
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

  const fetchID = async (id: string) => {
    setLoading(true)
    try {
      const res = await axios({
        method: 'get',
        url: `https://api.spoonacular.com/recipes/${id}/information?apiKey=83bff821e7514569972160e6b849ee2f`,
      })
      setRecipeId(
        res.data.results.map((raw: RecipeResult) => ({
          id: raw.id,
          image: raw.image,
          title: raw.title,
          calories: raw.nutrition.nutrients[0].amount,
          ingredients: raw.nutrition.ingredients.map((piece) => piece.name),
        })),
      )
    } catch (err) {
      console.error(err)
    }
    // fetchID().then(result => {
    //   setRecipeId(
    //     result.data.results.map((raw: RecipeResult) => ({
    //       id: raw.id,
    //       image: raw.image,
    //       title: raw.title,
    //       calories: raw.nutrition.nutrients[0].amount,
    //       ingredients: raw.nutrition.ingredients.map((piece) => piece.name),
    //     })),
    //   )
    // })
    //
    // console.log(result)
    // setRecipeId(
    //   result.data.results.map((raw: RecipeResult) => ({
    //     id: raw.id,
    //     image: raw.image,
    //     title: raw.title,
    //     calories: raw.nutrition.nutrients[0].amount,
    //     ingredients: raw.nutrition.ingredients.map((piece) => piece.name),
    //   })),
    // )
    setLoading(false)
  }
  return (
    <RecipeContex.Provider
      value={{ mealData, loading, fetchSearch, searchData, fetchID, recipeId }}
    >
      {children}
    </RecipeContex.Provider>
  )
}

export const useRecipeContext = () => useContext(RecipeContex)
