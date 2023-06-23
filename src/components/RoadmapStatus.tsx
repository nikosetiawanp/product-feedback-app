export default function RoadmapStatus(props: {
  plannedCount: number;
  inProgressCount: number;
  liveCount: number;
}) {
  return (
    <div className="roadmap">
      <h1>Roadmap</h1>
      <a className="view-roadmap" href="http://localhost:5173/roadmap">
        View
      </a>

      <span className="progress-name">
        <div className="oval-purple"></div>Planned
      </span>
      <b className="progress-count">{props.plannedCount}</b>

      <span className="progress-name">
        <div className="oval-orange"></div> In-Progress
      </span>
      <b className="progress-count">{props.inProgressCount}</b>

      <span className="progress-name">
        <div className="oval-blue"></div>Live
      </span>
      <b className="progress-count">{props.liveCount}</b>
    </div>
  );
}
