import IconArrowUp from "../assets/shared/icon-arrow-up.svg";
import IconArrowUpWhite from "../assets/shared/icon-arrow-up-white.svg";
import IconComments from "../assets/shared/icon-comments.svg";
import SpinnerDark from "../assets/shared/spinner-dark.svg";

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
  const [upvoteCount, setUpvoteCount] = useState(0);
  const [isUpvoted, setIsUpvoted] = useState(false);

  const getUpvotes = async () => {
    const { data, error } = await supabase
      .from("upvotes")
      .select(`*`)
      .eq("product_request_id", props.id)
      .eq("upvoted_by", username);
    if (error) return;
    if (data.length > 0) setIsUpvoted(true);
  };

  const getUpvoteCount = async () => {
    const { data, error } = await supabase
      .from("upvotes")
      .select("*")
      .eq("product_request_id", props.id);
    if (error) return error;
    setUpvoteCount(data.length);
  };

  useEffect(() => {
    getUpvoteCount();
    getUpvotes();
  }, [upvotes.includes(props.id)]);

  // UPVOTE FUNCTION
  const upvote = async (e: React.ChangeEvent<unknown>) => {
    e.preventDefault();
    setIsUpvoted(true);
    setUpvoteCount((current) => current + 1);
    const { data, error } = await supabase
      .from("upvotes")
      .insert([{ product_request_id: props.id, upvoted_by: username }]);
    if (error) {
      console.log(error);
    } else console.log(data);
  };
  // DOWNVOTE FUNCTION
  const downvote = async (e: React.ChangeEvent<unknown>) => {
    e.preventDefault();
    setIsUpvoted(false);
    setUpvoteCount((current) => current - 1);

    const { error } = await supabase
      .from("upvotes")
      .delete()
      .eq("upvoted_by", username)
      .eq("product_request_id", props.id);
    if (error) console.log(error);
  };

  return (
    <div className="suggestion-card">
      {!isUpvoted ? (
        <button className="upvote-button" type="button" onClick={upvote}>
          <img src={IconArrowUp} alt="icon-arrow-up" />
          {upvoteCount}
        </button>
      ) : (
        <button className="downvote-button" type="button" onClick={downvote}>
          <img src={IconArrowUpWhite} alt="icon-arrow-up" />
          {upvoteCount}
        </button>
      )}
      <div className="suggestion-preview">
        <Link to={`/feedback-detail/${props.id}`}>
          <h3>{props.title}</h3>
        </Link>
        <p>{props.description}</p>
        <span className="tag">{props.category}</span>
      </div>
      <span className="comment-count">
        <img src={IconComments} alt="comment-icon" />
        {props.commentsLength}
      </span>
    </div>
  );
}
