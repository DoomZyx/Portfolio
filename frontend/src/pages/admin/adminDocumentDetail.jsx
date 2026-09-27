import { useParams } from "react-router-dom";
import AdminDocumentDetail from "../../components/Admin/AdminDocumentDetail/AdminDocumentDetail";

function AdminDocumentDetailPage() {
  const { id } = useParams();
  return <AdminDocumentDetail documentId={id} />;
}

export default AdminDocumentDetailPage;
