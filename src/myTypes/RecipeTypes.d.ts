export type RecipeContexProps = {
  fetchMealData: () => void
  mealData: RecipeResult[] | null
  loading: boolean
  fetchDetailsInfo: (id: string) => void
  detailsInfo: RecipeDetails | null
}

export interface RecipeResult {
  id: string
  image: string
  title: string
  calories: string
  ingredients: string[]
}

export interface RecipeDetails {
  id: string
  image: string
  title: string
  summary: string
}

export interface SearchRecipe {
  id: string
  image: string
  title: string
}
