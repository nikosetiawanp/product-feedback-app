import IconArrowUp from "../assets/shared/icon-arrow-up.svg";
import IconComments from "../assets/shared/icon-comments.svg";
import { Link } from "react-router-dom";

export default function RoadmapCard(props: {
  id: string;
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
  commentsLength: number;
}) {
  const handleButton = (e: React.ChangeEvent<unknown>) => {
    e.preventDefault();
    alert(`Upvoted "${props.title}"`);
  };
  return (
    <Link to={`/feedback-detail/${props.id}`}>
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
        <h2 className="title">{props.title}</h2>
        <p className="description">{props.description}</p>
        <span className="roadmap-category">
          {props.category[0].toUpperCase() + props.category.slice(1)}
        </span>
        <div className="upvotes-and-comments">
          <button className="upvotes" onClick={handleButton}>
            <img src={IconArrowUp} alt="icon-arrow-up" /> &nbsp; {props.upvotes}
          </button>
          <span className="comments">
            <img src={IconComments} alt="icon-comments" /> &nbsp;
            {props.commentsLength}
          </span>
        </div>
      </div>
    </Link>
  );
}
