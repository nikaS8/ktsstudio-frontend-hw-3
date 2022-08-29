import React, { useEffect } from 'react'

import { APP_ROUTES } from '@config/routes'
import heart from '@img/Heart.svg'
import path from '@img/Path.svg'
import star from '@img/Star 3.svg'
import { useRecipeContext } from '@pages/RecipeContext/RecipeContex'
import { Link, useParams } from 'react-router-dom'

import styles from './DetailRecipePage.module.scss'

const DetailRecipePage = () => {
  const { id } = useParams()
  const { fetchDetailsInfo, detailsInfo } = useRecipeContext()

  useEffect(() => {
    id && fetchDetailsInfo(id)
  }, [id])

  return (
    <div className={styles.detailed_block}>
      <Link to={APP_ROUTES.RECIPE}>
        <button className={styles.back_button}>
          <img src={path} alt={'path'} />
        </button>
      </Link>
      <img src={detailsInfo?.image} alt={detailsInfo?.title} width='100%' />
      <div className={styles.description}>
        <div className={styles.title}>{detailsInfo?.title}</div>
        <div className={styles.rating_block}>
          <div className={styles.stars_block}>
            <img
              src={star}
              alt={'star'}
              className={styles['stars_block__img']}
            />
            <p>3.8 Rating</p>
          </div>
          <div className={styles.heart_block}>
            <img src={heart} alt={'heart'} className={styles['heart_block__img']} />
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
