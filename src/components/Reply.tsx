import { useState, useCallback } from "react";
import { supabase } from "../client";
export default function Reply(props: {
  content: string;
  parentId: string;
  productRequestId: string;
  name: string;
  username: string;
  image: string;
  replyingTo: string;
  isLoading: boolean;
}) {
  const profileUsername = localStorage.getItem("username");
  const [replyFormIsActive, setReplyFormIsActive] = useState(false);
  const [replyInputIsEmpty, setReplyInputIsEmpty] = useState(false);
  const [replyInput, setReplyInput] = useState("");
  const handleReplyInputChange = useCallback(
    (event: React.ChangeEvent<any>) => {
      setReplyInput(event.target.value);
    },
    []
  );
  const handleReplySubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    if (replyInput.trim() === "") {
      setReplyInputIsEmpty(true);
      return;
    }

    const { data, error } = await supabase.from("comments").insert([
      {
        product_request_id: `${props.productRequestId}`,
        content: replyInput,
        parent_id: `${props.parentId}`,
        user: profileUsername,
        replying_to: props.username,
      },
    ]);
    console.log(data, error);
    location.reload();
  };

  return (
    <div className="comment-nested">
      <img src={props.image} alt="user-image" />
      <div className="contents">
        <div className="user-info-and-reply-button">
          <div className="user-info">
            <h3>{!props.isLoading ? props.name : "Loading..."}</h3>
            {!props.isLoading ? <h4>@{props.username}</h4> : "Loading..."}
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
        <p>
          <b>{props.replyingTo !== null && `@${props.replyingTo}`}</b>{" "}
          {props.content}
        </p>
        {replyFormIsActive && (
          <form className="reply-form" action="submit">
            <div className="reply-input-container">
              <textarea
                name="reply-input"
                id="reply-input"
                className={
                  !replyInputIsEmpty ? "reply-input" : "reply-input-error"
                }
                maxLength={50}
                cols={30}
                rows={5}
                onChange={handleReplyInputChange}
              ></textarea>
              {replyInputIsEmpty && (
                <p className="empty-message">Can't be empty</p>
              )}
            </div>

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
