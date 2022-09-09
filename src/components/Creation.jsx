import React from "react";
import {
  FaBars,
  FaChevronLeft,
  FaExclamationCircle,
  FaExclamationTriangle,
  FaSearch,
  FaShare,
  FaShoppingCart,
  FaTimes,
} from "react-icons/fa";
import DinnerImg from "../assets/images/dinnerExample.jpg";
import styles from "../styles";

const Creation = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen z-[100] bg-[#00000030]">
      <div className="relative w-full h-screen overflow-auto flex justify-center">
        {/* beginning of the actual modal */}
        <div
          className={`absolute top-[50px] 900:top-[120px] w-full 900:w-10/12 rounded-t-[30px] modalShadow flex flex-col py-10 bg-bgPrimaryCol px-10`}
        >
          {/* top back and leave */}
          <div className="w-full h-10 flex justify-between">
            {/* go back */}
            <div className={`w-11 h-11 rounded-full ${styles.flexCenter}`}>
              <FaChevronLeft size="30px" className="text-lightTextCol" />
            </div>
            {/* go leave */}
            <div className={`w-11 h-11 rounded-full ${styles.flexCenter}`}>
              <FaTimes size="30px" className="text-lightTextCol" />
            </div>
          </div>

          {/* top titel and search + filter */}
          <div className="w-full flex flex-col gap-2 py-4">
            {/* title */}
            <p className={`${styles.heading32} text-lightTextCol`}>
              Choose a Title for your new Combination
            </p>
            {/* search + filter */}
            <div className="w-full flex flex-col items-center gap-y-2">
              <div className="w-full 800:w-6/12 flex items-center flex-col gap-y-[8px] ">
                {/* Label */}
                <label className={`text-inputCol ${styles.paragraph14} hidden`}>
                  Search
                </label>
                <div className="w-full flex gap-x-[10px]">
                  <div className="text-inputCol w-full border-solid border-[1px] flex items-center rounded-xl px-[10px] gap-[8px] py-[12px]">
                    {/* icon */}
                    <div className={`w-[20px] h-[20px]  ${styles.flexCenter}`}>
                      <FaSearch className="text-inputCol" size="15px" />
                    </div>
                    {/* text */}
                    <input
                      type="text"
                      className={`bg-transparent w-full h-[20px] focus:outline-none text-lightTextCol ${styles.paragraph14} placeholder:text-inputCol`}
                      placeholder="Search For Combinations..."
                    />
                  </div>
                  <div
                    className={`w-[50px] h-[46px] border-[1px] rounded-xl ${styles.flexCenter} text-lightTextCol`}
                  >
                    <FaBars size="14px" />
                  </div>
                </div>
                <div
                  className={`text-inputCol ${styles.paragraph14} flex items-center gap-x-[8px] hidden`}
                >
                  <FaExclamationTriangle className="pb-[2px] text-failure hidden" />
                  <FaExclamationCircle className="pb-[2px] text-warning hidden" />
                  Please Enter The Correct Password
                </div>
              </div>
              {/* Filter */}
              <div className="flex flex-row w-6/12 gap-2">
                <p className={`text-lightTextCol ${styles.paragraph16} mr-1`}>
                  Filter:
                </p>
                <div
                  className={`px-4 py-1 w-fit tagLunch rounded-full ${styles.tag10}`}
                >
                  Lunch
                </div>
                <div
                  className={`px-4 py-1 w-fit tagDinner rounded-full ${styles.tag10}`}
                >
                  Dinner
                </div>
                <div
                  className={`px-4 py-1 w-fit tagBreakfast rounded-full ${styles.tag10}`}
                >
                  Vegetarian
                </div>
              </div>
            </div>
          </div>

          {/* meals */}
          <div className="w-full flex flex-row flex-grow flex-1 bg-black py-3"></div>

          <div
            className="relative w-full h-[385px] rounded-t-[30px] bg-center bg-cover"
            style={{ backgroundImage: `url(${DinnerImg})` }}
          >
            <div className={`w-full h-full imgOverlayMealdetails`}></div>
            {/* close icon */}
            <div className="absolute top-12 right-12 w-fit h-fit">
              <FaTimes
                size="30px"
                className="text-lightTextCol cursor-pointer"
              />
            </div>
          </div>

          {/* bottom information */}
          <div className="w-full modalGradient flex flex-col px-[30px] 900:px-10 pb-20 gap-y-8 900:gap-y-4">
            {/* titel and introduction */}
            <div className="w-full flex flex-col gap-y-2">
              <div className="flex flex-row items-center gap-x-2"></div>
              <p
                className={`${styles.heading32} text-lightTextCol flex flex-row gap-x-2 items-center w-fit cursor-pointer`}
              >
                Sed sodales convallis ut
                <FaShare size="25px" />
              </p>
              {/* servings */}
              <div>
                <p className={`${styles.paragraph20} text-lightTextCol`}>
                  Servings: 4
                </p>
                <p className={`${styles.paragraph20} text-lightTextCol`}>
                  Healthscore: 4
                </p>
              </div>
              {/* tags */}
              <div className="flex w-6/12 gap-x-3">
                <div
                  className={`px-4 py-1 w-fit tagLunch rounded-full ${styles.tag10}`}
                >
                  Lunch
                </div>
                <div
                  className={`px-4 py-1 w-fit tagDinner rounded-full ${styles.tag10}`}
                >
                  Dinner
                </div>
                <div
                  className={`px-4 py-1 w-fit tagBreakfast rounded-full ${styles.tag10}`}
                >
                  Vegetarian
                </div>
              </div>
              <p
                className={`${styles.paragraph16} text-lightTextCol 900:w-6/12`}
              >
                Est duis non, senectus metus. Facilisis nibh pellentesque eget
                eget felis blandit. Aliquam, sem pulvinar nisl duis augue
                volutpat. Vitae massa tellus sagittis eu aenean ultrices etiam
                at....
              </p>
            </div>
            {/* instructions + ingredients */}
            <div className="w-full flex flex-col-reverse gap-y-8 900:gap-x-10 900:py-4">
              {/* instructions */}
              <div className="w-full flex flex-col gap-y-2">
                <p className={`${styles.heading24} text-lightTextCol`}>
                  How its done
                </p>
                {/* Steps */}
                <div className="flex lg:grid grid-cols-2 flex-col gap-3">
                  <div className="w-full max-w-[540px] flex flex-col buyinglistMealShadow p-[24px] gap-y-4 rounded-xl">
                    {/* txt */}
                    <p className={`${styles.paragraph16} text-lightTextCol`}>
                      <span className={`text-[24px]`}>1.</span> Sit fringilla
                      suspendisse convallis eget fringilla euismod. Id arcu,
                      massa lacinia eget id. Augue velit id accumsan massa.
                    </p>
                    {/* Equipment and Ingredients */}
                    <div className="w-full flex flex-wrap gap-4">
                      {/* Equipment */}
                      <div className="flex flex-col gap-y-2 min-w-[168px]">
                        <p
                          className={`${styles.paragraph14} text-lightTextCol`}
                        >
                          Equipment
                        </p>
                        <div className="w-fit flex gap-x-2">
                          <div
                            className="relative w-20 h-20 rounded-full bg-center bg-cover bg-gray-400 overflow-hidden"
                            style={{ backgroundImage: `url(${DinnerImg})` }}
                          ></div>
                          <div
                            className="relative w-20 h-20 rounded-full bg-center bg-cover bg-gray-400 overflow-hidden"
                            style={{ backgroundImage: `url(${DinnerImg})` }}
                          ></div>
                          <div
                            className="relative w-20 h-20 rounded-full bg-center bg-cover bg-gray-400 overflow-hidden"
                            style={{ backgroundImage: `url(${DinnerImg})` }}
                          ></div>
                        </div>
                      </div>
                      {/* ingredients */}
                      <div className="flex flex-col gap-y-2">
                        <p
                          className={`${styles.paragraph14} text-lightTextCol`}
                        >
                          Ingredients
                        </p>
                        <div className="w-fit flex gap-x-2">
                          {/* mit hover */}
                          <div
                            className="w-20 h-20 rounded-full bg-center bg-cover bg-gray-400 overflow-hidden"
                            style={{ backgroundImage: `url(${DinnerImg})` }}
                          >
                            <div
                              className={`w-full h-full rounded-full bg-[#28293380] opacity-0 hover:opacity-100 cursor-pointer ${styles.flexCenter}`}
                            >
                              <FaShoppingCart
                                size="30%"
                                className="text-lightTextCol"
                              />
                            </div>
                          </div>
                          <div
                            className="relative w-20 h-20 rounded-full bg-center bg-cover bg-gray-400 overflow-hidden"
                            style={{ backgroundImage: `url(${DinnerImg})` }}
                          >
                            <div
                              className={`w-full h-full rounded-full bg-[#28293380] opacity-0 hover:opacity-100 cursor-pointer ${styles.flexCenter}`}
                            >
                              <FaShoppingCart
                                size="30%"
                                className="text-lightTextCol"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step2 */}
                  <div className="w-full max-w-[540px] flex flex-col buyinglistMealShadow p-[24px] gap-y-4 rounded-xl">
                    {/* txt */}
                    <p className={`${styles.paragraph16} text-lightTextCol`}>
                      <span className={`text-[24px]`}>2.</span>Nec mauris eu,
                      consectetur hac tellus sagittis feugiat nunc nibh.
                    </p>
                    {/* Equipment and Ingredients */}
                    <div className="w-full flex flex-wrap gap-4">
                      {/* Equipment */}
                      <div className="flex flex-col gap-y-2 min-w-[168px]">
                        <p
                          className={`${styles.paragraph14} text-lightTextCol`}
                        >
                          Equipment
                        </p>
                        <div className="w-fit flex gap-x-2">
                          <div
                            className="relative w-20 h-20 rounded-full bg-center bg-cover bg-gray-400 overflow-hidden"
                            style={{ backgroundImage: `url(${DinnerImg})` }}
                          ></div>
                          <div
                            className="relative w-20 h-20 rounded-full bg-center bg-cover bg-gray-400 overflow-hidden"
                            style={{ backgroundImage: `url(${DinnerImg})` }}
                          ></div>
                          <div
                            className="relative w-20 h-20 rounded-full bg-center bg-cover bg-gray-400 overflow-hidden"
                            style={{ backgroundImage: `url(${DinnerImg})` }}
                          ></div>
                        </div>
                      </div>
                      {/* ingredients */}
                      <div className="flex flex-col gap-y-2">
                        <p
                          className={`${styles.paragraph14} text-lightTextCol`}
                        >
                          Ingredients
                        </p>
                        <div className="w-fit flex gap-x-2">
                          {/* mit hover */}
                          <div
                            className="w-20 h-20 rounded-full bg-center bg-cover bg-gray-400 overflow-hidden"
                            style={{ backgroundImage: `url(${DinnerImg})` }}
                          >
                            <div
                              className={`w-full h-full rounded-full bg-[#28293380] opacity-0 hover:opacity-100 cursor-pointer ${styles.flexCenter}`}
                            >
                              <FaShoppingCart
                                size="30%"
                                className="text-lightTextCol"
                              />
                            </div>
                          </div>
                          <div
                            className="relative w-20 h-20 rounded-full bg-center bg-cover bg-gray-400 overflow-hidden"
                            style={{ backgroundImage: `url(${DinnerImg})` }}
                          >
                            <div
                              className={`w-full h-full rounded-full bg-[#28293380] opacity-0 hover:opacity-100 cursor-pointer ${styles.flexCenter}`}
                            >
                              <FaShoppingCart
                                size="30%"
                                className="text-lightTextCol"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ingredients */}
              <div className="w-full flex flex-col gap-y-2">
                <p className={`${styles.heading24} text-lightTextCol`}>
                  Ingredients
                </p>
                {/* ingredients pics */}
                <div className="max-w-[540px] w-full flex flex-wrap gap-2">
                  <div className="flex flex-col max-w-20 items-center gap-1">
                    <div
                      className="w-20 h-20 rounded-full bg-center bg-cover bg-gray-400 overflow-hidden"
                      style={{ backgroundImage: `url(${DinnerImg})` }}
                    >
                      <div
                        className={`w-full h-full rounded-full bg-[#28293380] opacity-0 hover:opacity-100 cursor-pointer ${styles.flexCenter}`}
                      >
                        <FaShoppingCart
                          size="30%"
                          className="text-lightTextCol"
                        />
                      </div>
                    </div>
                    <p
                      className={`${styles.paragraph14} text-lightTextCol w-20 text-center`}
                    >
                      Lachs
                    </p>
                  </div>

                  <div className="flex flex-col max-w-20 items-center gap-1">
                    <div
                      className="w-20 h-20 rounded-full bg-center bg-cover bg-gray-400 overflow-hidden"
                      style={{ backgroundImage: `url(${DinnerImg})` }}
                    >
                      <div
                        className={`w-full h-full rounded-full bg-[#28293380] opacity-0 hover:opacity-100 cursor-pointer ${styles.flexCenter}`}
                      >
                        <FaShoppingCart
                          size="30%"
                          className="text-lightTextCol"
                        />
                      </div>
                    </div>
                    <p
                      className={`${styles.paragraph14} text-lightTextCol w-20 text-center`}
                    >
                      Lachs
                    </p>
                  </div>

                  <div className="flex flex-col max-w-20 items-center gap-1">
                    <div
                      className="w-20 h-20 rounded-full bg-center bg-cover bg-gray-400 overflow-hidden"
                      style={{ backgroundImage: `url(${DinnerImg})` }}
                    >
                      <div
                        className={`w-full h-full rounded-full bg-[#28293380] opacity-0 hover:opacity-100 cursor-pointer ${styles.flexCenter}`}
                      >
                        <FaShoppingCart
                          size="30%"
                          className="text-lightTextCol"
                        />
                      </div>
                    </div>
                    <p
                      className={`${styles.paragraph14} text-lightTextCol w-20 text-center`}
                    >
                      Lachs
                    </p>
                  </div>

                  <div className="flex flex-col max-w-20 items-center gap-1">
                    <div
                      className="w-20 h-20 rounded-full bg-center bg-cover bg-gray-400 overflow-hidden"
                      style={{ backgroundImage: `url(${DinnerImg})` }}
                    >
                      <div
                        className={`w-full h-full rounded-full bg-[#28293380] opacity-0 hover:opacity-100 cursor-pointer ${styles.flexCenter}`}
                      >
                        <FaShoppingCart
                          size="30%"
                          className="text-lightTextCol"
                        />
                      </div>
                    </div>
                    <p
                      className={`${styles.paragraph14} text-lightTextCol w-20 text-center`}
                    >
                      Lachs
                    </p>
                  </div>

                  <div className="flex flex-col max-w-20 items-center gap-1">
                    <div
                      className="w-20 h-20 rounded-full bg-center bg-cover bg-gray-400 overflow-hidden"
                      style={{ backgroundImage: `url(${DinnerImg})` }}
                    >
                      <div
                        className={`w-full h-full rounded-full bg-[#28293380] opacity-0 hover:opacity-100 cursor-pointer ${styles.flexCenter}`}
                      >
                        <FaShoppingCart
                          size="30%"
                          className="text-lightTextCol"
                        />
                      </div>
                    </div>
                    <p
                      className={`${styles.paragraph14} text-lightTextCol w-20 text-center`}
                    >
                      Lachs
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Creation;
