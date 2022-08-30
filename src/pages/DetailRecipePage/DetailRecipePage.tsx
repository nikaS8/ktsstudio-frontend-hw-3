import React, { useEffect } from 'react'

import { APP_ROUTES } from '@config/routes'
import heart from '@img/Heart.svg'
import path from '@img/Path.svg'
import star from '@img/Star 3.svg'
import { useRecipeContext } from '@pages/RecipeContext/RecipeContex'
import { Link, useParams } from 'react-router-dom'

import styles from './DetailRecipePage.module.scss'

const DOMPurify = require('dompurify')(window)

const DetailRecipePage = () => {
  const { id } = useParams()
  const { fetchDetailsInfo, detailsInfo } = useRecipeContext()

  useEffect(() => {
    id && fetchDetailsInfo(id)
  }, [id])

  return (
    <div className={styles.recipe}>
      <Link to={APP_ROUTES.RECIPE}>
        <button className={styles['recipe__btn']}>
          <img src={path} alt={'path'} />
        </button>
      </Link>
      <img src={detailsInfo?.image} alt={detailsInfo?.title} className={styles['recipe__img']} />
      <div className={styles['recipe__description']}>
        <div className={styles['recipe__description-title']}>{detailsInfo?.title}</div>
        <div className={styles['recipe__description-rating']}>
          <div className={styles['recipe__description-rating-star']}>
            <img
              src={star}
              alt={'star'}
              className={styles['recipe__description-rating-star-img']}
            />
            <p>3.8 Rating</p>
          </div>
          <div className={styles['recipe__description-rating-heart']}>
            <img src={heart} alt={'heart'} className={styles['recipe__description-rating-heart-img']} />
            <p>3.8 Rating</p>
          </div>
        </div>
        {detailsInfo && (
          <div
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(detailsInfo.summary) }}
            className={styles['recipe__description-summary']}
          />
        )}
      </div>
    </div>
  )
}

export default DetailRecipePage
