import { motion } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FaCheck, FaChevronLeft, FaTimes } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Catalog from "../components/Catalog";
import Input from "../components/Input";
import SearchFilter from "../components/SearchFilter";
import SpoonacularContext from "../context/SpoonacularContext";
import { useGetMeals } from "../hooks/useGetMeals";
import useWindowDimensions from "../hooks/useWindowDimensions";
import styles from "../styles";
import CardThreeContainer from "../utilities/cards/CardThreeContainer";

const Creation = () => {
  const { creation, dispatch } = useContext(SpoonacularContext);
  const { width } = useWindowDimensions();
  const [currentIteration, setCurrentIteration] = useState("mealTitle");
  const [direction] = useState([
    "mealTitle",
    "breakfast",
    "lunch",
    "dinner",
    "preview",
  ]);
  const navigate = useNavigate();
  const params = useParams();
  const [formData, setFormData] = useState({
    title: {
      id: "title",
      displayName: "",
      placeholder: "Early Autumn Sunday",
      type: "text",
      inputValue: "",
      active: false,
      state: "default",
      validation: "maxWords",
      overallValidation: "userInformation",
      errorMessage: "Keep it under 20 Characters",
      icon: "fa-solid fa-bowl-food",
    },
    userInformation: false,
  });
  const { title, userInformation } = formData;
  const handleCallBack = (cb) => setFormData(cb);

  // set currentIteration or redirect to notFound
  useEffect(() => {
    if (direction.includes(params.stepName)) {
      setCurrentIteration(params.stepName);
    } else {
      navigate("/notFound");
    }
  }, [params.stepName, direction, navigate]);

  // only for mealTitle
  const handleAdd = () => {
    if (userInformation) {
      let creationCopy = { ...creation }
      creationCopy.mealTitle.text = title.inputValue
      dispatch({ type: "UPDATE_CREATION", payload: creationCopy });
      const stepForward = direction[direction.indexOf(currentIteration) + 1]
      navigate(`/creation/${stepForward}`);
    }
  }

  // for breakfast, lunch and dinner
    const { user, meals, combos, } = useContext(SpoonacularContext);
    const { handleGetMealsCombos } = useGetMeals();
    const [filteredMeals, setFilteredMeals] = useState([]);
    const [internalMeals, setInternalMeals] = useState([]);
    const [twoChoice] = useState("first");

    // context
    useEffect(() => {
      const updateContext = async () => {
        const { formattedCollectedMeals, formattedCombos } =
          await handleGetMealsCombos(
            meals,
            combos,
            user.favMeals,
            user.favCombos,
            "collection"
          );
        dispatch({
          type: "UPDATE_MEALS_AND_COMBOS",
          payload: {
            meals: formattedCollectedMeals,
            combos: formattedCombos,
          },
        });
      };

      updateContext();
    }, []);

    // set/updatefavorite Meals (internal)
    useEffect(() => {
      let internalMealsMeals = [];
      Object.keys(meals).map((mealId) => {
        internalMealsMeals.push({ ...meals[mealId] });
      });
      setInternalMeals(internalMealsMeals);
    }, [user.favMeals, meals]);

    const handleCallbackFilteredMeals = (newlyFiltered) => {
      setFilteredMeals(newlyFiltered);
    };
    const handleCallbackFilteredCombos = () => {};

  return (
    <div className="fixed top-0 left-0 w-full h-screen z-[100] bg-bgPrimaryCol">
      <Helmet>
        <title>Creation</title>
        <meta name="description" content="" />
      </Helmet>
      <div className="relative w-full h-screen overflow-auto flex justify-center ">
        {/* beginning of the actual modal */}
        <div
          className={`absolute top-[6%] 900:top-[13%] w-full min-h-[94%] 900:min-h-[87%] 900:w-10/12 rounded-t-[30px] modalShadow flex flex-col py-10 bg-bgPrimaryCol px-6 sm:px-10`}
        >
          {/* top back and leave */}
          <div className="w-full h-10 flex justify-between">
            {/* go back */}
            <div className={`w-11 h-11 rounded-full ${styles.flexCenter}`}>
              <FaChevronLeft size="30px" className="text-lightTextCol" />
            </div>
            {/* go leave */}
            <div
              onClick={() => navigate(-1)}
              className={`w-11 h-11 rounded-full ${styles.flexCenter} cursor-pointer`}
            >
              <FaTimes size="30px" className="text-lightTextCol" />
            </div>
          </div>

          {/* top titel and search + filter */}
          <div className="w-full flex flex-col gap-4 py-4">
            {/* title */}
            <p className={`${styles.heading24} text-lightTextCol`}>
              {creation[currentIteration].title}
            </p>
            <p className={`${styles.heading20} text-lightTextCol`}>
              {creation[currentIteration].subTitle}
            </p>
          </div>

          {/* meals */}
          <div className={`w-full flex flex-row flex-1 pb-3 `}>
            <div className="gap-2 flex flex-wrap w-full 600:gap-6 h-fit py-6 justify-center max-w-[1350px]">
              {currentIteration === "mealTitle" ? (
                <div className="w-[420px] flex gap-x-4">
                  <Input
                    callbackFct={handleCallBack}
                    formData={formData}
                    stateArray={[title.state]}
                    condition={"all"}
                    validation={title.validation}
                    specificInputObject={title}
                    label={false}
                  />
                  <motion.button
                    whileHover={
                      userInformation ? { scale: 1.02 } : { scale: 1 }
                    }
                    whileTap={userInformation ? { scale: 0.98 } : { scale: 1 }}
                    type="button"
                    onClick={handleAdd}
                    className={`min-w-[50px] min-h-[46px] max-h-[46px] rounded-xl ${
                      styles.flexCenter
                    } text-lightTextCol ${
                      userInformation
                        ? "btnPrimaryCol cursor-pointer"
                        : "cursor-default border-[1px]"
                    }`}
                  >
                    <i className="fa-solid fa-chevron-right text-[15px] text-inputCol"></i>
                  </motion.button>
                </div>
              ) : (
                <>
                  {currentIteration === "preview" ? (
                    <CardThreeContainer />
                  ) : (
                    <>
                      <SearchFilter
                        callbackFilteredMeals={handleCallbackFilteredMeals}
                        callbackFilteredCombos={handleCallbackFilteredCombos}
                        meals={internalMeals}
                        combos={[]}
                        twoChoice={twoChoice}
                        // reversed because combos are first and then meals
                        first="first"
                        second="first"
                      />
                      <Catalog filteredMeals={filteredMeals} />
                    </>
                  )}
                </>
              )}
            </div>
            {/* check btn */}
            <div
              className={`${
                currentIteration === "preview" ? "flex" : "hidden"
              } fixed top-[88%]
              } left-[74%] 600:left-[84%] btnPrimaryCol buttonShadow hover:bg-[#293D2B] w-14 h-14 600:w-20 600:h-20 z-30 rounded-full ${
                styles.flexCenter
              }`}
            >
              <FaCheck
                size={width > 600 ? "25px" : "20px"}
                className="text-lightTextCol"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Creation;
