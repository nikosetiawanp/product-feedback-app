import IconArrowLeft from "../assets/shared/icon-arrow-left.svg";
import RoadmapCard from "../components/RoadmapCard";
import { useState, useEffect } from "react";

export default function RoadmapPage() {
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

  const planned = productRequests.filter(
    (productRequest) => productRequest.status === "planned"
  );
  const inProgress = productRequests.filter(
    (productRequest) => productRequest.status === "in-progress"
  );
  const live = productRequests.filter(
    (productRequest) => productRequest.status === "live"
  );

  // console.log(live[0].comments);

  const listPlanned = planned.map((obj) => (
    <RoadmapCard
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
  const listInProgress = inProgress.map((obj) => (
    <RoadmapCard
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

  const listLive = live.map((obj) => (
    <RoadmapCard
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

  return (
    <div className="roadmap-page">
      {/* NAVBAR */}
      <nav className="roadmap-navigation">
        <div className="title-and-button">
          <button
            className="go-back"
            type="button"
            onClick={() => history.back()}
          >
            <img src={IconArrowLeft} alt="icon-arrow-left" /> &nbsp; Go back
          </button>
          <h1>Roadmap</h1>
        </div>
        <button
          className="add-feedback-button"
          onClick={() => (window.location.href = "new-feedback")}
        >
          + Add Feedback
        </button>
      </nav>
      {/* ROADMAP */}
      <section className="roadmap-container-mobile"></section>

      {/*ROADMAP TABLET & DESKTOP */}
      <section className="roadmap-container">
        {/* PLANNED */}
        <div className="planned-container">
          <div className="title-and-description">
            <h2>Planned ({planned.length})</h2>
            <p>Ideas prioritized for research</p>
          </div>
          {listPlanned}
        </div>
        {/* IN-PROGRESS */}
        <div className="in-progress-container">
          <div className="title-and-description">
            <h2>In-Progress ({inProgress.length})</h2>
            <p>Currently being developed</p>
          </div>
          {listInProgress}
        </div>
        {/* LIVE */}
        <div className="live-container">
          <div className="title-and-description">
            <h2>Live ({live.length})</h2>
            <p>Released features</p>
          </div>
          {listLive}
        </div>
      </section>
    </div>
  );
}
