"use client";

import { useState } from "react";
import Color from "../../const/color";
import TdDataMaster from "../../data-master/components/table/td";
import ThDataMaster from "../../data-master/components/table/th";
import EditModal from "./editModel";
import DetailModal from "./detail-modal";

export default function TablePencairan({ data, fetchPaymentRequest }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [itemSelected, setItemSelected] = useState("");

  const openModal = (event, item) => {
    if (event?.preventDefault) event.preventDefault();

    setItemSelected(item);
    setIsModalOpen((prev) => !prev);
  };

  const openDetailModal = (event, item) => {
    if (event?.preventDefault) event.preventDefault();

    setItemSelected(item);
    setIsDetailModalOpen((prev) => !prev);
  };

  return (
    <>
      <EditModal
        openModal={isModalOpen}
        closeModal={(event) => openModal(event, itemSelected)}
        item={itemSelected}
        fetchPaymentRequests={fetchPaymentRequest}
      />
      <DetailModal
        openModal={isDetailModalOpen}
        closeModal={(event) => openDetailModal(event, itemSelected)}
        item={itemSelected}
      />
      <table className="border-collapse table-fixed rounded-ss-lg w-full">
        <thead className="text-white text-left">
          <tr style={{ backgroundColor: Color.primary }}>
            <ThDataMaster text={"Nama nasabah"} />
            <ThDataMaster text={"Nominal Pencairan"} />
            <ThDataMaster text={"Status"} />
            <ThDataMaster text={"Aksi"} />
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.request_date}>
              <TdDataMaster>{item.user_name}</TdDataMaster>
              <TdDataMaster>Rp {item.request_amount?.toLocaleString('id-ID')}</TdDataMaster>
              <TdDataMaster>{item.confirmation_status}</TdDataMaster>
              <TdDataMaster>
                <div className="flex gap-4">
                  <a
                    href=""
                    onClick={
                      item.confirmation_status === "Selesai"
                        ? (e) => openDetailModal(e, item)
                        : (e) => openModal(e, item)
                    }
                    className="text-blue-500 underline "
                  >
                    {item.confirmation_status === "Selesai"
                      ? "Detail pencairan"
                      : "Tindak lanjuti pencairan"}
                  </a>
                </div>
              </TdDataMaster>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
