import { Navigate, useLocation } from "react-router-dom";
import AdminLayout from "../../components/Admin/AdminLayout";
import AdminDocuments, {
  adminDocumentsSubtitle,
  adminDocumentsTitle,
} from "../../components/Admin/AdminDocuments/AdminDocuments";
import { typeFromPath } from "../../utils/adminDocuments";

function AdminDocumentsPage() {
  const { pathname } = useLocation();
  const typeFilter = typeFromPath(pathname);

  if (!typeFilter) {
    return <Navigate to="/admin/devis" replace />;
  }

  return (
    <AdminLayout
      title={adminDocumentsTitle(typeFilter)}
      subtitle={adminDocumentsSubtitle(typeFilter)}
    >
      <AdminDocuments />
    </AdminLayout>
  );
}

export default AdminDocumentsPage;
