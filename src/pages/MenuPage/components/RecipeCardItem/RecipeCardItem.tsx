import React from 'react'

import star from '@img/Star 3.svg'
import { Link } from 'react-router-dom'


import styles from './RecipeCardItem.module.scss'

type CardProps = {
  meal: { id: string }
  image: string
  title: React.ReactNode
  subtitle: string[]
  calories?: React.ReactNode
  onClick?: React.MouseEventHandler
}

export const RecipeCardItem: React.FC<CardProps> = ({
                                                      meal,
                                                      image,
                                                      title,
                                                      subtitle,
                                                      calories,
                                                      onClick,
                                                    }) => {

  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles['card__block']}>
        <div className={styles['card__block-rating']}>
          <img src={star} alt={'star'} />
          <p className={styles['card__block-rating-num']}>{'3.8'}</p>
        </div>
        <img
          className={styles['card__block-img']}
          src={image}
          alt={'food'}
        />
        <h1 className={styles['card__block-title']}>{title}</h1>
        <h2 className={styles['card__block-subtitle']}>
          {subtitle.map((word) => `${word}, `)}
        </h2>
        <div className={styles['card__block-footer']}>
          <h3 className={styles['card__block-footer-content']}>
            {Math.round(Number(calories))} kcal
          </h3>
          <Link to={`/detail-recipe/${meal.id}`}>
            <button className={styles['card__block-footer-btn']}>+</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default React.memo(RecipeCardItem)
