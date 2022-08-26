// @ts-nocheck
import React, { createContext, useContext, useEffect, useState } from "react";

import axios from "axios";

import RES from "../../../../config/result";
import { Input } from "../Input/Input";
import { MultiDropdown } from "../MultiDropdown/MultiDropdown";
import RecipeCardItem from "../RecipeCardItem";
import styles from "./Menu.module.scss";

export const ReceiptContex = createContext();
export const ReceiptProvider = (props) => {
  const [mealData, setMealData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const result = await axios({
        method: "get",
        url: `https://api.spoonacular.com/recipes/complexSearch?addRecipeNutrition=true&apiKey=${process.env.REACT_APP_API_KEY}`,
      });
      setMealData(
        result.data.results.map((raw) => ({
          id: raw.id,
          image: raw.image,
          title: raw.title,
          calories: raw.nutrition.nutrients[0].amount,
          ingredients: raw.nutrition.ingredients.map((piece) => piece.name),
        }))
      );
    };
    fetch();
  }, []);
  return (
    <ReceiptContex.Provider value={{ mealData }}>
      {props.children}
    </ReceiptContex.Provider>
  );
};

const Menu = () => {
  // const [mealData, setMealData] = useState([]);
  //
  // useEffect(() => {
  //   const fetch = async () => {
  //     const result = await axios({
  //       method: "get",
  //       url: `https://api.spoonacular.com/recipes/complexSearch?addRecipeNutrition=true&apiKey=${process.env.REACT_APP_API_KEY}`,
  //     });
  //     setMealData(
  //       result.data.results.map((raw) => ({
  //         id: raw.id,
  //         image: raw.image,
  //         title: raw.title,
  //         calories: raw.nutrition.nutrients[0].amount,
  //         ingredients: raw.nutrition.ingredients.map((piece) => piece.name),
  //       }))
  //     );
  //   };
  //   fetch();
  // }, []);
  const recipeContex = useContext(ReceiptContex);

  return (
    <ReceiptProvider>
      <div className={styles.menu_block}>
        <Input onChange={(value: string) => console.log(value)} />
        <MultiDropdown
          options={[
            { key: "burgerS", value: "Burger" },
            { key: "burgerM", value: "Super Burger" },
            { key: "burgerL", value: "Mega Burger" },
          ]}
          value={{ key: "burgerL", value: "Mega Burger" }}
          onChange={() => ""}
          pluralizeOptions={() => ""}
        />

        <div className={styles.recipe_content}>
          {recipeContex.mealData.map((food) => (
            <RecipeCardItem
              key={recipeContex.mealData.id}
              meal={food}
              image={food.image}
              title={food.title}
              subtitle={food.ingredients}
              calories={food.calories}
              onClick={() => console.log("Click")}
            />
          ))}

          {/*<div className={styles.recipe_content}>*/}
          {/*  {mealData.map((food) => (*/}
          {/*    <RecipeCardItem*/}
          {/*      key={mealData.id}*/}
          {/*      meal={food}*/}
          {/*      image={food.image}*/}
          {/*      title={food.title}*/}
          {/*      subtitle={food.ingredients}*/}
          {/*      calories={food.calories}*/}
          {/*      onClick={() => console.log("Click")}*/}
          {/*    />*/}
          {/*  ))}*/}

          {/*<RecipeCardItem*/}
          {/*    key={RES.results[0].id}*/}
          {/*    meal={RES.results[0]}*/}
          {/*    image={RES.results[0].image}*/}
          {/*    title={RES.results[0].title}*/}
          {/*    subtitle={RES.results[0].nutrition.ingredients.map(*/}
          {/*        (piece) => piece.name*/}
          {/*    )}*/}
          {/*    calories={RES.results[0].nutrition.nutrients[0].amount}*/}
          {/*    onClick={() => console.log("Click")}*/}
          {/*/>*/}
          {/*<RecipeCardItem*/}
          {/*    key={RES.results[1].id}*/}
          {/*    meal={RES.results[1]}*/}
          {/*    image={RES.results[1].image}*/}
          {/*    title={RES.results[1].title}*/}
          {/*    subtitle={RES.results[1].nutrition.ingredients.map(*/}
          {/*        (piece) => piece.name*/}
          {/*    )}*/}
          {/*    calories={RES.results[1].nutrition.nutrients[0].amount}*/}
          {/*    onClick={() => console.log("Click")}*/}
          {/*/>*/}
        </div>
        {/*{console.log(RES.results[0].ingredients, "ingri")}*/}
        {/*{console.log(mealData[0], "mealData")}*/}
      </div>
    </ReceiptProvider>
  );
};

export default Menu;
