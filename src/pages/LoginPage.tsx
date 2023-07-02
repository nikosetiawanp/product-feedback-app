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

  const getAccessToken = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailInput,
      password: passwordInput,
    });
    if (error) return error;
    localStorage.setItem("accessToken", data.session.access_token);
  };

  const getProfileData = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("profile")
      .select(`*, upvotes (product_request_id)`)
      .eq("email", emailInput);
    if (error) return error;
    console.log(data[0]);
    localStorage.setItem("username", data[0].username);
    localStorage.setItem("name", data[0].name);
    localStorage.setItem("image", data[0].image);
    localStorage.setItem("email", data[0].email);
    localStorage.setItem(
      "upvotes",
      data[0].upvotes.map((obj: string) => Object.values(obj))
    );
  };

  const handleFormSubmit = async (e: React.ChangeEvent<any>) => {
    localStorage.clear();
    await getAccessToken(e);
    await getProfileData(e);
    alert("Login successful, redirecting soon...");
    window.location.href = "./suggestions";
  };

  return (
    <div className="login-register-page">
      <form className="login-register-container" onSubmit={handleFormSubmit}>
        {/* <h1>Login</h1> */}
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
        <button>Login</button>
        <span>
          Don't have an account? <a href="./register">Register</a>
        </span>
      </form>
    </div>
  );
}
