import { supabase } from "../client";
import { useState, useCallback } from "react";

export default function RegisterPage() {
  const [emailInput, setEmailInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const handleFormSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email: emailInput,
      password: passwordInput,
    });
    const { data: profileData, error: profileError } = await supabase
      .from("profile")
      .insert([
        {
          email: emailInput,
          image: null,
          name: nameInput,
          username: usernameInput,
        },
      ]);
    if (error || profileError) {
      console.log(error, profileError);
      return;
    }
    console.log(data, profileData);
    alert("Register Successful! Redirecting soon...");
    window.location.href = "./login";
  };

  const handleEmailInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmailInput(event.target.value);
    },
    []
  );
  const handleNameInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setNameInput(event.target.value);
    },
    []
  );
  const handleUsernameInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setUsernameInput(event.target.value);
    },
    []
  );

  const handlePasswordInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordInput(event.target.value);
    },
    []
  );

  return (
    <div className="login-register-page">
      <form className="login-register-container" onSubmit={handleFormSubmit}>
        <h1>Register</h1>
        {/* EMAIL */}
        <label htmlFor="email">Email</label>
        <p>Please enter your email</p>
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleEmailInputChange}
        />
        {/* NAME */}
        <label htmlFor="name">Name</label>
        <p>Please enter your full name</p>
        <input
          type="text"
          id="name"
          name="name"
          onChange={handleNameInputChange}
        />
        {/* USERNAME */}
        <label htmlFor="username">Username</label>
        <p>Please enter your username</p>
        <input
          type="text"
          id="username"
          name="username"
          onChange={handleUsernameInputChange}
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
        <button onClick={handleFormSubmit}>Register</button>
        <span>
          Already have an account? <a href="./login">Login</a>
        </span>
      </form>
    </div>
  );
}
