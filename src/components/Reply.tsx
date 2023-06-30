import { useState, useCallback } from "react";
import { supabase } from "../client";
import UserImage from "../assets/user-images/image-elijah.jpg";
export default function Reply(props: { content: string; commentId: string }) {
  const [replyFormIsActive, setReplyFormIsActive] = useState(false);
  const [replyInput, setReplyInput] = useState("");
  const handleReplyInputChange = useCallback(
    (event: React.ChangeEvent<any>) => {
      setReplyInput(event.target.value);
    },
    []
  );
  const handleReplySubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    const { data, error } = await supabase.from("replies").insert([
      {
        content: `${replyInput}`,
        comment_id: `${props.commentId}`,
      },
    ]);
    console.log(data, error);
    location.reload();
  };

  return (
    <div className="comment-nested">
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
          <form className="reply-form" action="submit">
            <p>{replyInput}</p>
            <textarea
              name="reply-input"
              id="reply-input"
              className="reply-input"
              maxLength={50}
              cols={30}
              rows={5}
              onChange={handleReplyInputChange}
            ></textarea>
            <button
              className="textarea-submit-button"
              type="button"
              onClick={handleReplySubmit}
            >
              Post Reply
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
