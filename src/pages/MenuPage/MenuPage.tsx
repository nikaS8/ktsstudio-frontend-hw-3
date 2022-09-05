import React, { useCallback, useEffect, useRef, useState } from 'react'

import Input from '@components/Input/Input'
import { Loader, LoaderSize } from '@components/Loader/Loader'
import { observer, useLocalStore } from 'mobx-react-lite'
import { useSearchParams } from 'react-router-dom'
import { IRecipeResultModel } from 'store/models/recipe'

import MenuPageStore from '../../store/MenuPageStore'
import { Meta } from '../../utils/meta'
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

const MenuPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<Option | null>(null)
  const menuStore = useLocalStore(() => new MenuPageStore)
  const [searchParams, setSearchParams] = useSearchParams()
  const menuRef = useRef(null)

  menuStore.updateSearchVal(searchParams.get('search') || '')

  useEffect(() => {
    menuStore.fetchMealData()
  }, [])

  useEffect(() => {
    if (selectedCategory !== null) {
      menuStore.fetchRecipeByCategory(selectedCategory.key)
    } else {
      menuStore.hasMore && menuStore.fetchMealData()
    }
  }, [selectedCategory])

  useEffect(() => {
    if (menuStore.searchVal.length !== 0) {
      menuStore.fetchRecipeByName(menuStore.searchVal)
    } else {
      menuStore.hasMore && menuStore.fetchMealData()
    }
  }, [menuStore.searchVal])

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
    if (!menuStore.isLoading && (menuStore.hasMore) && (e.currentTarget.scrollTop + 50 + e.currentTarget.clientHeight >= e.currentTarget.scrollHeight)) {
      menuStore.isLoading = true
      menuStore.incrementOffset(menuStore.offset + 5)
      if (selectedCategory !== null) {
        menuStore.fetchRecipeByCategory(selectedCategory.key)
      } else if (menuStore.searchVal.length !== 0) {
        menuStore.fetchRecipeByName(menuStore.searchVal)
      } else {
        menuStore.fetchOffsetData()
      }
    }
  }

  return (
    <div className={styles.menu}>
      <Input className={styles.menu} onChange={(value: string) => handleInput(value)} value={menuStore.searchVal} />
      <MultiDropdown
        options={multiDropdownCategories}
        value={selectedCategory}
        onChange={(value) => switchCategory(value)}
        pluralizeOptions={(value) =>
          value === null ? 'Pick categories' : `${value.value}`
        }
      />
      {menuStore.meta === 'error' && <div className={styles.error}>Can not find any recipe for you!</div>}
      {menuStore.meta !== 'error' &&
      <div onScroll={(e) => onScroll(e)} ref={menuRef} className={styles['menu__recipe']}>
        {menuStore.mealData?.map((food: IRecipeResultModel) => (
          <RecipeCardItem
            key={food.id}
            meal={food}
            image={food.image}
            title={food.title}
            subtitle={food.ingredients}
            calories={food.calories}
          />
        ))}
        {<Loader size={LoaderSize.l} loading={menuStore.meta === Meta.loading} />}
      </div>
      }
      {!menuStore.hasMore && (
        <div className={styles.error}>You've seen all data</div>
      )}
    </div>
  )
}

export default observer(MenuPage)
