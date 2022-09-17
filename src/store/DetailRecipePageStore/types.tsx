export interface IDetailRecipePageStore {
  fetchDetailsInfo(id: string): Promise<void>
}