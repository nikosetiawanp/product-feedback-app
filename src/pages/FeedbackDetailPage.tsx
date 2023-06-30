import SuggestionCard from "../components/SuggestionCard";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import ButtonGoBack from "../components/ButtonGoBack";
import Comment from "../components/Comment";
import { supabase } from "../client";
import { Link } from "react-router-dom";

export default function FeedbackDetailPage() {
  const { id } = useParams();

  const [feedbackDetail, setFeedbackDetail] = useState({
    id: "",
    title: "",
    category: "",
    description: "",
    status: "",
    upvotes: 0,
  });
  const [comments, setComments] = useState([
    {
      content: "",
      id: "",
      product_request_id: "",
      replies: [],
    },
  ]);
  const [commentInput, setCommentInput] = useState("");
  const handleCommentInputChange = useCallback(
    (event: React.ChangeEvent<any>) => {
      setCommentInput(event.target.value);
    },
    []
  );

  async function fetchFeedbackDetail() {
    const { data, error } = await supabase
      .from("product_requests")
      .select(`*, comments (*, replies (*))`)
      .eq("id", id);
    if (data !== null) {
      setFeedbackDetail(data[0]);
      await setComments(data[0].comments);
    } else console.log(error);
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
    console.log(data, error);

    location.reload();
  };

  const allReplies = comments.map((comment) => comment.replies);
  const allRepliesLength = allReplies.map((replies) => replies.length);
  let allRepliesSum = 0;
  for (let i = 0; i < allRepliesLength.length; i++) {
    allRepliesSum += allRepliesLength[i];
  }

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
        status={feedbackDetail.status}
        description={feedbackDetail.description}
        totalComments={comments.length + allRepliesSum}
        comments={[]}
      />

      {comments.length > 0 && (
        <div className="comment-section">
          <h2>{comments.length + allRepliesSum} Comments</h2>
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
