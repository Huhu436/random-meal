import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { db } from "../firebase.config";
import useHandleGoogleSubmit from "../hooks/useHandleGoogleSubmit";
import useValidation from "../hooks/useValidation";
import styles from "../styles";

const SignButtons = ({ formData, stateArray }) => {
  const { distributor } = useValidation();
  const navigate = useNavigate();
  const location = useLocation();
  const [text] = useState({
    signUp: {
      btn: "Sign Up",
      googleBtn: "Sign Up with Google",
      littleText1: "Already have an Account?",
      littleText2: "Sign In instead!",
      redirect: "/sign-in",
    },
    signIn: {
      btn: "Sign In",
      googleBtn: "Sign In with Google",
      littleText1: "Don't have a Account?",
      littleText2: "Sign Up instead!",
      redirect: "/sign-up",
    },
    forgotPassword: {
      btn: "Send E-Mail",
      googleBtn: "Sign In with Google",
      littleText1: "Don't have a Account?",
      littleText2: "Sign Up instead!",
      redirect: "/sign-up",
    },
  });
  const { handleGoogle } = useHandleGoogleSubmit();
  const { username, email, password, userInformation } = formData;

  const handleSubmit = async () => {
    console.log(
      distributor({
        validation: "userInformation",
        values: stateArray,
        condition: "all",
      })
    );
    console.log(stateArray);
    if (
      distributor({
        validation: "userInformation",
        values: stateArray,
        condition: "all",
      })
    ) {
      const auth = getAuth();
      if (location.pathname === "/sign-up") {
        handleSignUp(auth);
      }
      if (location.pathname === "/sign-in") {
        handleSignIn(auth);
      }
      if (location.pathname === "/forgot-password") {
        handleForgotPassword(auth);
      }
      navigate("/");
    } else {
      console.log("not ready");
    }
  };

  const handleSignIn = (auth) => {
    signInWithEmailAndPassword(auth, email.inputValue, password.inputValue)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error);
      });
  };

  const handleSignUp = async (auth) => {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email.inputValue,
      password.inputValue
    );

    const user = userCredentials.user;

    updateProfile(auth.currentUser, {
      displayName: username.inputValue,
    });

    const formDataCopy = {
      username: username.inputValue,
      email: email.inputValue,
      fullName: "",
      bio: "",
      pinterest: "",
      twitter: "",
      instagram: "",
      photoUrl: "",
      buyinglist: [],
      favMeals: [],
      favCombos: [],
      favoriteMeals: [],
      favoriteCombos: [],
      timestamp: serverTimestamp(),
    };

    await setDoc(doc(db, "users", user.uid), formDataCopy);
  };

  const handleForgotPassword = (auth) => {
    sendPasswordResetEmail(auth, email.inputValue)
      .then(() => {
        // Todo: toast email was send
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  return (
    <div className="flex flex-col gap-y-[10px] py-[10px]">
      <div
        className={`${
          styles.flexCenter
        } w-full rounded-xl py-[10px] text-[14px] font-semibold text-lightTextCol ${
          userInformation
            ? "btnPrimaryCol buttonShadow cursor-pointer hover:bg-[#293D2B]"
            : "cursor-default border-[1px] border-solid bg-transparent"
        } `}
        onClick={handleSubmit}
      >
        {location.pathname === "/sign-in"
          ? text.signIn.btn
          : location.pathname === "/sign-up"
          ? text.signUp.btn
          : text.forgotPassword.btn}
      </div>
      {/* Google */}
      <div
        onClick={() => handleGoogle()}
        className={`${styles.flexCenter} w-full cursor-pointer gap-x-1 rounded-xl border-[1px] border-solid py-[10px] text-[14px] font-semibold text-lightTextCol`}
      >
        <div className={`${styles.flexCenter} h-5 w-5 pb-[2px]`}>
          <FaGoogle size="15px" />
        </div>
        {location.pathname === "/sign-in"
          ? text.signIn.googleBtn
          : location.pathname === "/sign-up"
          ? text.signUp.googleBtn
          : text.forgotPassword.googleBtn}
      </div>
      <Link
        to={
          location.pathname === "/sign-in"
            ? text.signIn.redirect
            : location.pathname === "/sign-up"
            ? text.signUp.redirect
            : text.forgotPassword.redirect
        }
        className="flex gap-x-1 text-inputCol"
      >
        <p className={`${styles.paragraph12}`}>
          {location.pathname === "/sign-in"
            ? text.signIn.littleText1
            : location.pathname === "/sign-up"
            ? text.signUp.littleText1
            : text.forgotPassword.littleText1}
        </p>
        <p className={`${styles.paragraph12} underline underline-offset-1`}>
          {location.pathname === "/sign-in"
            ? text.signIn.littleText2
            : location.pathname === "/sign-up"
            ? text.signUp.littleText2
            : text.forgotPassword.littleText2}
        </p>
      </Link>
    </div>
  );
};

export default SignButtons;
