// import RainbowCard from "../components/RainbowCard"
import HamburgerIcon from "../assets/shared/mobile/icon-hamburger.svg";
import CloseIcon from "../assets/shared/mobile/icon-close.svg";
import MobileSidebar from "../components/MobileSidebar";
import { useState } from "react";

export default function SuggestionsPage() {
  const [mobileSidebarIsActive, setMobileSidebarIsActive] = useState(false);
  const toggleMobileSidebar = () => {
    setMobileSidebarIsActive(!mobileSidebarIsActive);
  };
  return (
    <>
      <header className="rainbow-card">
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
      </header>
      <MobileSidebar />
      {/* <section className="sidebar-mobile">
        <div className="tags">Tags</div>
        <div className="roadmap">Roadmap</div>
      </section> */}
    </>
  );
}
