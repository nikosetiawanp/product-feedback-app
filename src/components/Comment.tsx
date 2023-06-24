import UserImage from "../assets/user-images/image-elijah.jpg";
import CommentNested from "./CommentNested";

const RecursiveComponent = () => {
  return (
    <div className="comment-nested">
      <img src={UserImage} alt="user-image" />
      <div className="contents">
        <div className="user-info-and-reply-button">
          <div className="user-info">
            <h3>Elijah Moss</h3>
            <h4>@hexagon.bestagon</h4>
          </div>
          <button className="reply-button">Reply</button>
        </div>
        <p>
          Also, please allow styles to be applied based on system preferences. I
          would love to be able to browse Frontend Mentor in the evening after
          my device’s dark mode turns on without the bright background it
          currently has.
        </p>
      </div>
      <div className="comment-nested-container"></div>
    </div>
  );
};

export default function Comment() {
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
            <button className="reply-button">Reply</button>
          </div>
          <p>
            Also, please allow styles to be applied based on system preferences.
            I would love to be able to browse Frontend Mentor in the evening
            after my device’s dark mode turns on without the bright background
            it currently has.
          </p>
        </div>
      </div>
      <div className="comment-nested-container">
        <RecursiveComponent />
        <RecursiveComponent />
      </div>
    </div>
  );
}
