// @ts-nocheck
import React from 'react'

import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import DetailRecipePage from './pages/DetailRecipePage/DetailRecipePage'
import Menu from './pages/RecipesCardsPage/components/Menu'
import { RecipeProvider } from './pages/RecipesCardsPage/components/RecipeContex/RecipeContex'

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <RecipeProvider>
          <Routes>
            <Route path='/' element={<Menu />} />
            <Route path='/detail-recipe'>
              <Route path=':id' element={<DetailRecipePage />} />
            </Route>
          </Routes>
        </RecipeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
