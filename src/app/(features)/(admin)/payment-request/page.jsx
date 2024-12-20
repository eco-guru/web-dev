"use client";

import { useEffect, useState } from "react";
import Heading1 from "../data-master/components/heading1";
import TablePencairan from "./components/table";

export default function PencairanPage() {
  const [paymentRequests, setPaymentRequests] = useState([]);
  const [historyPaymentRequests, setHistoryPaymentRequests] = useState([]);

  const fetchPaymentRequests = async () => {
    try {
      const response = await fetch("/api/payment-request/getAll", {
        method: "GET",
      });
      const data = await response.json();
      console.log("data:", data.data);

      if (data?.data) {
        const waitingPaymentRequests = data.data.filter(
          (item) => item.confirmation_status === "Waiting_For_Confirmation"
        );

        const confirmedPaymentRequests = data.data.filter(
          (item) => item.confirmation_status === "Success"
        );
        setPaymentRequests(waitingPaymentRequests);
        setHistoryPaymentRequests(confirmedPaymentRequests);
      }
    } catch (error) {
      console.error("Error fetching payment requests:", error);
    }
  };

  useEffect(() => {
    fetchPaymentRequests();
  }, []);

  return (
    <div className="">
      <Heading1
        text={"Daftar tunggu pencairan saldo nasabah"}
        className="mb-7"
      />
      <TablePencairan data={paymentRequests} />
      <br />
      <br />
      <Heading1 text={"Riwayat pencairan saldo nasabah"} className="mb-7" />
      <TablePencairan data={historyPaymentRequests} />
    </div>
  );
}
