import "./App.css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SuggestionsPage from "./pages/SuggestionsPage";
import NewFeedbackPage from "./pages/NewFeedbackPage";
import EditFeedbackPage from "./pages/EditFeedbackPage";
import RoadmapPage from "./pages/RoadmapPage";
import FeedbackDetailPage from "./pages/FeedbackDetailPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/suggestions" element={<SuggestionsPage />} />
        <Route path="/new-feedback" element={<NewFeedbackPage />} />
        <Route path="/edit-feedback/:id" element={<EditFeedbackPage />} />
        <Route path="/roadmap" element={<RoadmapPage />} />
        <Route path="/feedback-detail/:id" element={<FeedbackDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;

// password : nikosetiawanp
