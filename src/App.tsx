import "./App.css";
import SuggestionsPage from "./pages/SuggestionsPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/suggestions" element={<SuggestionsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
