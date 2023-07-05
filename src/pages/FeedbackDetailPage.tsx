import { useState, useEffect, useCallback } from "react";
import { supabase } from "../client";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import SuggestionCard from "../components/SuggestionCard";
import ButtonGoBack from "../components/ButtonGoBack";
import Comment from "../components/Comment";

export default function FeedbackDetailPage() {
  const { id } = useParams();
  const profileUsername = localStorage.getItem("username");
  const [isLoading, setIsLoading] = useState(true);
  const [feedbackDetail, setFeedbackDetail] = useState({
    id: "",
    title: "Loading...",
    category: "Loading...",
    description: "Loading...",
    status: "Loading...",
    upvotes: [],
  });
  const [comments, setComments] = useState([
    {
      content: "Loading...",
      id: "",
      product_request_id: "",
      parent_id: null,
      user: {
        name: "Loading...",
        username: "Loading...",
        image: "Loading...",
      },
    },
  ]);
  const [commentInput, setCommentInput] = useState("");
  const handleCommentInputChange = useCallback(
    (event: React.ChangeEvent<any>) => {
      setCommentInput(event.target.value);
    },
    []
  );

  // FETCH COMMENTS
  async function fetchFeedbackDetail() {
    const { data, error } = await supabase
      .from("product_requests")
      .select(`*, comments (*, user ( * )), upvotes (*)`)
      .eq("id,", id);
    if (data !== null) {
      setFeedbackDetail(data[0]);
      setComments(data[0].comments);
      // setUpvoteCount(data[0].upvotes.length);
      setIsLoading(false);
    } else console.log(error);
  }
  useEffect(() => {
    fetchFeedbackDetail();
  }, []);

  const renderedComments =
    !isLoading &&
    comments
      .filter((comment) => comment.parent_id == null)
      .map((comment) => (
        <Comment
          key={comment.id}
          id={comment.id}
          content={comment.content}
          productRequestId={id!}
          name={comment.user.name}
          username={comment.user.username}
          image={comment.user.image}
          isLoading={isLoading}
        />
      ));

  const handleCommentSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();

    const { data, error } = await supabase.from("comments").insert([
      {
        content: `${commentInput}`,
        product_request_id: `${id}`,
        user: profileUsername,
      },
    ]);
    console.log(data, error);
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
        upvotes={feedbackDetail.upvotes.length}
        status={feedbackDetail.status}
        description={feedbackDetail.description}
        commentsLength={comments.length}
      />

      {comments.length > 0 && (
        <div className="comment-section">
          {isLoading ? (
            <h2>Loading...</h2>
          ) : (
            <h2>{comments.length} Comments</h2>
          )}
          {renderedComments}
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
