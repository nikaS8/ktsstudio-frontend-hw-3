export type RecipeContexProps = {
  mealData: RecipeResult[]
  loading: boolean
  fetchSearch: (searchValue: string) => void
  searchData: RecipeResult[]
  fetchID: (id: string) => void
  recipeId: RecipeResult[]
}

export interface RecipeResult {
  id: string
  image: string
  title: string
  nutrition: {
    nutrients: { amount: string }[]
    ingredients: { name: string }[]
  }
}

export interface SearchRecipe {
  id: string
  image: string
  title: string
}
