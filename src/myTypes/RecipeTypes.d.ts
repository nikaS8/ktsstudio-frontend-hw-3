export type RecipeContexProps = {
  fetchMealData: () => void
  mealData: RecipeResult[] | null
  loading: boolean
  fetchDetailsInfo: (id: string) => void
  detailsInfo: RecipeDetails | null
}

export interface RecipeDetails {
  id: string
  image: string
  title: string
  summary: string
}

