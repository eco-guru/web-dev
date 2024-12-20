"use client";

import { useState, useEffect } from "react";
import FormContainer from "../../components/formContainer";
import Heading1 from "../../components/heading1";
import InputSelect from "../../components/input/inputSelect";
import InputSubmit from "../../components/input/inputSubmit";
import InputText from "../../components/input/inputText";

export default function FormWasteType({
  onFormSubmit,
  setOptionsWasteCategories,
}) {
  const [wasteCategories, setWasteCategories] = useState([]);
  const [options, setOptions] = useState([]);
  const [newWasteType, setNewWasteType] = useState("");
  const [wasteCategoryId, setWasteCategoryId] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch("/api/waste-category/getAll", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch waste category data");
      }
      const data = await response.json();
      setWasteCategories(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from reloading the page

    try {
      const response = await fetch("/api/waste-type/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wasteCategoryId, newWasteType }),
      });

      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        alert(data.message);
      } else {
        alert(data.message);
      }

      onFormSubmit();
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    const newOptions = wasteCategories.map((category) => ({
      value: category.id.toString(),
      label: category.category,
    }));
    setOptions(newOptions);
    setOptionsWasteCategories(newOptions);
  }, [wasteCategories, setOptionsWasteCategories]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Heading1 text={"Daftarkan jenis sampah kamu"} />
      <div className="flex flex-col gap-6">
        <InputSelect
          label={"Kategori Sampah"}
          id={"waste-category"}
          options={options}
          onChange={setWasteCategoryId}
        />
        <InputText
          id={"waste-category"}
          label={"Jenis Sampah"}
          placeholder={"Masukan jenis sampah (contoh: botol plastik)"}
          onChange={(e) => {
            setNewWasteType(e.target.value);
          }}
        />
      </div>
      <div className="flex justify-end">
        <InputSubmit text={"Simpan"} />
      </div>
    </FormContainer>
  );
}
