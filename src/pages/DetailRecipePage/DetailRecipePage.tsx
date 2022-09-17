import React, { useEffect } from 'react'

import { APP_ROUTES } from '@config/routes'
import heart from '@img/Heart.svg'
import path from '@img/Path.svg'
import star from '@img/Star 3.svg'
import { observer, useLocalObservable } from 'mobx-react-lite'
import { Link, useParams } from 'react-router-dom'

import DetailRecipePageStore from '../../store/DetailRecipePageStore/DetailRecipePageStore'
import styles from './DetailRecipePage.module.scss'

const DOMPurify = require('dompurify')(window)

const DetailRecipePage = () => {
  const { id } = useParams()
  const detailsStore = useLocalObservable(() => new DetailRecipePageStore())
  useEffect(() => {
    id && detailsStore.fetchDetailsInfo(id)
  }, [id])
  const hearts = Number(detailsStore.detailedInfo?.hearts) / 100 * 5;
  return (
    <div className={styles.wrapper}>
      <div className={styles.recipe}>

        <div className={styles['recipe__block']}>
          <img src={detailsStore.detailedInfo?.image} alt={detailsStore.detailedInfo?.title}
               className={styles['recipe__block-img']} />
          <Link className={styles['recipe__block-link']} to={APP_ROUTES.RECIPE}>
            <button className={styles['recipe__block-link-btn']}>
              <img src={path} alt={'path'} />
            </button>
          </Link>
        </div>

        <div className={styles['recipe__description']}>
          <div className={styles['recipe__description-title']}>{detailsStore.detailedInfo?.title}</div>
          <div className={styles['recipe__description-rating']}>
            <div className={styles['recipe__description-rating-star']}>
              <img
                  src={star}
                  alt={'star'}
                  className={styles['recipe__description-rating-star-img']}
              />
              <p className={styles['recipe__description-rating-star-text']}>{detailsStore.detailedInfo?.rating}</p>
            </div>
            <div className={styles['recipe__description-rating-heart']}>
              <img src={heart} alt={'heart'} className={styles['recipe__description-rating-heart-img']} />
              <p className={styles['recipe__description-rating-heart-text']}>{hearts.toFixed(2)} Rating</p>
            </div>
          </div>
          {detailsStore.detailedInfo && (
              <div
                  dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(detailsStore.detailedInfo.summary) }}
                  className={styles['recipe__description-summary']}
              />
          )}
        </div>
      </div>
    </div>

  )
}

export default observer(DetailRecipePage)
