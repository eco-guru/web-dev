"use client";

import { useState } from "react";
import Heading1 from "../components/heading1";
import FormWastePrice from "./components/form";
import TableWastePrice from "./components/table";

export default function WastePricePage() {
  const [isDataUpdated, setIsDataUpdated] = useState(false);
  const [wasteType, setWasteType] = useState([]);
  const [wasteUnit, setWasteUnit] = useState([]);

  const handleFormSubmit = () => {
    setIsDataUpdated((prev) => !prev);
  };
  return (
    <div>
      <FormWastePrice
        setWasteTypes={setWasteType}
        setWasteUnits={setWasteUnit}
        onFormSubmit={handleFormSubmit}
      />
      <br />
      <br />

      <Heading1 text={"Daftar harga sampah"} className="mb-7" />
      <TableWastePrice
        isDataUpdated={isDataUpdated}
        wasteTypes={wasteType}
        wasteUnits={wasteUnit}
      />
    </div>
  );
}
