import Reply from "./Reply";
import UserImage from "../assets/user-images/image-elijah.jpg";
import { useState, useCallback, useEffect } from "react";
import { supabase } from "../client";

export default function Comment(props: {
  id: string;
  content: string;
  replies: [string];
}) {
  // const [replies, setReplies] = useState([]);
  const [replyFormIsActive, setReplyFormIsActive] = useState(false);
  const [replyInput, setReplyInput] = useState("");
  const handleReplyInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setReplyInput(event.target.value);
    },
    []
  );

  const handleReplySubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    const { data, error } = await supabase.from("replies").insert([
      {
        content: `${replyInput}`,
        comment_id: `${props.id}`,
      },
    ]);
    console.log(data, error);
    location.reload();
  };

  const renderedReplies = props.replies.map((reply) => (
    <Reply content={reply.content} key={reply.id} commentId={props.id} />
  ));

  return (
    <div className="comment-container">
      <div className="comment">
        <img src={UserImage} alt="user-image" />
        <div className="contents">
          <div className="user-info-and-reply-button">
            <div className="user-info">
              <h3>Elijah Moss</h3>
              <h4>@hexagon.bestagon</h4>
            </div>
            <button
              className="reply-button"
              onClick={() => {
                setReplyFormIsActive(!replyFormIsActive);
              }}
            >
              Reply
            </button>
          </div>
          <p>{props.content}</p>

          {replyFormIsActive && (
            <form
              className="reply-form"
              action="submit"
              onSubmit={handleReplySubmit}
            >
              <textarea
                name="reply-input"
                id="reply-input"
                className="reply-input"
                maxLength={250}
                cols={30}
                rows={5}
                contentEditable
                onChange={handleReplyInputChange}
              ></textarea>
              <button className="textarea-submit-button">Post Reply</button>
            </form>
          )}
        </div>
      </div>
      <div className="comment-nested-container">{renderedReplies}</div>
    </div>
  );
}
