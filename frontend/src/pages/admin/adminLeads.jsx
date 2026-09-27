import AdminLayout from "../../components/Admin/AdminLayout";
import AdminLeads from "../../components/Admin/AdminLeads/AdminLeads";

function AdminLeadsPage() {
  return (
    <AdminLayout
      title="Leads"
      subtitle="Recherche, filtre, edition, devis et factures depuis le pipeline."
    >
      <AdminLeads />
    </AdminLayout>
  );
}

export default AdminLeadsPage;
