import AdminManagementPage from "./adminManagementPage";
import { metadata } from "@/app/layout";

export default function AdminManagement() {
  metadata.title = "Kelola Admin | Runtah";

  return <AdminManagementPage />
}