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

import { useState, useEffect } from "react";

export default function SuggestionsPage() {
  const [mobileSidebarIsActive, setMobileSidebarIsActive] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortByIsActive, setSortByIsActive] = useState(false);
  const [sortBy, setSortBy] = useState("Most Upvotes");

  const [currentUser, setCurrentUser] = useState({});
  const [productRequests, setProductRequests] = useState([
    {
      id: 0,
      title: "title",
      category: "enhancement",
      upvotes: 0,
      status: "suggestion",
      comments: [
        {
          id: 0,
          content: "content",
          user: {
            image: "image",
            name: "name",
            username: "username",
          },
        },
      ],
    },
  ]);
  useEffect(() => {
    const url = "../../data.json";
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setCurrentUser(json.currentUser);
        setProductRequests(json.productRequests);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  const suggestion = productRequests.filter(
    (productRequest) => productRequest.status === "suggestion"
  );
  const filteredSuggestion = categoryFilter
    ? suggestion.filter(
        (productRequest) => productRequest.category === `${categoryFilter}`
      )
    : suggestion;
  const sortedSuggestion = filteredSuggestion.sort((a, b) =>
    sortBy === "Most Upvotes" ? b.upvotes - a.upvotes : a.upvotes - b.upvotes
  );

  const planned = productRequests.filter(
    (productRequest) => productRequest.status === "planned"
  );
  const inProgress = productRequests.filter(
    (productRequest) => productRequest.status === "in-progress"
  );
  const live = productRequests.filter(
    (productRequest) => productRequest.status === "live"
  );
  const listSuggestion = sortedSuggestion.map((obj) => (
    <SuggestionCard
      id={obj.id}
      key={obj.id}
      title={obj.title}
      category={obj.category}
      upvotes={obj.upvotes}
      status={obj.status}
      description={obj.description}
      comments={obj.comments}
    />
  ));

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
        <RoadmapStatus
          plannedCount={planned.length}
          inProgressCount={inProgress.length}
          liveCount={live.length}
        />
        {mobileSidebarIsActive && (
          <MobileSidebar
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
          />
        )}
      </header>

      {/* CONTENT */}
      <section className="suggestions-container">
        <nav className="suggestions-bar">
          <span className="suggestions-count">
            <img
              className="suggestions-icon"
              src={IconSuggestions}
              alt="icon-suggestions"
            />
            {suggestion.length} Suggestions
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
        </nav>

        {/* SUGGESTION LIST */}
        <div className="suggestions-list">
          {listSuggestion}
          {/* {!categoryFilter ? listSuggestion : listFilteredSuggestion} */}
        </div>
      </section>
    </div>
  );
}
