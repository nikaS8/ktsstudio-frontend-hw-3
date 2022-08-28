import React, { useEffect, useState } from 'react'

import heart from '@img/Heart.svg'
import path from '@img/Path.svg'
import star from '@img/Star 3.svg'
import { Link, useParams } from 'react-router-dom'

import RES from '../../config/result'
import { useRecipeContext } from '../RecipesCardsPage/components/RecipeContex/RecipeContex'
import styles from './DetailRecipePage.module.scss'

const DetailRecipePage = () => {
  const { id } = useParams()
  const { fetchDetailsInfo, detailsInfo } = useRecipeContext()

  useEffect(() => {
    id && fetchDetailsInfo(id)
  }, [id])

  return (
    <div className={styles.detailed_block}>
      <Link to={`/`}>
        <button className={styles.next_button}>
          <img src={path} alt={'path'} />
        </button>
      </Link>
      {/*<img*/}
      {/*  src={'https://spoonacular.com/recipeImages/716429-556x370.jpg'}*/}
      {/*  alt={'bla'}*/}
      {/*  width='100%'*/}
      {/*/>*/}
      <img src={detailsInfo?.image} alt={detailsInfo?.title} width="100%" />
      <div className={styles.description}>
        <div className={styles.title}>{detailsInfo?.title}</div>
        <div className={styles.rating_block}>
          <div className={styles.stars_block}>
            <img
              src={star}
              alt={'star'}
              width="16px"
              height="16px"
              className={styles.img_star}
            />
            <p>3.8 Rating</p>
          </div>
          <div className={styles.heart_block}>
            <img src={heart} alt={'heart'} className={styles.img_heart} />
            <p>3.8 Rating</p>
          </div>
        </div>
        {detailsInfo && (
          <div
            dangerouslySetInnerHTML={{ __html: detailsInfo.summary }}
            className={styles.summary}
          ></div>
        )}
      </div>
    </div>
  )
}

export default DetailRecipePage
