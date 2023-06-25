import SuggestionCard from "../components/SuggestionCard";
import { useState, useEffect } from "react";

import ButtonGoBack from "../components/ButtonGoBack";
import Comment from "../components/Comment";
export default function FeedbackDetailPage() {
  const [productRequests, setProductRequests] = useState([
    {
      id: 0,
      title: "title",
      category: "enhancement",
      upvotes: 0,
      status: "suggestion",
      comments: [
        {
          id: 0,
          content: "content",
          user: {
            image: "image",
            name: "name",
            username: "username",
          },
        },
      ],
    },
  ]);
  const [commentList, setCommentList] = useState([]);

  // FETCH DATA FROM JSON
  useEffect(() => {
    const url = "../../data.json";
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setProductRequests(json.productRequests);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  //   console.log(productRequests[3].comments);

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
        <Comment />
      </div>
    </div>
  );
}
