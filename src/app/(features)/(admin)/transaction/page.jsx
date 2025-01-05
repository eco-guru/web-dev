import TransactionPage from "./components/transactionPage";
import { metadata } from "@/app/layout";

export default function Transaction() {
  metadata.title = "Transaction | Runtah";

  return <TransactionPage />
}