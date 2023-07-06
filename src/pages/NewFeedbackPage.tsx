import { useState, useCallback } from "react";
import { supabase } from "../client";
import SpinnerLight from "../assets/shared/spinner-light.svg";

import IconArrowDown from "../assets/shared/icon-arrow-down.svg";
import IconArrowUp from "../assets/shared/icon-arrow-up.svg";
import IconNewFeedback from "../assets/shared/icon-new-feedback.svg";

import CategoryDropdown from "../components/CategoryDropdown";
import ButtonGoBack from "../components/ButtonGoBack";

export default function NewFeedbackPage() {
  const profileUsername = localStorage.getItem("username");
  const [buttonStatus, setButtonStatus] = useState("idle");
  const [categoryDropdownIsActive, setCategoryDropdownIsActive] =
    useState(false);
  const [titleInput, setTitleInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("Feature");
  const [feedbackDetailInput, setFeedbackDetailInput] = useState("");

  const [titleInputIsEmpty, setTitleInputIsEmpty] = useState(false);
  const [feedbackDetailInputIsEmpty, setFeedbackDetailInputIsEmpty] =
    useState(false);

  const handleTitleInputChange = useCallback(
    (event: React.ChangeEvent<any>) => {
      setTitleInput(event.target.value);
    },
    []
  );
  const handleFeedbackDetailInputChange = useCallback(
    (event: React.ChangeEvent<any>) => {
      setFeedbackDetailInput(event.target.value);
    },
    []
  );
  const toggleCategoryDropdown = () => {
    return setCategoryDropdownIsActive(!categoryDropdownIsActive);
  };

  const handleFormSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setButtonStatus("loading");
    if (titleInput.trim() === "") setTitleInputIsEmpty(true);
    if (titleInput.trim() !== "") setTitleInputIsEmpty(false);
    if (feedbackDetailInput.trim() === "") setFeedbackDetailInputIsEmpty(true);
    if (feedbackDetailInput.trim() !== "") setFeedbackDetailInputIsEmpty(false);
    if (titleInput.trim() === "" || feedbackDetailInput.trim() === "") {
      setButtonStatus("idle");
      return;
    }
    const { data, error } = await supabase.from("product_requests").insert([
      {
        title: `${titleInput}`,
        category: `${categoryInput}`,
        status: "Suggestion",
        description: `${feedbackDetailInput}`,
        created_by: profileUsername,
      },
    ]);
    if (!error) {
      console.log(data);
      setButtonStatus("done");
    } else console.log(error);
  };

  return (
    <section className="new-feedback-page">
      <ButtonGoBack />
      <form
        className="feedback-form"
        action="submit"
        onSubmit={handleFormSubmit}
      >
        <img
          className="icon-new-feedback"
          src={IconNewFeedback}
          alt="icon-new-feedback"
        />
        <h1>Create New Feedback</h1>
        {/* title input */}
        <h2>Feedback Title</h2>
        <p>Add a short, descriptive headline</p>
        <input
          type="text"
          className={!titleInputIsEmpty ? "title-input" : "title-input-error"}
          onChange={handleTitleInputChange}
        />
        {titleInputIsEmpty && <p className="empty-message">Can't be empty</p>}
        {/* category input */}
        <h2>Category</h2>
        <p>Choose a category for your feedback</p>
        <div className="category-input-container">
          <button
            type="button"
            className="category-input"
            onClick={toggleCategoryDropdown}
          >
            {categoryInput}
            <img
              src={!categoryDropdownIsActive ? IconArrowDown : IconArrowUp}
              alt="icon-arrow-down"
            />
          </button>
          {categoryDropdownIsActive && (
            <CategoryDropdown
              categoryInput={categoryInput}
              setCategoryInput={setCategoryInput}
              categoryDropdownIsActive={categoryDropdownIsActive}
              setCategoryDropdownIsActive={setCategoryDropdownIsActive}
            />
          )}
        </div>
        <h2>Feedback Detail</h2>
        <p>
          Include any specific comments on what should be improved, added, etc.
        </p>
        <textarea
          className={
            !feedbackDetailInputIsEmpty
              ? "feedback-detail"
              : "feedback-detail-error"
          }
          name="feedback-detail"
          maxLength={50}
          rows={5}
          onChange={handleFeedbackDetailInputChange}
        ></textarea>
        {feedbackDetailInputIsEmpty && (
          <p className="empty-message">Can't be empty</p>
        )}

        <div className="buttons">
          {buttonStatus === "done" ? (
            <button className="add-feedback" disabled>
              Added
            </button>
          ) : buttonStatus === "loading" ? (
            <button className="add-feedback">
              <img className="spinner" src={SpinnerLight} alt="spinner" />{" "}
            </button>
          ) : (
            <button className="add-feedback">Add Feedback</button>
          )}

          <button
            type="button"
            className="cancel"
            onClick={() => history.back()}
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}
