import React from "react";
import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import "./SignUp.styles.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
    //The [] around name in setformfields({ ...formfields, [name]: value }); is a computed property name. It allows you to use a variable as a key in an object literal.
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { displayName });
      setFormFields(defaultFormFields);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("The email is already in use");
      }
      console.log(error);
    }
  };

  return (
    <div className="sign-up">
      <h2>Sign Up With Email and Password</h2>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <label htmlFor="displayName">First Name</label>
        <input
          id="displayName"
          type="text"
          name="displayName"
          value={displayName}
          required
          onChange={handleChange}
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          required
          onChange={handleChange}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={password}
          required
          onChange={handleChange}
        />

        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          id="confirm-password"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          required
          onChange={handleChange}
        />

        <button type="submit">SIGN UP</button>
      </form>
    </div>
  );
};

export default SignUp;
