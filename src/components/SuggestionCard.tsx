import IconArrowUp from "../assets/shared/icon-arrow-up.svg";
import IconComments from "../assets/shared/icon-comments.svg";

export default function SuggestionCard(props: {
  id: number;
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
  comments: [object];
}) {
  return (
    <div className="suggestion-card">
      <button className="upvote-count">
        <img src={IconArrowUp} alt="icon-arrow-up" />
        {props.upvotes}
      </button>
      <div className="suggestion-preview">
        <h3>{props.title}</h3>
        <p>{props.description}</p>
        <span className="tag">
          {props.category[0].toUpperCase() + props.category.slice(1)}
        </span>
      </div>
      <span className="comment-count">
        <img src={IconComments} alt="comment-icon" />2
      </span>
    </div>
  );
}
