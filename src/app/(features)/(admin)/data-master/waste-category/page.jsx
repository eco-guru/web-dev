"use client";
import { useState } from "react";
import Heading1 from "../components/heading1";
import FormWasteCategory from "./components/form";
import TableWasteCategory from "./components/table";

export default function WasteCategoryPage() {
  const [isDataUpdated, setIsDataUpdated] = useState(false);

  const handleFormSubmit = () => {
    setIsDataUpdated((prev) => !prev);
  };

  return (
    <div>
      <FormWasteCategory onCreated={handleFormSubmit} />
      <br />
      <br />

      <Heading1 text={"Daftar Kategori Sampah"} className="mb-7" />
      <TableWasteCategory isDataUpdated={isDataUpdated} />
    </div>
  );
}
