import HamburgerIcon from "../assets/shared/mobile/icon-hamburger.svg";
// components
import MobileSidebar from "../components/MobileSidebar";
import SuggestionCard from "../components/SuggestionCard";
import SortByDropdown from "../components/SortByDropdown";
import CategoryFilter from "../components/CategoryFilter";
import RoadmapStatus from "../components/RoadmapStatus";

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
    <div className="suggestions-page">
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
        <CategoryFilter
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
        />
        <RoadmapStatus />
        {mobileSidebarIsActive && (
          <MobileSidebar
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
          />
        )}
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
          <button
            className="add-feedback-button"
            onClick={() => (window.location.href = "new-feedback")}
          >
            + Add Feedback
          </button>
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
