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
  rating: string
  onClick?: React.MouseEventHandler
}

export const RecipeCardItem: React.FC<CardProps> = ({
                                                      meal,
                                                      image,
                                                      title,
                                                      subtitle,
                                                      calories,
                                                      rating,
                                                      onClick,
                                                    }) => {

  const subtitleStr = subtitle.map((word) => `${word}`).join(', ');
    return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles['card__block']}>
        <div className={styles['card__block-header']}>
          <div className={styles['card__block-header-rating']}>
              <img src={star} alt={'star'} />
              <p className={styles['card__block-header-rating-num']}>{rating}</p>
          </div>
        </div>
        <div className={styles['card__block-content']}>
            <img
                className={styles['card__block-content-img']}
                src={image}
                alt={'food'}
            />
            <h1 className={styles['card__block-content-title']}>{title}</h1>
            <h2 className={styles['card__block-content-subtitle']}>
                {subtitleStr}
            </h2>
        </div>
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
