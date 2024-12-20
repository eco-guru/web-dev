"use client";

import { useEffect, useState } from "react";
import FormContainer from "../../components/formContainer";
import Heading1 from "../../components/heading1";
import InputSubmit from "../../components/input/inputSubmit";
import InputText from "../../components/input/inputText";

export default function FormWasteCategory({ onCreated }) {
  const [wasteCategory, setWasteCategory] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("wasteCategory", wasteCategory);

      const response = await fetch("/api/waste-category/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(wasteCategory),
      });

      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        alert(data.message);
      } else {
        alert(data.message);
      }

      onCreated();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <FormContainer onSubmit={onSubmit}>
      <Heading1 text={"Daftarkan kategori sampah kamu"} />
      <div className="flex flex-col gap-6">
        <InputText
          id={"waste-category"}
          label={"Kategori Sampah"}
          placeholder={"Masukan kategori sampah (contoh: plastik)"}
          value={wasteCategory}
          onChange={(e) => setWasteCategory(e.target.value)}
        />
      </div>
      <div className="flex justify-end">
        <InputSubmit text={"Simpan"} />
      </div>
    </FormContainer>
  );
}
