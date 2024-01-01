import Navbar from "./components/Navbar";
import TopHeadlines from "./components/TopHeadlines";
import EveryThing from "./components/Everything";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<TopHeadlines />} />
          <Route path="/everything" element={<EveryThing />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
