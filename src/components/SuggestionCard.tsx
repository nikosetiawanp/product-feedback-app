import IconArrowUp from "../assets/shared/icon-arrow-up.svg";
import IconComments from "../assets/shared/icon-comments.svg";
import { Link } from "react-router-dom";
import { supabase } from "../client";
import { useState, useEffect, useCallback } from "react";

export default function SuggestionCard(props: {
  id: string;
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
  commentsLength: number;
}) {
  const id = props.id;
  // const [feedbackDetail, setFeedbackDetail] = useState({
  //   id: "",
  //   title: "",
  //   category: "",
  //   description: "",
  //   status: "",
  //   upvotes: 0,
  // });
  const [comments, setComments] = useState([
    {
      content: "",
      id: "",
      product_request_id: "",
      replies: [],
    },
  ]);
  const handleButton = (e: React.ChangeEvent<unknown>) => {
    e.preventDefault();
    alert(`Upvoted "${props.title}"`);
  };

  // const allReplies = comments.map((comment) => comment.replies);
  // const allRepliesLength = allReplies.map((replies) => replies.length);
  // let allRepliesSum = 0;
  // for (let i = 0; i < allRepliesLength.length; i++) {
  //   allRepliesSum += allRepliesLength[i];
  // }
  // async function fetchFeedbackDetail() {
  //   const { data, error } = await supabase
  //     .from("product_requests")
  //     .select(`*, comments (*, replies (*))`)
  //     .eq("id", id);
  //   if (data !== null) {
  //     setFeedbackDetail(data[0]);
  //     await setComments(data[0].comments);
  //   } else console.log(error);
  // }
  // useEffect(() => {
  //   fetchFeedbackDetail();
  // }, []);

  return (
    <Link to={`/feedback-detail/${props.id}`}>
      <div className="suggestion-card">
        <button className="upvote-button" type="button" onClick={handleButton}>
          <img src={IconArrowUp} alt="icon-arrow-up" />
          {props.upvotes}
        </button>
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
