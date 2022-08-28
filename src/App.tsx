import React from 'react'

import './App.scss'

import DetailRecipePage from '@pages/DetailRecipePage/DetailRecipePage'
import Menu from '@pages/RecipesCardsPage/components/Menu'
import { RecipeProvider } from '@pages/RecipesCardsPage/components/RecipeContex/RecipeContex'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div className="App">
      <RecipeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/detail-recipe">
              <Route path=":id" element={<DetailRecipePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </RecipeProvider>
    </div>
  )
}

export default App
