import Navbar from "./components/Navbar";
import TopHeadlines from "./components/TopHeadlines";
import EveryThing from "./components/Everything";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NewsProvider } from "./Context/NewsContext";

function App() {
  return (
    <div>
      <NewsProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<TopHeadlines />} />
            <Route path="/everything" element={<EveryThing />} />
          </Routes>
        </Router>
      </NewsProvider>
    </div>
  );
}

export default App;
