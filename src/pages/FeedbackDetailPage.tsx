import SuggestionCard from "../components/SuggestionCard";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import ButtonGoBack from "../components/ButtonGoBack";
import Comment from "../components/Comment";
import { supabase } from "../client";
import { Link } from "react-router-dom";

export default function FeedbackDetailPage() {
  const { id } = useParams();

  const [feedbackDetail, setFeedbackDetail] = useState([]);
  const [comments, setComments] = useState([]);
  const [replies, setReplies] = useState([]);

  const [commentInput, setCommentInput] = useState("");
  const handleCommentInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCommentInput(event.target.value);
    },
    []
  );

  async function fetchFeedbackDetail() {
    const { data, error } = await supabase
      .from("product_requests")
      .select(`*, comments (*, replies (*))`)
      .eq("id", id);

    console.log(data[0].comments);

    setFeedbackDetail(data[0]);
    setComments(data[0].comments);
  }
  useEffect(() => {
    fetchFeedbackDetail();
  }, []);

  const renderedComments = comments.map((comment) => (
    <Comment
      key={comment.id}
      id={comment.id}
      content={comment.content}
      replies={comment.replies}
    />
  ));

  const handleCommentSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    const { data, error } = await supabase.from("comments").insert([
      {
        content: `${commentInput}`,
        product_request_id: `${id}`,
      },
    ]);
    location.reload();
  };

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

      {comments.length > 0 && (
        <div className="comment-section">
          <h2>{comments.length} Comments</h2>
          {renderedComments}
          {/* COMMENTS */}
          {/* <Comment />
        <Comment /> */}
        </div>
      )}
      <form
        action="submit"
        className="reply-comment-form"
        onSubmit={handleCommentSubmit}
      >
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
