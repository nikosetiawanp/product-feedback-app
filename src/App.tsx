import "./App.css";
import SuggestionsPage from "./pages/SuggestionsPage";
import NewFeedbackPage from "./pages/NewFeedbackPage";
import EditFeedbackPage from "./pages/EditFeedbackPage";
import RoadmapPage from "./pages/RoadmapPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/suggestions" element={<SuggestionsPage />} />
        <Route path="/new-feedback" element={<NewFeedbackPage />} />
        <Route path="/edit-feedback" element={<EditFeedbackPage />} />
        <Route path="/roadmap" element={<RoadmapPage />} />
      </Routes>
    </Router>
  );
};

export default App;
