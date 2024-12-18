import Sidebar from "../components/layouts/Sidebar";
import AdminNavbar from "../components/layouts/admin/AdminNavbar";

export default function Layout({ children }) {
  return (
    <div>
      <AdminNavbar />
      <Sidebar />
      <div className="ml-[250px] pt-[80px]">{children}</div>
    </div>
  );
}
