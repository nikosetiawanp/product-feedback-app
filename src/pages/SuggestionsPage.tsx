import HamburgerIcon from "../assets/shared/mobile/icon-hamburger.svg";
// components
import MobileSidebar from "../components/MobileSidebar";
import SuggestionCard from "../components/SuggestionCard";
import SortByDropdown from "../components/SortByDropdown";
import CategoryFilter from "../components/CategoryFilter";
import RoadmapStatus from "../components/RoadmapStatus";
import ButtonAddFeedback from "../components/ButtonAddFeedback";
import NoFeedback from "../components/NoFeedback";

// icons
import CloseIcon from "../assets/shared/mobile/icon-close.svg";
import IconSuggestions from "../assets/suggestions/icon-suggestions.svg";
import IconArrowDown from "../assets/shared/icon-arrow-down.svg";
import IconArrowUp from "../assets/shared/icon-arrow-up.svg";
import { useState, useEffect } from "react";
import { supabase } from "../client";

export default function SuggestionsPage() {
  const [mobileSidebarIsActive, setMobileSidebarIsActive] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortByIsActive, setSortByIsActive] = useState(false);
  const [sortBy, setSortBy] = useState("Most Upvotes");
  const [currentUser, setCurrentUser] = useState({});
  const [productRequests, setProductRequests] = useState([
    {
      id: 0,
      title: "",
      category: "",
      upvotes: 0,
      status: "",
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

  // FETCH
  async function fetchProductRequest() {
    let { data, error } = await supabase.from("product_requests").select("*");
    console.log(data);

    setProductRequests(data);
  }
  useEffect(() => {
    fetchProductRequest();
  }, []);

  const suggestion = productRequests.filter(
    (productRequest) => productRequest.status === "Suggestion"
  );
  const filteredSuggestion = categoryFilter
    ? suggestion.filter(
        (productRequest) => productRequest.category === `${categoryFilter}`
      )
    : suggestion;
  const sortedSuggestion = filteredSuggestion.sort((a, b) =>
    sortBy === "Most Upvotes" ? b.upvotes - a.upvotes : a.upvotes - b.upvotes
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

  const planned = productRequests.filter(
    (productRequest) => productRequest.status === "Planned"
  );
  const inProgress = productRequests.filter(
    (productRequest) => productRequest.status === "In-Progress"
  );
  const live = productRequests.filter(
    (productRequest) => productRequest.status === "Live"
  );

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
          <div className="sort-by-container">
            <button className="sort-by" onClick={toggleSortBy}>
              Sort by : <b>{sortBy}</b> &nbsp;
              <img
                src={!sortByIsActive ? IconArrowDown : IconArrowUp}
                alt="icon-arrow-down"
              />
            </button>
            {sortByIsActive && (
              <SortByDropdown
                sortBy={sortBy}
                setSortBy={setSortBy}
                sortByIsActive={sortByIsActive}
                setSortByIsActive={setSortByIsActive}
              />
            )}
          </div>
          <ButtonAddFeedback />
        </nav>

        {/* SUGGESTION LIST */}
        <div className="suggestions-list">
          {sortedSuggestion.length > 0 ? listSuggestion : <NoFeedback />}
        </div>
      </section>
    </div>
  );
}
