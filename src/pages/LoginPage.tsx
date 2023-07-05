import { supabase } from "../client";
import { useState, useCallback } from "react";
import SpinnerLight from "../assets/shared/spinner-light.svg";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const [emailInputIsEmpty, setEmailInputIsEmpty] = useState(false);
  const [passwordInputIsEmpty, setPasswordInputIsEmpty] = useState(false);

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
    console.log(data);
    if (data.user === null || data.session === null) {
      setIsLoading(false);
      return;
    }
    if (error) return error;
    localStorage.setItem("accessToken", data.session.access_token);
  };

  const getProfileData = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("profile")
      .select(`*, upvotes (product_request_id)`)
      .eq("email", emailInput);
    if (error) {
      return error;
    }
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
    e.preventDefault();
    setIsLoading(true);
    localStorage.clear();

    if (!emailInput) setEmailInputIsEmpty(true);
    if (emailInput) setEmailInputIsEmpty(false);

    if (!passwordInput) setPasswordInputIsEmpty(true);
    if (passwordInput) setPasswordInputIsEmpty(false);

    if (!emailInput || !passwordInput) {
      setIsLoading(false);
      return;
    }

    await getAccessToken(e);
    await getProfileData(e);
    // window.location.href = "./suggestions";
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
          className={!emailInputIsEmpty ? "" : "error"}
        />
        {emailInputIsEmpty && <p className="empty-message">Can't be empty</p>}

        {/* PASSWORD */}
        <label htmlFor="password">Password</label>
        <p>Please enter your password</p>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handlePasswordInputChange}
          className={!passwordInputIsEmpty ? "" : "error"}
        />
        {passwordInputIsEmpty && (
          <p className="empty-message">Can't be empty</p>
        )}
        {/* BUTTONS */}
        <button>
          {!isLoading ? "Login" : <img src={SpinnerLight} alt="spinner" />}
        </button>
        <span>
          Don't have an account? <a href="./register">Register</a>
        </span>
      </form>
    </div>
  );
}
