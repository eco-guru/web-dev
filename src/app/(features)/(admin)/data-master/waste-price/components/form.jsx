"use client";

import { useState, useEffect } from "react";
import FormContainer from "../../components/formContainer";
import Heading1 from "../../components/heading1";
import InputSelect from "../../components/input/inputSelect";
import InputSubmit from "../../components/input/inputSubmit";
import InputText from "../../components/input/inputText";

export default function FormWastePrice({
  onFormSubmit,
  setWasteTypes,
  setWasteUnits,
}) {
  const [wasteType, setWasteType] = useState([]);
  const [wasteUnit, setWasteUnit] = useState([]);
  const [wastePrice, setWastePrice] = useState("");
  const [wasteTypeId, setWasteTypeId] = useState(1);
  const [wasteUnitId, setWasteUnitId] = useState(2);
  const [wasteTypeOptions, setWasteTypeOptions] = useState([]);
  const [wasteUnitOptions, setWasteUnitOptions] = useState([]);

  const fetchWasteType = async () => {
    try {
      const response = await fetch("/api/waste-type/getAll", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch waste type data");
      }
      const data = await response.json();

      setWasteType(data.data);
      setWasteTypes(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchWasteUnit = async () => {
    try {
      const response = await fetch("/api/unit-of-measurement/getAll", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch waste unit data");
      }
      const data = await response.json();

      setWasteUnit(data.data);
      setWasteUnits(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/waste-price/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wasteTypeId: wasteTypeId,
          unitId: wasteUnitId,
          price: wastePrice,
        }),
      });

      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        alert(data.message);
      } else {
        if (data.message) {
          alert(data.message);
        } else {
          alert("Harga sampah berhasil ditambahkan");
        }
      }

      onFormSubmit();
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchWasteType();
    fetchWasteUnit();
  }, []);

  useEffect(() => {
    setWasteTypeOptions(
      wasteType.map((item) => ({
        value: item.id,
        label: item.type,
      }))
    );
    setWasteUnitOptions(
      wasteUnit.map((item) => ({
        value: item.id,
        label: item.unit,
      }))
    );
    // console.log("Updated wasteType:", wasteType);
    // console.log("Updated wasteUnit:", wasteUnit);
  }, [wasteType, wasteUnit]);

  return (
    <FormContainer onSubmit={onSubmit}>
      <Heading1 text={"Daftarkan harga sampah kamu"} />
      <div className="flex flex-col gap-6">
        <InputSelect
          label={"Jenis Sampah"}
          id={"waste-category"}
          options={wasteTypeOptions}
          onChange={setWasteTypeId}
        />
        <InputSelect
          disabled={true}
          id={"waste-category"}
          label={"Satuan Sampah"}
          options={wasteUnitOptions}
          onChange={setWasteUnitId}
        />
        <InputText
          id={"waste-category"}
          label={"Harga Sampah (Satuan)"}
          placeholder={"Masukan harga sampah (contoh: Rp10.000)"}
          onChange={(e) => setWastePrice(e.target.value)}
        />
      </div>
      <div className="flex justify-end">
        <InputSubmit text={"Simpan"} />
      </div>
    </FormContainer>
  );
}
