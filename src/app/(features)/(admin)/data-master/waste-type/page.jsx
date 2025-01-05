import WasteTypePage from "./components/wasteTypePage";
import { metadata } from "@/app/layout";

export default function WasteType() {
  metadata.title = "Waste Type | Runtah";
  
  return (<WasteTypePage />);
}