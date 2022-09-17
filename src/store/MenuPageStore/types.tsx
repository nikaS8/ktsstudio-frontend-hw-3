export interface ILocalStore {
  destroy(): void
}

export interface IMenuPageStore {
  fetchMealData(): Promise<void>
  fetchOffsetData(): Promise<void>
  fetchRecipeByCategory(category: string): Promise<void>
  fetchRecipeByName(name: string, scrolling: boolean): Promise<void>
  incrementOffset(newValue: number): void
  updateSearchVal(value: string): void
  searchProduct(): void
}
