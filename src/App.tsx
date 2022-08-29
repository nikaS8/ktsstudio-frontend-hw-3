import React from 'react'

import { APP_ROUTES } from '@config/routes'
import DetailRecipePage from '@pages/DetailRecipePage/DetailRecipePage'
import MenuPage from '@pages/MenuPage'
import { RecipeProvider } from '@pages/RecipeContext/RecipeContex'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div className='App'>
      <RecipeProvider>
        <BrowserRouter>
          <Routes>
            <Route path={APP_ROUTES.RECIPE} element={<MenuPage />} />
            <Route path={APP_ROUTES.RECIPE_DETAIL} element={<DetailRecipePage />} />
          </Routes>
        </BrowserRouter>
      </RecipeProvider>
    </div>
  )
}

export default App
