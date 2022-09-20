import { Meta } from '@utils/meta'
import axios from 'axios'
import { action, computed, makeObservable, observable, runInAction } from 'mobx'

import { IRecipeResultModel } from '../models/recipe'
import { ILocalStore, IMenuPageStore } from './types'

type PrivateFields = '_mealData' | '_meta' | '_number' | '_offset' ;

export default class MenuPageStore implements IMenuPageStore, ILocalStore {
  private _mealData: IRecipeResultModel[] = []
  private _meta: Meta = Meta.initial
  hasMore: boolean = true
  private _number: number = 5
  private _offset: number = 0
  searchVal: string = ''
  isLoading: boolean = false

  constructor
  () {
    makeObservable<MenuPageStore, PrivateFields>(this, {
      _mealData: observable.ref,
      _meta: observable,
      _number: observable,
      _offset: observable,

      mealData: computed,
      meta: computed,
      number: computed,

      fetchMealData: action.bound,
      fetchOffsetData: action.bound,
      fetchRecipeByCategory: action.bound,
      fetchRecipeByName: action.bound,
      incrementOffset: action.bound,
      makeOffsetZero: action.bound,
      makeMealDataZero: action.bound,
      updateSearchVal: action.bound,
      searchProduct: action.bound,
    })
  }

  get mealData(): IRecipeResultModel[] {
    return this._mealData
  }

  get meta(): Meta {
    return this._meta
  }

  get number(): number {
    return this._number
  }

  get offset(): number {
    return this._offset
  }

  destroy(): void {
  }

  incrementOffset(newValue: number): void {
    this._offset = newValue
  }

  makeOffsetZero():void {
    this._offset = 0
  }

  makeMealDataZero():void {
    this._mealData = [];
  }

  async fetchMealData(): Promise<void> {
    this._meta = Meta.loading
    if (this.searchVal.length !== 0) {
      this.searchProduct()
      return
    }
    try {
      const result = await axios({
        method: 'get',
        url: `https://api.spoonacular.com/recipes/complexSearch?addRecipeNutrition=true&number=5&apiKey=74e0dec4cbd74b968c02ddbd8b9850e8`,
      })
      runInAction(() => {
        this._mealData = result.data.results.map((raw: any) => ({
          id: raw.id,
          key: raw.title,
          image: raw.image,
          title: raw.title,
          calories: raw.nutrition.nutrients[0].amount,
          ingredients: raw.nutrition.ingredients.map(
            (piece: { name: string }) => piece.name,
          ),
          rating: raw.aggregateLikes,
        }))
        this._meta = Meta.success;
        this.isLoading = false;
      })
    } catch (error) {
      runInAction(() => {
        this._meta = Meta.error
        this._mealData = []
      })
    }
  }

  async fetchOffsetData(): Promise<void> {
    this._meta = Meta.loading
    let newData = null
    if (this.searchVal.length !== 0) {
      this.searchProduct()
      return
    }
    try {
      const result = await axios({
        method: 'get',
        url: `https://api.spoonacular.com/recipes/complexSearch?addRecipeNutrition=true&number=${this._number}&offset=${this._offset}&apiKey=74e0dec4cbd74b968c02ddbd8b9850e8`,
      })
      runInAction(() => {
        newData = result.data.results.map((raw: any) => ({
          id: raw.id,
          key: raw.title,
          image: raw.image,
          title: raw.title,
          calories: raw.nutrition.nutrients[0].amount,
          ingredients: raw.nutrition.ingredients.map(
            (piece: { name: string }) => piece.name,
          ),
          rating: raw.aggregateLikes,
        }))
        this.isLoading = false;
        if (this._mealData.length === 0) {
          this._mealData = newData
        } else {
          this._mealData = [...this._mealData, ...newData]
        }
        newData = null
        if (this._mealData.length < this._number) {
          this.hasMore = false
        }
        this._meta = Meta.success
      })
    } catch (error) {
      runInAction(() => {
        this._meta = Meta.error
        this._mealData = []
      })
    }
  }

  async fetchRecipeByCategory(category: string): Promise<void> {
    this._meta = Meta.loading
    let newData = null
    try {
      const result = await axios({
        method: 'get',
        url: `https://api.spoonacular.com/recipes/complexSearch?type=${category}&number=${this._number}&offset=${this._offset}&addRecipeNutrition=true&apiKey=74e0dec4cbd74b968c02ddbd8b9850e8`,
      })
      runInAction(() => {
        newData = result.data.results.map((raw: any) => ({
          id: raw.id,
          image: raw.image,
          title: raw.title,
          calories: raw.nutrition.nutrients[0].amount,
          ingredients: raw.nutrition.ingredients.map(
            (piece: { name: string }) => piece.name,
          ),
          rating: raw.aggregateLikes,
        }))
        if (this._mealData.length === 0) {
          this._mealData = newData
        } else {
          this._mealData = [...this._mealData, ...newData]
        }
        newData = null
        if (this._mealData.length < this._offset) {
          this.hasMore = false
        }
        this._meta = Meta.success;
        this.isLoading = false;
      })
    } catch (error) {
      runInAction(() => {
        this._meta = Meta.error
        this._mealData = []
      })
    }
  }

  async fetchRecipeByName(name: string, scrolling: boolean): Promise<void> {
    this._meta = Meta.loading
    if (!scrolling) {
      this._offset = 0;
    }
    let newData = null;
    try {
      const result = await axios({
        method: 'get',
        url: `https://api.spoonacular.com/recipes/complexSearch?query=${name}&number=${this._number}&offset=${this._offset}&addRecipeNutrition=true&apiKey=74e0dec4cbd74b968c02ddbd8b9850e8`,
      })
      runInAction(() => {
        newData = result.data.results.map((raw: any) => ({
          id: raw.id,
          image: raw.image,
          title: raw.title,
          calories: raw.nutrition.nutrients[0].amount,
          ingredients: raw.nutrition.ingredients.map(
            (piece: { name: string }) => piece.name,
          ),
          rating: raw.aggregateLikes,
        }))
        this.isLoading = false;
        if (!scrolling) {
          this._mealData = newData
        } else {
          this._mealData = [...this._mealData, ...newData]
        }
        newData = null
        if (this._mealData.length < this._offset) {
          this.hasMore = false
        }
        if (this.searchVal.length !== 0) {
          this.searchProduct()
          return
        }
        this._meta = Meta.success;
      })
    } catch (error) {
      runInAction(() => {
        this._meta = Meta.error
        this._mealData = []
      })
    }
  }

  updateSearchVal = (value: string): void => {
    this.searchVal = value
  }

  searchProduct = (): void => {
    const recipes = this._mealData.filter((recipe) => recipe.title.toLowerCase().includes(this.searchVal.toLowerCase()))
    if (recipes.length) {
      this._mealData = recipes
    } else {
      this._meta = Meta.error
    }
  }
}
