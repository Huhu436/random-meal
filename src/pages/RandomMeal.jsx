import { getAuth } from "firebase/auth";
import {
  collection,
  getDocs,
  limit,
  query,
  startAfter,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { useMealContext } from "../context/meals/MealContext";
import { getRandomDayMeal } from "../context/SpoonacularAction";
import SpoonacularContext from "../context/SpoonacularContext";
import { db } from "../firebase.config";
import { useUploadToFirestore } from "../firestoreHooks/useUploadToFirestore";
import { useBuyinglist } from "../hooks/useBuyinglist";
import useCleanUp from "../hooks/useCleanUp";
import { useGetMeals } from "../hooks/useGetMeals";
import { useLikeStatus } from "../hooks/useLikeStatus";
import HomeCards0T640 from "../utilities/HomeCards0T640";

const RandomMeal = () => {
  //* context
  const { meals, dispatchMeal, allMealIds } = useMealContext();
  const { user, buyinglist, dispatch, pagenation } =
    useContext(SpoonacularContext);

  //* states
  const [spoonResults, setspoonResults] = useState([77188, 580283, 596149]);

  //* import fct/hooks
  const { cleanUpMeals } = useCleanUp();
  const { handleBuyinglistCombo } = useBuyinglist();
  const { storeInDb } = useUploadToFirestore();
  const { singleMeals } = useLikeStatus();
  const { filterOutMeals, mealContextFormatter } = useGetMeals();

  //* destructuring
  //* variables
  const auth = getAuth();

  //* on you go
  // singleMeals is for checking if the meals are liked by the user
  const callbackClickedButton = async () => {
    const fetchResult = await getRandomDayMeal();
    const cleanedUpMeals = cleanUpMeals(fetchResult);
    const filteredOutMeals = filterOutMeals(meals, cleanedUpMeals);
    const internalMeals = auth
      ? singleMeals(filteredOutMeals, user.favMeals)
      : filteredOutMeals;
    const formattedMeals = mealContextFormatter(internalMeals);
    dispatchMeal({
      type: "UPDATE_MEALS",
      payload: { ...formattedMeals },
    });
    storeInDb(cleanedUpMeals, allMealIds);
    setspoonResults(getAllIds(cleanedUpMeals));
  };

  useEffect(() => {
    // navbar
    dispatch({ type: "UPDATE_NAVBARSTATUS", payload: true });
  }, []);

  // const testDrive = async () => {
  //   const results = await getTenMealsFromCollection();
  //   console.log(results);
  // };

  const [pagenationState, setPagenationState] = useState();
  const getTenMealsFromCollection = async () => {
    let meals = [];
    let nextMeals = [];

    // normal
    // const collectionRef = collection(db, "meals");
    // const q = query(collectionRef, limit(10));
    // const querySnapshot = await getDocs(q);

    // querySnapshot.forEach((doc) => {
    //   meals.push(doc.data());
    // });
    // console.log(meals);

    // // startafter stuff
    // const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

    // const next = query(
    //   collection(db, "meals"),
    //   startAfter(lastVisible),
    //   limit(12)
    // );

    // const nextQuerySnapshot = await getDocs(next);
    // nextQuerySnapshot.forEach((doc) => {
    //   nextMeals.push(doc.data());
    // });
    // console.log(nextMeals);

    if (pagenation.singleMealsStartAfter.lastVisible === 0) {
      const collectionRef = collection(db, "meals");
      const q = query(collectionRef, limit(10));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        meals.push(doc.data());
      });
      console.log(meals);

      // store in context
      pagenation.singleMealsStartAfter.querySnapshot = querySnapshot;
      pagenation.singleMealsStartAfter.lastVisible =
        querySnapshot.docs[querySnapshot.docs.length - 1];
    } else if (pagenation.singleMealsStartAfter.lastVisible !== 0) {
      const next = query(
        collection(db, "meals"),
        startAfter(pagenation.singleMealsStartAfter.lastVisible),
        limit(12)
      );

      const nextQuerySnapshot = await getDocs(next);
      nextQuerySnapshot.forEach((doc) => {
        nextMeals.push(doc.data());
      });
      console.log(nextMeals);

      // store in context
      pagenation.singleMealsStartAfter.querySnapshot = nextQuerySnapshot;
      pagenation.singleMealsStartAfter.lastVisible =
        nextQuerySnapshot.docs[nextQuerySnapshot.docs.length - 1];
    }

    // return meals;
  };

  const getAllIds = (meals) => {
    return meals.map((meal) => {
      return meal.mealinformation.id;
    });
  };

  const handleBuy = () => {
    const newBuyinglist = handleBuyinglistCombo({
      buyinglist,
      mealsInCombo: [
        meals[spoonResults[0]],
        meals[spoonResults[1]],
        meals[spoonResults[2]],
      ],
    });
    dispatch({ type: "UPDATE_BUYINGLIST", payload: newBuyinglist });
  };

  return (
    <div className="w-full h-screen bg-bgPrimaryCol flex justify-evenly ">
      {/* <Helmet>
        <title>Random Meal</title>
        <meta name="description" content="" />
      </Helmet> */}
      {/* <div
        onClick={() => getTenMealsFromCollection()}
        className="w-11 h-6 bg-slate-400 rounded-xl"
      >
        Click me
      </div> */}
      <HomeCards0T640
        meals={meals}
        data={spoonResults}
        callbackButton={callbackClickedButton}
        callbackBuy={handleBuy}
      />
    </div>
  );
};

export default RandomMeal;
