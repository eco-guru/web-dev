import Color from "../../const/color";
import DangerLink from "../../data-master/components/link/dangerLink";
import PrimaryLink from "../../data-master/components/link/primaryLink";
import TdDataMaster from "../../data-master/components/table/td";
import ThDataMaster from "../../data-master/components/table/th";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { API_BASE_URL } from "@/app/const/const";
import { formatDate } from "../service/transactionService";

export default function TableSession() {
  const [token, setToken] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionSelected, setTransactionSelected] = useState(null);
  const [transactionSelectedId, setTransactionSelectedId] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/transaction/getAll", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch transactions data");
      }
      const data = await response.json();
      console.log(data);

      setTransactions(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = (event, data, id) => {
    if (event?.preventDefault) event.preventDefault();

    setTransactionSelected(data);
    setTransactionSelectedId(id);
    setIsModalOpen((prev) => !prev);
  };

  useEffect(() => {
    const tokenValue = Cookies.get("token");
    setToken(tokenValue);
    fetchData();
  }, []);

  return (
    <table className="border-collapse table-auto rounded-ss-lg w-full">
      <thead className="text-white text-left">
        <tr style={{ backgroundColor: Color.primary }}>
          <ThDataMaster text={"Tanggal"} />
          <ThDataMaster text={"Total Berat Setoran"} />
          <ThDataMaster text={"Total Pengeluaran"} />
          <ThDataMaster text={"Aksi"} />
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.id}>
            <TdDataMaster>
              {formatDate(transaction.transaction_date)}
            </TdDataMaster>
            <TdDataMaster>10Kg</TdDataMaster>
            <TdDataMaster>{transaction.total}</TdDataMaster>
            <TdDataMaster>
              <div className="flex gap-4">
                <PrimaryLink
                  text={"Lihat"}
                  href={`/transaction/${transaction.id}`}
                />
                <PrimaryLink text={"Edit"} />
                <DangerLink text={"Hapus"} />
              </div>
            </TdDataMaster>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
