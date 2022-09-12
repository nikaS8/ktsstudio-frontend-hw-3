import axios from 'axios'
import { action, computed, makeObservable, observable, runInAction } from 'mobx'

import { Meta } from '../../utils/meta'
import { ILocalStore } from '../MenuPageStore/types'
import { RecipeDetails } from '../models/recipe'
import { IDetailRecipePageStore } from './types'

type PrivateFields = '_detailedInfo' | '_meta';

export default class DetailRecipePageStore implements IDetailRecipePageStore, ILocalStore {
  private _detailedInfo: RecipeDetails | null = null
  private _meta: Meta = Meta.initial

  constructor
  () {
    makeObservable<IDetailRecipePageStore, PrivateFields>(this, {
      _detailedInfo: observable.ref,
      _meta: observable,
      detailedInfo: computed,
      meta: computed,
      fetchDetailsInfo: action.bound,
    })
  }

  get detailedInfo(): RecipeDetails | null {
    return this._detailedInfo
  }

  get meta(): Meta {
    return this._meta
  }

  destroy(): void {
  }

  async fetchDetailsInfo(id: string): Promise<void> {
    this._meta = Meta.loading
    this._detailedInfo = null
    try {
      const res = await axios({
        method: 'get',
        url: `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}`,
      })
      runInAction(() => {
        this._meta = Meta.success
        this._detailedInfo = {
          id: res.data.id,
          image: res.data.image,
          title: res.data.title,
          summary: res.data.summary,
        }
      })
    } catch (error) {
      this._meta = Meta.error
      this._detailedInfo = null
    }
  }
}