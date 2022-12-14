export const useLikeStatus = () => {
  // for favorite meals (eg. for favMeals 1 Meal)
  const singleFavMeals = (meals) => {
    if (meals?.length > 0) {
      meals = meals.map((meal) => {
        meal.liked = true;
        return meal;
      });
    }
    return meals;
  };

  // for meals which are not necessary favorite meals (eg. for catalog)
  const singleMeals = (meals, favMeals) => {
    if (favMeals.length === 0) {
      meals = meals.map((meal) => { 
        meal.liked = false;
        return meal
      })
    } else if (meals?.length > 0) {
      meals = meals.map((meal) => {
        if (favMeals.includes(meal.mealinformation.id)) {
          meal.liked = true;
        } else {
          meal.liked = false;
        }
        return meal;
      });
    }
    return meals;
  };

  // for favorite combos (eg. for favMeals 3 Meals)
  const comboFavMeals = (combos, usersFavMeals) => {
    if (usersFavMeals?.length > 0) {
      combos = combos.map((combo) => {
        combo.liked = true;
        // breakfast
        if (usersFavMeals.includes(combo.breakfast.mealinformation.id)) {
          combo.breakfast.liked = true;
        } else {
          combo.breakfast.liked = false;
        }
        // lunch
        if (usersFavMeals.includes(combo.lunch.mealinformation.id)) {
          combo.lunch.liked = true;
        } else {
          combo.lunch.liked = false;
        }
        // dinner
        if (usersFavMeals.includes(combo.dinner.mealinformation.id)) {
          combo.dinner.liked = true;
        } else {
          combo.dinner.liked = false;
        }
        return combo;
      });
    }

    return combos;
  };

  // for combos which are not necessary favorite combos (eg. for sharepage)
  const comboMeals = (combos, favCombos) => {
    combos.map((combo) => {
      if (favCombos.includes(combo.comboId)) {
        combo.liked = true;
      } else {
        combo.liked = false;
      }
    });
    return combos;
  };

  return { singleFavMeals, singleMeals, comboFavMeals, comboMeals };
};
