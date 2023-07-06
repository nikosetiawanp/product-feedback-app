import { supabase } from "../client";
import { useState, useCallback } from "react";
import SpinnerLight from "../assets/shared/spinner-light.svg";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);

  const [emailInput, setEmailInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [profileImageInput, setProfileImageInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const [emailInputIsEmpty, setEmailInputIsEmpty] = useState(false);
  const [nameInputIsEmpty, setNameInputIsEmpty] = useState(false);
  const [usernameInputIsEmpty, setUsernameInputIsEmpty] = useState(false);
  const [profileImageInputIsEmpty, setProfileImageInputIsEmpty] =
    useState(false);
  const [passwordInputIsEmpty, setPasswordInputIsEmpty] = useState(false);
  const [credentialIsWrong, setCredentialIsWrong] = useState(false);

  const handleFormSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!emailInput) setEmailInputIsEmpty(true);
    if (emailInput) setEmailInputIsEmpty(false);

    if (!nameInput) setNameInputIsEmpty(true);
    if (nameInput) setNameInputIsEmpty(false);

    if (!usernameInput) setUsernameInputIsEmpty(true);
    if (usernameInput) setUsernameInputIsEmpty(false);

    if (!profileImageInput) setProfileImageInputIsEmpty(true);
    if (profileImageInput) setProfileImageInputIsEmpty(false);

    if (!passwordInput) setPasswordInputIsEmpty(true);
    if (passwordInput) setPasswordInputIsEmpty(false);

    if (
      !emailInput ||
      !nameInput ||
      !usernameInput ||
      !profileImageInput ||
      !passwordInput
    ) {
      setIsLoading(false);
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: emailInput,
      password: passwordInput,
    });
    const { data: profileData, error: profileError } = await supabase
      .from("profile")
      .insert([
        {
          email: emailInput,
          image: profileImageInput,
          name: nameInput,
          username: usernameInput,
        },
      ]);
    if (error || (profileError && profileError.code == "23505")) {
      setCredentialIsWrong(true);
      setIsLoading(false);
      return;
    }

    console.log(data, profileData);
    setIsLoading(false);
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

  const handleProfileImageInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setProfileImageInput(event.target.value);
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
    <div className="register-page">
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
          className={!emailInputIsEmpty && !credentialIsWrong ? "" : "error"}
        />
        {emailInputIsEmpty && <p className="empty-message">Can't be empty</p>}

        {/* NAME */}
        <label htmlFor="name">Name</label>
        <p>Please enter your full name</p>
        <input
          type="text"
          id="name"
          name="name"
          onChange={handleNameInputChange}
          className={!nameInputIsEmpty ? "" : "error"}
        />
        {nameInputIsEmpty && <p className="empty-message">Can't be empty</p>}

        {/* USERNAME */}
        <label htmlFor="username">Username</label>
        <p>Please enter your username</p>
        <input
          type="text"
          id="username"
          name="username"
          onChange={handleUsernameInputChange}
          className={!usernameInputIsEmpty && !credentialIsWrong ? "" : "error"}
        />
        {usernameInputIsEmpty && (
          <p className="empty-message">Can't be empty</p>
        )}

        {/* PROFILE IMAGE */}
        <label htmlFor="profile-image">Profile Image</label>
        <p>Please enter profile image URL</p>
        <input
          type="text"
          id="profile-image"
          name="profile-image"
          onChange={handleProfileImageInputChange}
          className={
            !profileImageInputIsEmpty && !credentialIsWrong ? "" : "error"
          }
        />
        {profileImageInputIsEmpty && (
          <p className="empty-message">Can't be empty</p>
        )}

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
        <button onClick={handleFormSubmit}>
          {!isLoading ? "Register" : <img src={SpinnerLight} alt="spinner" />}
        </button>
        {credentialIsWrong && (
          <p className="wrong-credential">
            Email {emailInput} / Username {usernameInput} already exist.
          </p>
        )}
        <span>
          Already have an account? <a href="./login">Login</a>
        </span>
      </form>
    </div>
  );
}
