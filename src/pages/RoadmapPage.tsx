import RoadmapCard from "../components/RoadmapCard";
import { useState, useEffect } from "react";
import IconArrowLeftWhite from "../assets/shared/icon-arrow-left-white.svg";
import ButtonAddFeedback from "../components/ButtonAddFeedback";
import { supabase } from "../client";

export default function RoadmapPage() {
  const [selectedProgress, setSelectedProgress] = useState("planned");
  const [productRequests, setProductRequests] = useState([
    {
      id: "",
      title: "",
      category: "",
      upvotes: [],
      status: "",
      description: "",
      comments: [
        {
          id: "",
          content: "",
          product_request_id: "",
        },
      ],
    },
  ]);

  // FETCH
  async function fetchProductRequest() {
    const { data, error } = await supabase
      .from("product_requests")
      .select(`*, comments (*), upvotes (*)`);

    if (data !== null) {
      setProductRequests(data);
    } else console.log(error);
  }
  useEffect(() => {
    fetchProductRequest();
  }, []);

  const planned = productRequests.filter(
    (productRequest) => productRequest.status === "Planned"
  );
  const inProgress = productRequests.filter(
    (productRequest) => productRequest.status === "In-Progress"
  );
  const live = productRequests.filter(
    (productRequest) => productRequest.status === "Live"
  );

  const listPlanned = planned.map((obj) => (
    <RoadmapCard
      id={obj.id}
      key={obj.id}
      title={obj.title}
      category={obj.category}
      upvotes={obj.upvotes.length}
      status={obj.status}
      description={obj.description}
      commentsLength={obj.comments.length}
    />
  ));
  const listInProgress = inProgress.map((obj) => (
    <RoadmapCard
      id={obj.id}
      key={obj.id}
      title={obj.title}
      category={obj.category}
      upvotes={obj.upvotes.length}
      status={obj.status}
      description={obj.description}
      commentsLength={obj.comments.length}
    />
  ));

  const listLive = live.map((obj) => (
    <RoadmapCard
      id={obj.id}
      key={obj.id}
      title={obj.title}
      category={obj.category}
      upvotes={obj.upvotes.length}
      status={obj.status}
      description={obj.description}
      commentsLength={obj.comments.length}
    />
  ));

  return (
    <div className="roadmap-page">
      {/* NAVBAR */}
      <nav className="roadmap-navigation">
        <div className="title-and-button">
          {/* <Button Go Back /> */}
          <button
            className="go-back-roadmap"
            type="button"
            onClick={() => history.back()}
          >
            <img src={IconArrowLeftWhite} alt="icon-arrow-left" /> &nbsp; Go
            back
          </button>
          <h1>Roadmap</h1>
        </div>
        <ButtonAddFeedback />
      </nav>
      {/* ROADMAP */}

      {/* NAVBAR MOBILE */}
      <div className="progress-container-mobile">
        <button
          onClick={() => setSelectedProgress("planned")}
          className={
            selectedProgress === "planned"
              ? "progress-button-active"
              : "progress-button-inactive"
          }
        >
          Planned ({planned.length})
          <div className="progress-button-accent"></div>
        </button>
        <button
          onClick={() => setSelectedProgress("in-progress")}
          className={
            selectedProgress === "in-progress"
              ? "progress-button-active"
              : "progress-button-inactive"
          }
        >
          In-Progress ({inProgress.length})
          <div className="progress-button-accent"></div>
        </button>
        <button
          onClick={() => setSelectedProgress("live")}
          className={
            selectedProgress === "live"
              ? "progress-button-active"
              : "progress-button-inactive"
          }
        >
          Live ({live.length})<div className="progress-button-accent"></div>
        </button>
      </div>
      <div className="title-and-description-mobile">
        <h2>
          {selectedProgress === "planned"
            ? `Planned (${planned.length})`
            : selectedProgress === "in-progress"
            ? `In Progress (${inProgress.length})`
            : `Live (${live.length})`}
        </h2>
        <p>
          {selectedProgress === "planned"
            ? "Ideas prioritized for research"
            : selectedProgress === "in-progress"
            ? "Currently being developed"
            : "Released features"}
        </p>
      </div>
      {/* ROADMAP CONTAINER MOBILE */}
      <section className="roadmap-container-mobile">
        {selectedProgress === "planned"
          ? listPlanned
          : selectedProgress === "in-progress"
          ? listInProgress
          : listLive}
      </section>

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
