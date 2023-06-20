import HamburgerIcon from "../assets/shared/mobile/icon-hamburger.svg";
import CloseIcon from "../assets/shared/mobile/icon-close.svg";
import MobileSidebar from "../components/MobileSidebar";
import IconSuggestions from "../assets/suggestions/icon-suggestions.svg";
import IconArrowDown from "../assets/shared/icon-arrow-down.svg";
import { useState } from "react";

export default function SuggestionsPage() {
  const [mobileSidebarIsActive, setMobileSidebarIsActive] = useState(false);
  const toggleMobileSidebar = () => {
    setMobileSidebarIsActive(!mobileSidebarIsActive);
  };
  return (
    <div className="page-container">
      {/* HEADER */}
      <header className="suggestions-header">
        <div className="rainbow-card">
          <div className="headline-subheadline">
            <h1>Frontend Mentor</h1>
            <h2>Feedback Board</h2>
          </div>
          <button>
            <img
              src={!mobileSidebarIsActive ? HamburgerIcon : CloseIcon}
              alt="hamburger-icon"
              onClick={toggleMobileSidebar}
            />
          </button>
        </div>
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
        {mobileSidebarIsActive && <MobileSidebar />}
      </header>

      {/* CONTENT */}
      <section className="suggestions-container">
        <div className="suggestions-bar">
          <span className="suggestions-count">
            {" "}
            <img
              className="suggestions-icon"
              src={IconSuggestions}
              alt="icon-suggestions"
            />
            6 Suggestions
          </span>
          <button className="sort-by">
            Sort by : <b>Most Upvotes</b> &nbsp;
            <img src={IconArrowDown} alt="" />
          </button>
          <button className="add-feedback-button">+ Add Feedback</button>
        </div>

        <div className="suggestions-list"></div>
      </section>
    </div>
  );
}
