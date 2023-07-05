import IconArrowUp from "../assets/shared/icon-arrow-up.svg";
import IconArrowUpWhite from "../assets/shared/icon-arrow-up-white.svg";
import SpinnerDark from "../assets/shared/spinner-dark.svg";

import IconComments from "../assets/shared/icon-comments.svg";
import { Link } from "react-router-dom";
import { supabase } from "../client";
import { useState, useEffect } from "react";

export default function RoadmapCard(props: {
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
    <div className="roadmap-card">
      {/* PROGRESS */}
      <div
        className={
          props.status === "Planned"
            ? "accent-orange"
            : props.status === "In-Progress"
            ? "accent-purple"
            : "accent-blue"
        }
      ></div>
      <span className="progress-name">
        {/* OVAL */}
        <div
          className={
            props.status === "Planned"
              ? "oval-orange"
              : props.status === "In-Progress"
              ? "oval-purple"
              : "oval-blue"
          }
        ></div>
        {props.status === "Planned"
          ? "Planned"
          : props.status === "In-Progress"
          ? "In Progress"
          : "Live"}
      </span>
      {/* TITLE */}
      <Link to={`/feedback-detail/${props.id}`}>
        <h2 className="title">{props.title}</h2>
      </Link>

      <p className="description">{props.description}</p>
      <span className="roadmap-category">
        {props.category[0].toUpperCase() + props.category.slice(1)}
      </span>
      <div className="upvotes-and-comments">
        {!isUpvoted ? (
          <button className="upvotes" onClick={upvote}>
            <img src={IconArrowUp} alt="icon-arrow-up" /> &nbsp; {upvoteCount}
          </button>
        ) : (
          <button className="downvotes" onClick={downvote}>
            <img src={IconArrowUpWhite} alt="icon-arrow-up" /> &nbsp;{" "}
            {upvoteCount}
          </button>
        )}

        <span className="comments">
          <img src={IconComments} alt="icon-comments" /> &nbsp;
          {props.commentsLength}
        </span>
      </div>
    </div>
  );
}
