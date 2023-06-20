import IconArrowUp from "../assets/shared/icon-arrow-up.svg";
import IconComments from "../assets/shared/icon-comments.svg";

export default function SuggestionCard() {
  return (
    <div className="suggestion-card">
      <button className="upvote-count">
        <img src={IconArrowUp} alt="icon-arrow-up" />
        112
      </button>
      <div className="suggestion-preview">
        <h3>Add tags for solutions</h3>
        <p>Easier to search for solutions based on a specific stack</p>
        <span className="tag">Enhancement</span>
      </div>
      <span className="comment-count">
        <img src={IconComments} alt="comment-icon" />2
      </span>
    </div>
  );
}
