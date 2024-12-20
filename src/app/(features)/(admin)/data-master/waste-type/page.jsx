"use client";

import { useState } from "react";
import Heading1 from "../components/heading1";
import FormWasteType from "./components/form";
import TableWasteType from "./components/table";

export default function WasteTypePage() {
  const [isDataUpdated, setIsDataUpdated] = useState(false);
  const [wasteCategories, setWasteCategories] = useState([]);

  const handleFormSubmit = () => {
    setIsDataUpdated((prev) => !prev);
  };
  return (
    <div>
      <FormWasteType
        onFormSubmit={handleFormSubmit}
        setOptionsWasteCategories={setWasteCategories}
      />
      <br />
      <br />
      <Heading1 text={"Daftar Jenis Sampah"} className="mb-7" />
      <TableWasteType
        isDataUpdated={isDataUpdated}
        wasteCategories={wasteCategories}
      />
    </div>
  );
}
