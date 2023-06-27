import SuggestionCard from "../components/SuggestionCard";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import ButtonGoBack from "../components/ButtonGoBack";
import Comment from "../components/Comment";
import { supabase } from "../client";
import { Link } from "react-router-dom";

export default function FeedbackDetailPage() {
  const { id } = useParams();

  const [comments, setComments] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const [feedbackDetail, setFeedbackDetail] = useState([
    {
      id: 0,
      title: "title",
      category: "category",
      upvotes: 0,
      status: "status",
      comments: [],
    },
  ]);

  // FETCH DATA FROM JSON
  async function fetchFeedbackDetail() {
    const { data, error } = await supabase
      .from("product_requests")
      .select("*, comments->content")
      .eq("id", `${id}`);

    setFeedbackDetail(data[0]);
    setComments(Object.keys(data[0].comments));
    console.log(data);
  }
  useEffect(() => {
    fetchFeedbackDetail();
  }, []);

  // async function fetchComments() {
  //   const { data, error } = await supabase
  //     .from("comments")
  //     .select("*")
  //     .contains("id", "comments");
  //   console.log(data);
  // }

  // useEffect(() => {
  //   fetchComments();
  // }, []);

  const [commentInput, setCommentInput] = useState("");
  const handleCommentInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCommentInput(event.target.value);
    },
    []
  );

  return (
    <div className="feedback-detail-page">
      {/* BUTTONS */}
      <div className="buttons">
        <ButtonGoBack />
        <Link to={`../edit-feedback/${id}`}>
          <button className="button-edit-feedback">Edit Feedback</button>
        </Link>
      </div>
      {/* FEEDBACK */}
      <SuggestionCard
        id={feedbackDetail.id}
        key={feedbackDetail.id}
        title={feedbackDetail.title}
        category={feedbackDetail.category}
        upvotes={feedbackDetail.upvotes}
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

      <form action="submit" className="reply-comment-form">
        <h2>Add Comment</h2>
        <textarea
          name="comment-input"
          id="comment-input"
          className="comment-input"
          maxLength={250}
          cols={30}
          rows={5}
          onChange={handleCommentInputChange}
        ></textarea>
        <div className="characters-and-button">
          <p className="characters-count">
            {250 - commentInput.length} characters left
          </p>
          <button className="post-comment-button">Post Comment</button>
        </div>
      </form>
    </div>
  );
}
