import { useState, useEffect, useCallback } from "react";
import IconArrowDown from "../assets/shared/icon-arrow-down.svg";
import IconArrowUp from "../assets/shared/icon-arrow-up.svg";
import IconEditFeedback from "../assets/shared/icon-edit-feedback.svg";
import { useParams } from "react-router-dom";
import SpinnerLight from "../assets/shared/spinner-light.svg";

import CategoryDropdown from "../components/CategoryDropdown";
import StatusDropdown from "../components/StatusDropdown";
import ButtonGoBack from "../components/ButtonGoBack";
import { supabase } from "../client";

export default function NewFeedbackPage() {
  const { id } = useParams();
  const [buttonStatus, setButtonStatus] = useState("idle");

  const [titleInput, setTitleInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [statusInput, setStatusInput] = useState("");
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

  const [feedbackDetail, setFeedbackDetail] = useState({
    title: "",
    category: "",
    status: "",
    description: "",
    id: "",
  });

  const [categoryDropdownIsActive, setCategoryDropdownIsActive] =
    useState(false);
  const [statusDropdownIsActive, setStatusDropdownIsActive] = useState(false);

  const toggleCategoryDropdown = () => {
    return setCategoryDropdownIsActive(!categoryDropdownIsActive);
  };
  const toggleStatusDropdown = () => {
    return setStatusDropdownIsActive(!statusDropdownIsActive);
  };

  async function fetchFeedbackDetail() {
    const { data, error } = await supabase
      .from("product_requests")
      .select()
      .eq("id", `${id}`);
    console.log(error);

    setFeedbackDetail(data?.[0]);
  }
  useEffect(() => {
    fetchFeedbackDetail();

    setTitleInput(feedbackDetail.title);
    setCategoryInput(feedbackDetail.category);
    setStatusInput(feedbackDetail.status);
    setFeedbackDetailInput(feedbackDetail.description);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    feedbackDetail.category,
    feedbackDetail.description,
    feedbackDetail.status,
    feedbackDetail.title,
  ]);

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

    const { data, error } = await supabase
      .from("product_requests")
      .update({
        title: `${titleInput}`,
        category: `${categoryInput}`,
        status: `${statusInput}`,
        description: `${feedbackDetailInput}`,
      })
      .eq("id", feedbackDetail.id);
    console.log(data, error);
    setButtonStatus("done");
  };

  const deleteFeedback = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("product_requests")
      .delete()
      .eq("id", feedbackDetail.id);
    console.log(data, error);

    alert("Delete successful");
    statusInput == "Suggestion"
      ? (window.location.href = "../suggestions")
      : (window.location.href = "../roadmap");
  };

  return (
    <section className="edit-feedback-page">
      <ButtonGoBack />
      <form
        className="feedback-form"
        action="submit"
        onSubmit={handleFormSubmit}
      >
        <img
          className="icon-new-feedback"
          src={IconEditFeedback}
          alt="icon-new-feedback"
        />
        <h1>Editing '{feedbackDetail.title}'</h1>
        {/* title input */}
        <h2>Feedback Title</h2>
        <p>Add a short, descriptive headline</p>
        <input
          type="text"
          className={!titleInputIsEmpty ? "title-input" : "title-input-error"}
          value={titleInput}
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

        {/* UPDATE STATUS */}
        <h2>Update Status</h2>
        <p>Change feature state</p>
        <div className="category-input-container">
          <button
            type="button"
            className="status-input"
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
          className={
            !feedbackDetailInputIsEmpty
              ? "feedback-detail"
              : "feedback-detail-error"
          }
          name="feedback-detail"
          maxLength={50}
          onChange={handleFeedbackDetailInputChange}
          value={feedbackDetailInput}
          // placeholder={feedbackDetail.description}
        ></textarea>
        {feedbackDetailInputIsEmpty && (
          <p className="empty-message">Can't be empty</p>
        )}
        <div className="buttons">
          {buttonStatus === "done" ? (
            <button className="add-feedback" disabled>
              Saved
            </button>
          ) : buttonStatus === "loading" ? (
            <button className="add-feedback">
              <img className="spinner" src={SpinnerLight} alt="spinner" />{" "}
            </button>
          ) : (
            <button className="add-feedback">Save Changes</button>
          )}
          <button
            type="button"
            className="cancel"
            onClick={() => history.back()}
          >
            Cancel
          </button>
          <button type="button" className="delete" onClick={deleteFeedback}>
            Delete
          </button>
        </div>
      </form>
    </section>
  );
}
