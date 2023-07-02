import IconArrowUp from "../assets/shared/icon-arrow-up.svg";
import IconComments from "../assets/shared/icon-comments.svg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "../client";

export default function SuggestionCard(props: {
  id: string;
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
  commentsLength: number;
}) {
  const username = localStorage.getItem("username");
  const [upvotes, setUpvotes] = useState([]);
  const [isUpvoted, setIsUpvoted] = useState(false);
  const getUpvotes = async () => {
    const { data, error } = await supabase
      .from("profile")
      .select(`*, upvotes (product_request_id)`)
      .eq("username", username);
    if (error) return error;
    await setUpvotes(
      data[0].upvotes.map((obj: string) => Object.values(obj)[0])
    );
    setIsUpvoted(upvotes.includes(props.id));
  };
  useEffect(() => {
    getUpvotes();
  }, [upvotes.includes(props.id)]);

  const upvote = async (e: React.ChangeEvent<unknown>) => {
    e.preventDefault();
    setIsUpvoted(true);
    const { data, error } = await supabase
      .from("upvotes")
      .insert([{ product_request_id: props.id, upvoted_by: username }]);
    if (error) {
      console.log(error);
    } else console.log(data);
  };
  const downvote = (e: React.ChangeEvent<unknown>) => {
    e.preventDefault();
    setIsUpvoted(true);
  };

  return (
    <Link to={`/feedback-detail/${props.id}`}>
      <div className="suggestion-card">
        {!isUpvoted ? (
          <button className="upvote-button" type="button" onClick={upvote}>
            <img src={IconArrowUp} alt="icon-arrow-up" />
            {props.upvotes}
          </button>
        ) : (
          <button className="downvote-button" type="button" onClick={downvote}>
            <img src={IconArrowUp} alt="icon-arrow-up" />
            {props.upvotes}
          </button>
        )}
        {/* UPVOTE */}

        {/* DOWNVOTE */}

        <div className="suggestion-preview">
          <h3>{props.title}</h3>
          <p>{props.description}</p>
          <span className="tag">{props.category}</span>
        </div>
        <span className="comment-count">
          <img src={IconComments} alt="comment-icon" />
          {props.commentsLength}
          {/* {comments.length + allRepliesSum} */}
        </span>
      </div>
    </Link>
  );
}
