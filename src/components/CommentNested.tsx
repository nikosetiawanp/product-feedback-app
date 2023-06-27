import { useState } from "react";
import UserImage from "../assets/user-images/image-elijah.jpg";

export default function CommentNested() {
  const [replyFormIsActive, setReplyFormIsActive] = useState(false);
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
        <p>
          Also, please allow styles to be applied based on system preferences. I
          would love to be able to browse Frontend Mentor in the evening after
          my device’s dark mode turns on without the bright background it
          currently has.
        </p>
        {replyFormIsActive && (
          <form className="reply-form" action="submit">
            <textarea
              name="reply-input"
              id="reply-input"
              className="reply-input"
              maxLength={50}
              cols={30}
              rows={5}
            ></textarea>
            <button className="textarea-submit-button" type="button">
              Post Reply
            </button>
          </form>
        )}
      </div>
      {/* <div className="comment-nested-container"></div> */}
    </div>
  );
}
