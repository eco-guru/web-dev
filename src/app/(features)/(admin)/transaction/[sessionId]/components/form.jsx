"use client";

import { useState, useEffect } from "react";
import FormContainer from "../../../data-master/components/formContainer";
import { API_BASE_URL } from "@/app/const/const";
import Cookies from "js-cookie";
import Heading1 from "../../../data-master/components/heading1";
import InputSubmit from "../../../data-master/components/input/inputSubmit";
import InputText from "../../../data-master/components/input/inputText";
import Divider from "../../../components/divider";
import { createTransactionData } from "../service/transactionDataService";
import { useParams } from "next/navigation";

export default function FormAddTransactioin({ onAdded, wasteTypes }) {
  const [formData, setFormData] = useState([]);
  const [nasabah, setNasabah] = useState("");

  const param = useParams();

  const handleFormSubmit = async (e, nasabah, transactionData) => {
    e.preventDefault();
    console.log("nasabah", nasabah);
    console.log("data", transactionData);
    console.log("param", param.sessionId);

    try {
      // Format array formData untuk dikirim ke API
      const formattedData = transactionData.map((item) => ({
        transaction_id: parseInt(param.sessionId), // Pastikan sessionId adalah integer
        waste_type_id: parseInt(item.waste_type_id), // Pastikan waste_type_id adalah integer
        uom_id: 2, // ID satuan, misalnya 'kg', sudah dalam bentuk integer
        quantity: parseInt(item.quantity), // Pastikan quantity dalam bentuk integer
        price: 1000, // Harga dalam bentuk integer
      }));

      const response = await createTransactionData(formattedData);

      console.log("Transaction data created successfully:", response);
      alert("Data transaksi berhasil ditambahkan!");

      setFormData([]);
      setNasabah("");
      onAdded();
    } catch (error) {
      console.error("Error submitting transaction data:", error);
      alert("Gagal menambahkan data transaksi.");
    }
  };

  return (
    <FormContainer onSubmit={(e) => handleFormSubmit(e, nasabah, formData)}>
      <Heading1 text={"Form Tambah Transaksi"} />
      <div className="flex flex-col gap-6">
        <InputText
          id={""}
          label={"Nama Nasabah"}
          placeholder={"Masukan nama nasabah"}
          value={nasabah}
          onChange={(e) => {
            setNasabah(e.target.value);
          }}
        />
        <Divider />
        <div
          className="flex flex-col gap-6 shrink-0"
          style={{ maxHeight: "414px", overflowY: "auto" }}
        >
          {wasteTypes.map((wasteType) => (
            <InputText
              key={wasteType.id}
              id={wasteType.id}
              label={wasteType.type}
              placeholder={"masukan berat sampah"}
              value={
                formData.find((item) => item.waste_type_id === wasteType.id)
                  ?.quantity || ""
              } // Ambil nilai dari formData yang sesuai dengan wasteType.id
              onChange={(e) => {
                setFormData((prev) => {
                  // Cari jika sudah ada data dengan wasteType.id ini
                  const existing = prev.find(
                    (item) => item.waste_type_id === wasteType.id
                  );
                  if (existing) {
                    // Update data jika sudah ada
                    return prev.map((item) =>
                      item.waste_type_id === wasteType.id
                        ? { ...item, quantity: e.target.value }
                        : item
                    );
                  } else {
                    // Tambahkan data baru jika belum ada
                    return [
                      ...prev,
                      { waste_type_id: wasteType.id, quantity: e.target.value },
                    ];
                  }
                });
              }}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <InputSubmit text={"Simpan"} />
      </div>
    </FormContainer>
  );
}
