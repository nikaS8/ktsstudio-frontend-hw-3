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
  // const [hasRender, setRender] = useState(false)
  // const onShow = React.useCallback(() => setRender(true), [])

  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.card_block}>
        <div className={styles.rating}>
          <img src={star} alt={'star'} />
          <p className={styles.rating_num}>{'3.8'}</p>
        </div>
        <img
          className={styles.card_img}
          width="87px"
          height="70px"
          src={image}
          alt={'food'}
        />
        <h1 className={styles.card_title}>{title}</h1>
        <h2 className={styles.card_subtitle}>
          {subtitle.map((word) => `${word}, `)}
        </h2>
        <div className={styles.footer}>
          <h3 className={styles.card_content}>
            {Math.round(Number(calories))} kcal
          </h3>
          <Link to={`/detail-recipe/${meal.id}`}>
            <button className={styles.add_button}>+</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RecipeCardItem
