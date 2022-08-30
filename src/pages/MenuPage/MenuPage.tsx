import React, { useEffect, useState } from 'react'

import Input from '@components/Input/Input'
import { RecipeResult } from '@myTypes/RecipeTypes'
import { useRecipeContext } from '@pages/RecipeContext/RecipeContex'

import { MultiDropdown, Option } from './components/MultiDropdown/MultiDropdown'
import RecipeCardItem from './components/RecipeCardItem'
import styles from './MenuPage.module.scss'

const multiDropdownCategories = [
  { key: 'burgerS', value: 'Burger' },
  { key: 'burgerM', value: 'Super Burger' },
  { key: 'burgerL', value: 'Mega Burger' },
]

const MenuPage = () => {
  const [value, setValue] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<Option[]>([])
  const { fetchMealData, mealData } = useRecipeContext()

  useEffect(() => {
    fetchMealData()
  }, [])

  return (
    <div className={styles.menu}>
      <Input onChange={(value: string) => setValue(value)} value={value} />
      <MultiDropdown
        options={multiDropdownCategories}
        value={selectedCategory}
        onChange={(value) => setSelectedCategory(value)}
        pluralizeOptions={(value) =>
          !value.length ? 'Pick categories' : `Selected ${value.length}`
        }
      />
      {!value && (
        <div className={styles['menu__recipe']}>
          {mealData?.map((food: RecipeResult) => (
            <RecipeCardItem
              key={food.id}
              meal={food}
              image={food.image}
              title={food.title}
              subtitle={food.ingredients}
              calories={food.calories}
            />
          ))}
        </div>
      )}
      {value && <div className={styles['menu__recipe-content']}>{}</div>}
    </div>
  )
}

export default MenuPage
