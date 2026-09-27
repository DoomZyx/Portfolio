import { useParams } from "react-router-dom";
import AdminLeadDetail from "../../components/Admin/AdminLeadDetail/AdminLeadDetail";

function AdminLeadDetailPage() {
  const { id } = useParams();
  return <AdminLeadDetail leadId={id} />;
}

export default AdminLeadDetailPage;
