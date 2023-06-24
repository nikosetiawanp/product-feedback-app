import SuggestionCard from "../components/SuggestionCard";
import { useState, useEffect } from "react";

import ButtonGoBack from "../components/ButtonGoBack";
import Comment from "../components/Comment";
export default function FeedbackDetailPage() {
  //   useEffect(() => {
  //     const url = "../../data.json";
  //     const fetchData = async () => {
  //       try {
  //         const response = await fetch(url);
  //         const json = await response.json();
  //         setCurrentUser(json.currentUser);
  //         setProductRequests(json.productRequests);
  //       } catch (error) {
  //         console.log("error", error);
  //       }
  //     };

  //     fetchData();
  //   }, []);

  return (
    <div className="feedback-detail-page">
      {/* BUTTONS */}
      <div className="buttons">
        <ButtonGoBack />
        <button className="button-edit-feedback">Edit Feedback</button>
      </div>
      {/* FEEDBACK */}
      <SuggestionCard
        id={5}
        key={5}
        title="Add a dark theme option"
        category="Feature"
        upvotes={99}
        status="suggestion"
        description="It would help people with light sensitivities and who prefer dark mode."
        comments={[]}
      />

      <div className="comment-section">
        <h2>4 Comments</h2>
        {/* COMMENTS */}
        <Comment />
      </div>
    </div>
  );
}
