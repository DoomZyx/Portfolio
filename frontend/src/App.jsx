import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";

const Homepage = lazy(() => import("./pages/homepage"));
const Projects = lazy(() => import("./components/Projects/projects"));
const DiagnosticHubPage = lazy(() => import("./pages/diagnosticHub"));
const DiagnosticEcommercePage = lazy(
  () => import("./pages/diagnosticEcommerce"),
);
const DiagnosticMvpPage = lazy(() => import("./pages/diagnosticMvp"));
const DiagnosticVisibilityPage = lazy(
  () => import("./pages/diagnosticVisibility"),
);
const AdminLoginPage = lazy(() => import("./pages/admin/adminLogin"));
const AdminDashboardPage = lazy(() => import("./pages/admin/adminDashboard"));
const AdminLeadsPage = lazy(() => import("./pages/admin/adminLeads"));
const AdminLeadDetailPage = lazy(() => import("./pages/admin/adminLeadDetail"));
const AdminDocumentsPage = lazy(() => import("./pages/admin/adminDocuments"));
const AdminDocumentNewPage = lazy(
  () => import("./pages/admin/adminDocumentNew"),
);
const AdminDocumentDetailPage = lazy(
  () => import("./pages/admin/adminDocumentDetail"),
);

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
      <Suspense
        fallback={
          <div className="loader">
            <FontAwesomeIcon icon={faSpinner} spin />
          </div>
        }
      >
      <ScrollToTop />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/project/:id" element={<Projects />} />
          <Route path="/diagnostic" element={<DiagnosticHubPage />} />
          <Route
            path="/diagnostic/ecommerce"
            element={<DiagnosticEcommercePage />}
          />
          <Route path="/diagnostic/mvp" element={<DiagnosticMvpPage />} />
          <Route
            path="/diagnostic/visibility"
            element={<DiagnosticVisibilityPage />}
          />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/leads" element={<AdminLeadsPage />} />
          <Route path="/admin/leads/:id" element={<AdminLeadDetailPage />} />
          <Route path="/admin/devis" element={<AdminDocumentsPage />} />
          <Route path="/admin/factures" element={<AdminDocumentsPage />} />
          <Route
            path="/admin/documents"
            element={<Navigate to="/admin/devis" replace />}
          />
          <Route
            path="/admin/documents/new"
            element={<AdminDocumentNewPage />}
          />
          <Route
            path="/admin/documents/:id"
            element={<AdminDocumentDetailPage />}
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
