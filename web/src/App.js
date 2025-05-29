import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import WebDesignPage from "./pages/Web_design";
import AISolutionPage from "./pages/AI_Solution";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/ai_solutions" element={<AISolutionPage />} />
        <Route path="/web_design" element={<WebDesignPage />} />
      </Routes>
    </Router>
  );
}

export default App;
