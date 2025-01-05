import WasteCategoryPage from "./components/wasteCategoryPage";
import { metadata } from "@/app/layout";

export default function WasteCategory() {
  metadata.title = "Waste Category | Runtah";
  
  return (<WasteCategoryPage />);
}