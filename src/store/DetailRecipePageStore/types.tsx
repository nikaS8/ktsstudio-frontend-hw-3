import { RecipeDetails } from 'store/models/recipe/RecipeDetailed'

import { Meta } from '../../utils/meta'

export interface IDetailRecipePageStore {
  detailedInfo: RecipeDetails | null
  meta: Meta

  fetchDetailsInfo(id: string): Promise<void>
}