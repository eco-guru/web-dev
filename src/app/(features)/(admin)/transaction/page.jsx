"use client";

import { useRouter } from "next/navigation";
import Heading1 from "../data-master/components/heading1";
import TableSession from "./components/table";
import CreateTransactionButton from "./components/createTransactionButton";

export default function TransactionPage() {
  const router = useRouter();
  return (
    <div>
      <Heading1 text={"Riwayat sesi transaksi"} className="mb-9" />
      <div className="flex justify-end mb-8">
        <CreateTransactionButton />
      </div>
      <TableSession />
    </div>
  );
}
