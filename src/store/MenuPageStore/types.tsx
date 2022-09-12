import { Meta } from 'utils/meta'

import { IRecipeResultModel } from '../models/recipe'

export interface ILocalStore {
  destroy(): void
}

export interface IMenuPageStore {
  mealData: IRecipeResultModel[]
  meta: Meta
  searchVal: string
  number: number
  hasMore: boolean
  offset: number

  fetchMealData(): Promise<void>

  fetchOffsetData(): Promise<void>

  fetchRecipeByCategory(category: string): Promise<void>

  fetchRecipeByName(name: string): Promise<void>

  incrementOffset(newValue: number): void

  updateSearchVal(value: string): void

  searchProduct(): void
}
