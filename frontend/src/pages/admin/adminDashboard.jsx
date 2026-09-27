import AdminLayout from "../../components/Admin/AdminLayout";
import AdminDashboard from "../../components/Admin/AdminDashboard/AdminDashboard";

function AdminDashboardPage() {
  return (
    <AdminLayout
      title="Dashboard"
      subtitle="Vue d'ensemble du pipeline commercial et des diagnostics reçus."
    >
      <AdminDashboard />
    </AdminLayout>
  );
}

export default AdminDashboardPage;
