export default function RoadmapStatus() {
  return (
    <div className="roadmap">
      <h1>Roadmap</h1>
      <a className="view-roadmap" href="#">
        View
      </a>

      <span className="progress-name">
        <div className="oval-purple"></div>Planned
      </span>
      <b className="progress-count">2</b>

      <span className="progress-name">
        <div className="oval-orange"></div> In-Progress
      </span>
      <b className="progress-count">2</b>

      <span className="progress-name">
        <div className="oval-blue"></div>Live
      </span>
      <b className="progress-count">2</b>
    </div>
  );
}
