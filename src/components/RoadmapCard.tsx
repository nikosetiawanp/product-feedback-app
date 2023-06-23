import IconArrowUp from "../assets/shared/icon-arrow-up.svg";
import IconComments from "../assets/shared/icon-comments.svg";

export default function RoadmapCard(props: {
  id: number;
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
  comments: [object];
}) {
  return (
    <div className="roadmap-card">
      {/* PROGRESS */}
      <div
        className={
          props.status === "planned"
            ? "accent-orange"
            : props.status === "in-progress"
            ? "accent-purple"
            : "accent-blue"
        }
      ></div>
      <span className="progress-name">
        {/* OVAL */}
        <div
          className={
            props.status === "planned"
              ? "oval-orange"
              : props.status === "in-progress"
              ? "oval-purple"
              : "oval-blue"
          }
        ></div>
        {props.status === "planned"
          ? "Planned"
          : props.status === "in-progress"
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
        <span className="upvotes">
          <img src={IconArrowUp} alt="icon-arrow-up" /> &nbsp; {props.upvotes}
        </span>
        <span className="comments">
          <img src={IconComments} alt="icon-comments" /> &nbsp;
          {/* {props.comments.length > 0 ? props.comments.length : 0} */}
        </span>
      </div>
    </div>
  );
}
