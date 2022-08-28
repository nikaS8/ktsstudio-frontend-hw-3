import React, { useEffect, useState } from 'react'

import { RecipeResult } from '@myTypes/RecipeTypes'

import RES from '../../../../config/result'
import { Input } from '../Input/Input'
import { MultiDropdown, Option } from '../MultiDropdown/MultiDropdown'
import RecipeCardItem from '../RecipeCardItem'
import { useRecipeContext } from '../RecipeContex/RecipeContex'
import styles from './Menu.module.scss'

const multiDropdownCategories = [
  { key: 'burgerS', value: 'Burger' },
  { key: 'burgerM', value: 'Super Burger' },
  { key: 'burgerL', value: 'Mega Burger' },
]

const Menu = () => {
  const [value, setValue] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<Option[]>([])
  const { fetchMealData, mealData } = useRecipeContext()

  useEffect(() => {
    fetchMealData()
  }, [])

  return (
    <div className={styles.menu_block}>
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
        <div className={styles.recipe_content}>
          {/*  {recipeContex.mealData.map((food) => (*/}
          {/*    <RecipeCardItem*/}
          {/*      key={recipeContex.mealData.id}*/}
          {/*      meal={food}*/}
          {/*      image={food.image}*/}
          {/*      title={food.title}*/}
          {/*      subtitle={food.ingredients}*/}
          {/*      calories={food.calories}*/}
          {/*      onClick={() => console.log("Click")}*/}
          {/*    />*/}
          {/*  ))}*/}

          <div className={styles.recipe_content}>
            {mealData?.map((food: RecipeResult) => (
              <RecipeCardItem
                key={food.id}
                meal={food}
                image={food.image}
                title={food.title}
                subtitle={food.ingredients}
                calories={food.calories}
                onClick={() => console.log('Click')}
              />
            ))}
          </div>

          {/*<RecipeCardItem*/}
          {/*  key={RES.results[0].id}*/}
          {/*  meal={RES.results[0]}*/}
          {/*  image={RES.results[0].image}*/}
          {/*  title={RES.results[0].title}*/}
          {/*  subtitle={RES.results[0].nutrition.ingredients.map(*/}
          {/*    (piece) => piece.name*/}
          {/*  )}*/}
          {/*  calories={RES.results[0].nutrition.nutrients[0].amount}*/}
          {/*  onClick={() => console.log('Click')}*/}
          {/*/>*/}
          {/*<RecipeCardItem*/}
          {/*  key={RES.results[1].id}*/}
          {/*  meal={RES.results[1]}*/}
          {/*  image={RES.results[1].image}*/}
          {/*  title={RES.results[1].title}*/}
          {/*  subtitle={RES.results[1].nutrition.ingredients.map(*/}
          {/*    (piece) => piece.name*/}
          {/*  )}*/}
          {/*  calories={RES.results[1].nutrition.nutrients[0].amount}*/}
          {/*  onClick={() => console.log('Click')}*/}
          {/*/>*/}
        </div>
      )}
      {value && <div className={styles.recipe_content}>{}</div>}
    </div>
  )
}

export default Menu
