// @ts-nocheck
import React from "react";

import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DetailRecipePage from "./pages/DetailRecipePage/DetailRecipePage";
import Menu from "./pages/RecipesCardsPage/components/Menu";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/detail-recipe">
            <Route path=":id" element={<DetailRecipePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
