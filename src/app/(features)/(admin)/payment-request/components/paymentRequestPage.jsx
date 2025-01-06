"use client";

import { useEffect, useState } from "react";
import Heading1 from "../../data-master/components/heading1";
import TablePencairan from "./table";
import { useRouter } from "next/navigation";

export default function PencairanPage() {
  const [paymentRequests, setPaymentRequests] = useState([]);
  const [historyPaymentRequests, setHistoryPaymentRequests] = useState([]);
  const [userStatus, setUserStatus] = useState();
  const router = useRouter();
    
  const checkUser = async () => {
    const response = await fetch('/api/checkUser/auth', { method: "GET" });
    const authentication = await response.json();
    
    if(!authentication.login) {
      return router.push('/signin');
    } else {
      setUserStatus(authentication.user);
    }
  }
      
  useEffect(() => {
    const checkMiddleware = () => {
      if(userStatus) {
        if(userStatus === 'admin') router.push('/dashboard');
        else if(userStatus === 'educator') router.push('/content-management/article')
      } else {
        checkUser();
      }
    }
    checkMiddleware();
  }, [userStatus]);

  const fetchPaymentRequests = async () => {
    try {
      const response = await fetch("/api/payment-request/getAll", {
        method: "GET",
      });
      const data = await response.json();
      console.log("data:", data.data);

      if (data?.data) {
        const waitingPaymentRequests = data.data.filter(
          (item) => item.confirmation_status === "Sedang_diproses" || item.confirmation_status === "Ambil_uang"
        );

        const confirmedPaymentRequests = data.data.filter(
          (item) =>
            item.confirmation_status === "Selesai" ||
            item.confirmation_status === "Batal"
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

  if(!userStatus) return <div>Tunggu</div>
  else return (
    <div className="">
      <Heading1 text={"Daftar tunggu pencairan saldo nasabah"} className="mb-7"  />
      <TablePencairan data={paymentRequests} fetchPaymentRequest={fetchPaymentRequests} />
      <br />
      <br />
      <Heading1 text={"Riwayat pencairan saldo nasabah"} className="mb-7" />
      <TablePencairan data={historyPaymentRequests} />
    </div>
  );
}
