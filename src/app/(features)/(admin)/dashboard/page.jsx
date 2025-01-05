import DashboardPage from "./components/Dashboardpage";
import { metadata } from "@/app/layout";

export default function Dashboard() {
  metadata.title = "Dashboard | Runtah";
  
  return (<DashboardPage />);
}