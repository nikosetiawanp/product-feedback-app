import IconArrowLeft from "../assets/shared/icon-arrow-left.svg";
import IconArrowDown from "../assets/shared/icon-arrow-down.svg";
import IconArrowUp from "../assets/shared/icon-arrow-up.svg";
import IconEditFeedback from "../assets/shared/icon-edit-feedback.svg";

import { useState } from "react";
import CategoryDropdown from "../components/CategoryDropdown";
import StatusDropdown from "../components/StatusDropdown";
import ButtonGoBack from "../components/ButtonGoBack";

export default function NewFeedbackPage() {
  const [titleInput, setTitleInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("Feature");
  const [categoryDropdownIsActive, setCategoryDropdownIsActive] =
    useState(false);
  const [statusInput, setStatusInput] = useState("Suggested");
  const [statusDropdownIsActive, setStatusDropdownIsActive] = useState(false);

  const toggleCategoryDropdown = () => {
    return setCategoryDropdownIsActive(!categoryDropdownIsActive);
  };
  const toggleStatusDropdown = () => {
    return setStatusDropdownIsActive(!statusDropdownIsActive);
  };

  return (
    <section className="edit-feedback-page">
      <form className="feedback-form" action="submit">
        <ButtonGoBack />
        {/* <button
          className="go-back"
          type="button"
          onClick={() => history.back()}
        >
          <img src={IconArrowLeft} alt="icon-arrow-left" /> &nbsp; Go back
        </button> */}

        <img
          className="icon-new-feedback"
          src={IconEditFeedback}
          alt="icon-new-feedback"
        />
        <h1>Editing 'Add a dark theme option'</h1>
        {/* title input */}
        <h2>Feedback Title</h2>
        <p>Add a short, descriptive headline</p>
        <input type="text" className="title-input" />
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

        {/* UPDATE STATUS */}
        <h2>Update Status</h2>
        <p>Change feature state</p>
        <div className="category-input-container">
          <button
            type="button"
            className="category-input"
            onClick={toggleStatusDropdown}
          >
            {statusInput}
            <img
              src={!statusDropdownIsActive ? IconArrowDown : IconArrowUp}
              alt="icon-arrow-down"
            />
          </button>
          {statusDropdownIsActive && (
            <StatusDropdown
              statusInput={statusInput}
              setStatusInput={setStatusInput}
              statusDropdownIsActive={statusDropdownIsActive}
              setStatusDropdownIsActive={setStatusDropdownIsActive}
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
        ></textarea>
        <div className="buttons">
          <button className="save-changes">Save Changes</button>
          <button
            type="button"
            className="cancel"
            onClick={() => history.back()}
          >
            Cancel
          </button>
          <button type="button" className="delete">
            Delete
          </button>
        </div>
      </form>
    </section>
  );
}
