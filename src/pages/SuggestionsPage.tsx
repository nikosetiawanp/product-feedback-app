import HamburgerIcon from "../assets/shared/mobile/icon-hamburger.svg";
// components
import MobileSidebar from "../components/MobileSidebar";
import SuggestionCard from "../components/SuggestionCard";
import CategoryButton from "../components/CategoryButton";
import SortByDropdown from "../components/SortByDropdown";

// icons
import CloseIcon from "../assets/shared/mobile/icon-close.svg";
import IconSuggestions from "../assets/suggestions/icon-suggestions.svg";
import IconArrowDown from "../assets/shared/icon-arrow-down.svg";
import IconArrowUp from "../assets/shared/icon-arrow-up.svg";
import IconComments from "../assets/shared/icon-comments.svg";

import { useState } from "react";

export default function SuggestionsPage() {
  const [mobileSidebarIsActive, setMobileSidebarIsActive] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortByIsActive, setSortByIsActive] = useState(false);
  const [sortBy, setSortBy] = useState("Most Upvotes");

  const toggleMobileSidebar = () => {
    setMobileSidebarIsActive(!mobileSidebarIsActive);
  };
  const toggleSortBy = () => {
    setSortByIsActive(!sortByIsActive);
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
          {/* <button className="inactive">UI</button>
          <button className="inactive">UX</button>
          <button className="inactive">Enhancement</button>
          <button className="inactive">Bug</button>
        <button className="inactive">Feature</button> */}
          <CategoryButton
            categoryName={"All"}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
          />
          <CategoryButton
            categoryName={"UI"}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
          />
          <CategoryButton
            categoryName={"UX"}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
          />
          <CategoryButton
            categoryName={"Enhancement"}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
          />
          <CategoryButton
            categoryName={"Bug"}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
          />
          <CategoryButton
            categoryName={"Feature"}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
          />
        </div>
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
        {mobileSidebarIsActive && <MobileSidebar />}
      </header>

      {/* CONTENT */}
      <section className="suggestions-container">
        <div className="suggestions-bar">
          <span className="suggestions-count">
            <img
              className="suggestions-icon"
              src={IconSuggestions}
              alt="icon-suggestions"
            />
            6 Suggestions
          </span>
          <button className="sort-by" onClick={toggleSortBy}>
            Sort by : <b>{sortBy}</b> &nbsp;
            <img
              src={!sortByIsActive ? IconArrowDown : IconArrowUp}
              alt="icon-arrow-down"
            />
            {sortByIsActive && (
              <SortByDropdown sortBy={sortBy} setSortBy={setSortBy} />
            )}
          </button>
          <button className="add-feedback-button">+ Add Feedback</button>
        </div>

        {/* SUGGESTION LIST */}
        <div className="suggestions-list">
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
          <SuggestionCard />
          <SuggestionCard />
          <SuggestionCard />
          <SuggestionCard />
        </div>
      </section>
    </div>
  );
}
