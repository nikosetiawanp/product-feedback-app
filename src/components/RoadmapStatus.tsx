export default function RoadmapStatus(props: {
  plannedLength: number;
  inProgressLength: number;
  liveLength: number;
}) {
  return (
    <div className="roadmap">
      <h1>Roadmap</h1>
      <a className="view-roadmap" href="./roadmap">
        View
      </a>

      <span className="progress-name">
        <div className="oval-purple"></div>Planned
      </span>
      <b className="progress-count">{props.plannedLength}</b>

      <span className="progress-name">
        <div className="oval-orange"></div> In-Progress
      </span>
      <b className="progress-count">{props.inProgressLength}</b>

      <span className="progress-name">
        <div className="oval-blue"></div>Live
      </span>
      <b className="progress-count">{props.liveLength}</b>
    </div>
  );
}
