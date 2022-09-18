import React, { useCallback, useEffect, useRef, useState } from 'react'

import Input from '@components/Input/Input'
import { Loader, LoaderSize } from '@components/Loader/Loader'
import Group from '@img/Group.png'
import MenuPageStore from '@store/MenuPageStore'
import { IRecipeResultModel } from '@store/models/recipe'
import { Meta } from '@utils/meta'
import { observer, useLocalObservable } from 'mobx-react-lite'
import { useSearchParams } from 'react-router-dom'


import { MultiDropdown, Option } from './components/MultiDropdown/MultiDropdown'
import RecipeCardItem from './components/RecipeCardItem'
import styles from './MenuPage.module.scss'


const multiDropdownCategories = [
  { key: 'main course', value: 'Main course' },
  { key: 'side', value: 'Side' },
  { key: 'dish', value: 'Dish' },
  { key: 'dessert', value: 'Dessert' },
  { key: 'appetizer', value: 'Appetizer' },
  { key: 'salad', value: 'Salad' },
  { key: 'bread', value: 'Bread' },
  { key: 'breakfast', value: 'Breakfast' },
  { key: 'soup', value: 'Soup' },
  { key: 'marinade', value: 'Marinade' },
  { key: 'fingerfood', value: 'Fingerfood' },
  { key: 'snack', value: 'Snack' },
  { key: 'drink', value: 'Drink' },
]

enum ScrollDirection {
  up = 'up',
  down = 'down',
}

let SCROLLING = false;

const MenuPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<Option | null>(null)
  const menuStore = useLocalObservable(() => new MenuPageStore)
  const [searchParams, setSearchParams] = useSearchParams()
  const menuRef = useRef(null)
  const [y, setY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("you have not scrolled yet");
  const [twoFilters, setTwoFilters] = useState(false)

  menuStore.updateSearchVal(searchParams.get('search') || '')

  useEffect(() => {
    menuStore.fetchMealData()
  }, [])

  useEffect(() => {
    if (selectedCategory !== null && !menuStore.searchVal.length) {
      setTwoFilters(false);
      menuStore.makeOffsetZero()
      menuStore.makeMealDataZero()
      menuStore.fetchRecipeByCategory(selectedCategory.key)
    } else {
      menuStore.hasMore && menuStore.fetchMealData()
    }
  }, [selectedCategory])

  useEffect(() => {
    if (menuStore.searchVal.length !== 0 && selectedCategory === null) {
      setTwoFilters(false);
      menuStore.fetchRecipeByName(menuStore.searchVal, SCROLLING)
    } else {
      menuStore.hasMore && menuStore.fetchMealData()
    }
  }, [menuStore.searchVal])

  useEffect(() => {
    if(menuStore.searchVal.length && selectedCategory !== null) {
      setTwoFilters(true);
    }
  }, [menuStore.searchVal, selectedCategory])

  const switchCategory = useCallback((value: Option) => {
      if (value.key !== selectedCategory?.key) {
        setSelectedCategory(value)
      } else {
        setSelectedCategory(null)
      }
    },
    [selectedCategory?.key],
  )

  const handleInput = (value: string) => {
    if (value) {
      setSearchParams({ search: value })
    } else {
      setSearchParams({})
    }
  }

  const onScroll = (e: React.UIEvent<HTMLElement>) => {
    if (y > e.currentTarget.scrollTop) {
      setScrollDirection(ScrollDirection.up);
    }
    if (y < e.currentTarget.scrollTop) {
      setScrollDirection(ScrollDirection.down);
      if ((!menuStore.isLoading) && (menuStore.hasMore) && (!twoFilters) && (e.currentTarget.scrollTop + 50 + e.currentTarget.clientHeight >= e.currentTarget.scrollHeight)) {
        menuStore.isLoading = true;
        menuStore.incrementOffset( menuStore.offset + 5);
        if (selectedCategory !== null && !menuStore.searchVal.length) {
          menuStore.fetchRecipeByCategory(selectedCategory.key)
        } else if (menuStore.searchVal.length !== 0 && selectedCategory === null) {
          SCROLLING = true;
          menuStore.fetchRecipeByName(menuStore.searchVal, SCROLLING);
        } else if (menuStore.searchVal.length !== 0 && selectedCategory !== null) {
          setTwoFilters(true);
        }
        else {
          menuStore.fetchOffsetData()
        }
      }
    }
    SCROLLING = false;
    setY(e.currentTarget.scrollTop)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.menu}>
        <img className={styles['menu__img']} src={Group} alt={'group'}/>

        <Input className={styles['menu__input']} onChange={(value: string) => handleInput(value)} value={menuStore.searchVal} />
        <div className={styles.dropdown} style={{position: 'relative'}}>
          <MultiDropdown
              options={multiDropdownCategories}
              value={selectedCategory}
              onChange={(value) => switchCategory(value)}
              pluralizeOptions={(value) =>
                  value === null ? 'Pick categories' : `${value.value}`
              }
          />
        </div>
        {twoFilters && <div className={styles.error}>Please choose one filter and reload</div>}
        {menuStore.meta === 'error' && <div className={styles.error}>Can not find any recipe for you!</div>}
        {menuStore.meta !== 'error' && !twoFilters &&
        <div onScroll={(e) => onScroll(e)} ref={menuRef} className={styles['menu__recipe']}>
          {menuStore.mealData?.map((food: IRecipeResultModel) => (
            <RecipeCardItem
              key={food.id}
              meal={food}
              image={food.image}
              title={food.title}
              subtitle={food.ingredients}
              calories={food.calories}
              rating={food.rating}
            />
          ))}
          {<Loader size={LoaderSize.l} loading={menuStore.meta === Meta.loading} />}
        </div>
        }
        {!menuStore.hasMore && (
          <div className={styles.error}>You've seen all recipes</div>
        )}
      </div>
    </div>
  )
}

export default observer(MenuPage)
