import React, { useContext, useState } from "react";
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import "./SignIn.styles.scss";
import { UserContext } from "../../contexts/user.context";

const defaultSignInFormFields = {
  email: "",
  password: "",
};

const SignIn = () => {
  const { setCurrentUser } = useContext(UserContext);
  const [signInFormFields, setSignInFormFields] = useState(
    defaultSignInFormFields
  );
  const { email, password } = signInFormFields;

  const logGoogleUser = async () => {
    // const { user } = await signInWithGooglePopup();
    await signInWithGooglePopup();

    // setCurrentUser(user);
    // Replaced by observer's pattern

    // createUserDocumentFromAuth(user);
    // moved into the user context
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSignInFormFields({ ...signInFormFields, [name]: value });
  };

  const handleSignInSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      // await createUserDocumentFromAuth(user, { displayName });
      setSignInFormFields(defaultFormFields);
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        alert("This email is not registered. Please sign up first.");
      }
      console.log(error);
    }
  };

  return (
    <div className="sign-in">
      <h2>Sign In With Google</h2>{" "}
      <button onClick={logGoogleUser}>Sign in with google</button>
      <hr />
      <h2>Sign In With Email & Password</h2>
      <form onSubmit={handleSignInSubmit}>
        <label htmlFor="sign-in-email">Email</label>
        <input
          id="sign-in-email"
          type="email"
          value={email}
          name="email"
          required
          onChange={handleChange}
        />

        <label htmlFor="sign-in-password">Password</label>
        <input
          type="password"
          name="password"
          id="sign-in-password"
          value={password}
          required
          onChange={handleChange}
        />

        <button className="sign-in-with-email-button" type="submit">
          Sign In With Email & Password
        </button>
      </form>
    </div>
  );
};

export default SignIn;
