"use client";

import Color from "../../../const/color";
import DangerLink from "../../../data-master/components/link/dangerLink";
import PrimaryLink from "../../../data-master/components/link/primaryLink";
import TdDataMaster from "../../../data-master/components/table/td";
import ThDataMaster from "../../../data-master/components/table/th";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { API_BASE_URL } from "@/app/const/const";

export default function TableTransaction({ isDataUpdated, sessionId }) {
  const [token, setToken] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionData, setTransactionData] = useState([]);
  const [transactionDataSelected, setTransactionDataSelected] = useState(null);
  const [transactionDataSelectedId, setTransactionDataSelectedId] =
    useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/transaction/getOne/`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch transactions data");
      }
      const data = await response.json();
      console.log(data);

      setTransactionData(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = (event, data, id) => {
    if (event?.preventDefault) event.preventDefault();

    setTransactionDataSelected(data);
    setTransactionDataSelectedId(id);
    setIsModalOpen((prev) => !prev);
  };

  useEffect(() => {
    const tokenValue = Cookies.get("token");
    setToken(tokenValue);
    if (sessionId != "create") {
      fetchData();
    }
  }, [sessionId]);

  return (
    <>
      <table className="border-collapse table-auto rounded-ss-lg w-full">
        <thead className="text-white text-left">
          <tr style={{ backgroundColor: Color.primary }}>
            <ThDataMaster text={"Nama Nasabah"} />
            <ThDataMaster text={"Jenis Sampah"} />
            <ThDataMaster text={"Berat Sampah"} />
            <ThDataMaster text={"Total Harga Sampah"} />
            <ThDataMaster text={"Aksi"} />
          </tr>
        </thead>
        <tbody>
          <tr>
            <TdDataMaster>EUIS</TdDataMaster>
            <TdDataMaster>Plastik</TdDataMaster>
            <TdDataMaster>5 Kilogram</TdDataMaster>
            <TdDataMaster>Rp60.000</TdDataMaster>

            <TdDataMaster>
              <div className="flex gap-4">
                <PrimaryLink text={"Lihat"} href={"/transaction/1/detail/3"} />
                <PrimaryLink text={"Edit"} />
                <DangerLink text={"Hapus"} />
              </div>
            </TdDataMaster>
          </tr>
        </tbody>
      </table>
    </>
  );
}
