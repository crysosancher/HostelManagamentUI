"use client";
import { useState, useEffect, useCallback } from "react"; 
import Link from "next/link"; 
import { useRouter } from "next/navigation"; 
import { Bounce, ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

import styles from "./SignIn.module.css";

export default function SignInComponent() {
  const router = useRouter();
  const [signInFormData, setSignInFormData] = useState({
    username: "",
    password: "",
    rememberme: false, // Add remember me field to the form data
  });

  const showToast = useCallback((message) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark", 
      transition: Bounce, 
    });
  }, []);

  const handleSignInChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignInFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value, // Handle checkbox separately
    }));
  };

  useEffect(() => {
    const token = localStorage.getItem(`UserAccessToken`) || sessionStorage.getItem(`UserAccessToken`);
    if (token) {
      router.push(`/admin/dashboard/overview`);
    }
  }, [router]);

  const handleSignInSubmit = useCallback(async (event) => {
    event.preventDefault(); 

    if (!signInFormData.username || !signInFormData.password) {
      showToast("Please fill in all fields.");
      return;
    }

    localStorage.setItem(`remember-me`, signInFormData.rememberme);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signInFormData),
      });

      if (response.ok) {
        const data = await response.json();
        const storage = signInFormData.rememberme ? localStorage : sessionStorage;
        storage.setItem("UserAccessToken", data.token);
        router.push(`/admin/dashboard/overview`);
      } else {
        const errorMessages = {
          404: "User doesn't exist",
          401: "Wrong credentials!",
        };
        showToast(errorMessages[response.status] || "Something went wrong! Please try again later.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      showToast("Something went wrong! Please try again later.");
    }
  }, [signInFormData, router, showToast]);

  return (
    <main className={styles.authContainer}>
      <ToastContainer />
      <section className={styles.sidePanel}>
        <h1>Welcome Back!</h1>
        <p>Enter your personal details to use all site features.</p>
      </section>

      <section className={styles.formWrapper}>
        <form aria-label="Sign In" onSubmit={handleSignInSubmit}>
          <h1>Sign In</h1>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={signInFormData.username}
            onChange={handleSignInChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={signInFormData.password}
            onChange={handleSignInChange}
          />

          <div className={styles.rememberMeWrapper}>
            <label>
              <input
                type="checkbox"
                name="rememberme"
                checked={signInFormData.rememberme}
                onChange={handleSignInChange}
              />
              Remember Me
            </label>
          </div>

          <span className={styles.forgotPassword}>Forgot Password?</span>
          <button type="submit" className={styles.submitButton}>
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
}
