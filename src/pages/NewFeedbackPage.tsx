import { useState, useCallback } from "react";
import { supabase } from "../client";

import IconArrowDown from "../assets/shared/icon-arrow-down.svg";
import IconArrowUp from "../assets/shared/icon-arrow-up.svg";
import IconNewFeedback from "../assets/shared/icon-new-feedback.svg";

import CategoryDropdown from "../components/CategoryDropdown";
import ButtonGoBack from "../components/ButtonGoBack";

export default function NewFeedbackPage() {
  const [categoryDropdownIsActive, setCategoryDropdownIsActive] =
    useState(false);
  const [titleInput, setTitleInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("Feature");
  const [feedbackDetailInput, setFeedbackDetailInput] = useState("");
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
    const { data, error } = await supabase.from("product_requests").insert([
      {
        title: `${titleInput}`,
        category: `${categoryInput}`,
        upvotes: 0,
        status: "Suggestion",
        description: `${feedbackDetailInput}`,
        comments: null,
      },
    ]);
    if (!error) {
      console.log(data);
      alert("Successfully created data");
      window.location.href = "../suggestions";
    } else console.log(error);
  };

  return (
    <section className="new-feedback-page">
      <form
        className="feedback-form"
        action="submit"
        onSubmit={handleFormSubmit}
      >
        <ButtonGoBack />

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
          className="title-input"
          onChange={handleTitleInputChange}
        />
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
          className="feedback-detail"
          name="feedback-detail"
          maxLength={50}
          rows={5}
          onChange={handleFeedbackDetailInputChange}
        ></textarea>
        <div className="buttons">
          <button className="add-feedback">Add Feedback</button>
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
