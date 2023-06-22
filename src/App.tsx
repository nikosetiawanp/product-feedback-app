import "./App.css";
import SuggestionsPage from "./pages/SuggestionsPage";
import NewFeedbackPage from "./pages/NewFeedbackPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/suggestions" element={<SuggestionsPage />} />
        <Route path="/new-feedback" element={<NewFeedbackPage />} />
      </Routes>
    </Router>
  );
};

export default App;
