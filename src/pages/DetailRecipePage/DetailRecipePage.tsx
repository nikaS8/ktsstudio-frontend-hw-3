// @ts-nocheck
import React, { createContext, useContext, useEffect, useState } from 'react'

import heart from '@img/Heart.svg'
import star from '@img/Star 3.svg'
import { RecipeResult } from '@myTypes/RecipeTypes'
import { useParams } from 'react-router-dom'

import RES from '../../config/result'
import {
  RecipeContex,
  useRecipeContext,
} from '../RecipesCardsPage/components/RecipeContex/RecipeContex'
import styles from './DetailRecipePage.module.scss'

const DetailRecipePage = () => {
  const { id } = useParams()
  const recipe = RES.results.find((item) => Number(item.id) === Number(id))
  // const recipeContex = useContext(RecipeContex)
  // const recipe = recipeContex.result
  // recipeContex.fetchID(id)
  // const [recipeId, setRecipeId] = useState([])

  const { id } = useParams()
  const { mealData, loading, fetchSearch, searchData, fetchID, recipeId } =
    useRecipeContext()

  // fetchID(id).then((result) => {
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

  useEffect(() => {
    id && fetchID(id)
  }, [fetchID, id])

  console.log(recipeId)

  return (
    <div className={styles.detailed_block}>
      <img src={recipeId.image} alt={recipeId.title} width='100%' />
      <div className={styles.description}>
        <div className={styles.title}>{recipeId.title}</div>
        <div className={styles.rating_block}>
          <div className={styles.stars_block}>
            <img
              src={star}
              alt={'star'}
              width='16px'
              height='16px'
              className={styles.img_star}
            />
            <p>3.8 Rating</p>
          </div>
          <div className={styles.heart_block}>
            <img src={heart} alt={'heart'} className={styles.img_heart} />
            <p>3.8 Rating</p>
          </div>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: recipe.summary }}
          className={styles.summary}
        ></div>
      </div>
    </div>
  )
}

export default DetailRecipePage
