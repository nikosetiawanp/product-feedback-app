import { supabase } from "../client";
import { useState, useCallback } from "react";

export default function LoginPage() {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const handleEmailInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmailInput(event.target.value);
    },
    []
  );
  const handlePasswordInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordInput(event.target.value);
    },
    []
  );

  const handleFormSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    // SAVE DATA TO AUTH

    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailInput,
      password: passwordInput,
    });
    if (!error) {
      localStorage.setItem("access_token", data.session.access_token);
      localStorage.setItem("user_id", data.user.id);
      alert("Login successful! Redirecting soon...");
      window.location.href = "./suggestions";
    } else console.log(error);
  };

  return (
    <div className="login-register-page">
      <form className="login-register-container" onSubmit={handleFormSubmit}>
        <h1>Login</h1>
        {/* EMAIL */}
        <label htmlFor="email">Email</label>
        <p>Please enter your email</p>
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleEmailInputChange}
        />
        {/* PASSWORD */}
        <label htmlFor="password">Password</label>
        <p>Please enter your password</p>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handlePasswordInputChange}
        />
        {/* BUTTONS */}
        <button onClick={handleFormSubmit}>Login</button>
        <span>
          Don't have an account? <a href="./register">Register</a>
        </span>
      </form>
    </div>
  );
}
