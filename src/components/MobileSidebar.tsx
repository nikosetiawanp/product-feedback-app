import DotOrange from "../assets/suggestions/dot-orange.svg";
import DotBlue from "../assets/suggestions/dot-blue.svg";
import DotPurple from "../assets/suggestions/dot-purple.svg";

export default function MobileSidebar() {
  return (
    <div className="mobile-sidebar">
      <div className="mobile-sidebar-card">
        <div className="category">
          <button className="active">All</button>
          <button className="inactive">UI</button>
          <button className="inactive">UX</button>
          <button className="inactive">Enhancement</button>
          <button className="inactive">Bug</button>
          <button className="inactive">Feature</button>
        </div>
        <div className="roadmap">
          <h1>Roadmap</h1>
          <a href="#">View</a>

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
      </div>
    </div>
  );
}
