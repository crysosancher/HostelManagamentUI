"use client";
import { useState } from "react";
import styles from "./SignIn.module.css";

export default function SignInComponent() {
  const [signInFormData, setSignInFormData] = useState({
    email: "",
    password: "",
  });
  const [signInErrors, setSignInErrors] = useState({});

  const handleSignInChange = (e) => {
    const { name, value } = e.target;
    setSignInFormData((prev) => ({ ...prev, [name]: value }));
    setSignInErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateSignIn = () => {
    const errors = {};
    if (!signInFormData.email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(signInFormData.email)) {
      errors.email = "Email address is invalid.";
    }
    if (!signInFormData.password) {
      errors.password = "Password is required.";
    }
    setSignInErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    if (validateSignIn()) {
      console.log("Signing in with", signInFormData);
    }
  };

  return (
    <main className={styles.authContainer}>
      <section className={styles.sidePanel}>
        <h1>Welcome Back!</h1>
        <p>Enter your personal details to use all site features.</p>
      </section>

      <section className={styles.formWrapper}>
        <form aria-label="Sign In" onSubmit={handleSignInSubmit}>
          <h1>Sign In</h1>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={signInFormData.email}
            onChange={handleSignInChange}
          />
          {signInErrors.email && (
            <p className={styles.error}>{signInErrors.email}</p>
          )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={signInFormData.password}
            onChange={handleSignInChange}
          />
          {signInErrors.password && (
            <p className={styles.error}>{signInErrors.password}</p>
          )}
          <span className={styles.forgotPassword}>Forgot Password?</span>
          <button type="submit" className={styles.submitButton}>
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
};
