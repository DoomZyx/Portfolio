import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

const Homepage = lazy(() => import("./pages/homepage"));
const Projects = lazy(() => import("./components/Projects/projects"));

import ScrollToTop from "./hooks/ScrollToTop/scroll";
import "./Custom/Scrollbar/_scrollbar.scss";
import "./Custom/Cursor/_Cursor.scss";
import "./style.css";
import "./base/_base.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Suspense
        fallback={
          <div className="loader">
            <FontAwesomeIcon icon={faSpinner} spin />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/project/:id" element={<Projects />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
