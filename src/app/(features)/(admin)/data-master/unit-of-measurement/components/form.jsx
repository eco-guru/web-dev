"use client";

import { useEffect, useState } from "react";
import FormContainer from "../../components/formContainer";
import Heading1 from "../../components/heading1";
import InputSubmit from "../../components/input/inputSubmit";
import InputText from "../../components/input/inputText";

export default function FormUnitOfMeasurement({ onCreated }) {
  const [unitOfMeasurement, setUnitOfMeasurement] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/unit-of-measurement/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ unit: unitOfMeasurement }),
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
      <Heading1 text={"Daftarkan jenis sampah kamu"} />
      <div className="flex flex-col gap-6">
        <InputText
          id={"unit-of-measurement"}
          label={"Satuan Sampah"}
          placeholder={"Masukan satuan sampah (contoh: Kilogram)"}
          value={unitOfMeasurement}
          onChange={(e) => setUnitOfMeasurement(e.target.value)}
        />
      </div>
      <div className="flex justify-end">
        <InputSubmit text={"Simpan"} />
      </div>
    </FormContainer>
  );
}
