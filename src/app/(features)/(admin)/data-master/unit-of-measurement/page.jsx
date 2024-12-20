"use client";

import { useState } from "react";
import Heading1 from "../components/heading1";
import FormUnitOfMeasurement from "./components/form";
import TableUnitOfMeasurement from "./components/table";

export default function UnitOfMeasurementPage() {
  const [isDataUpdated, setIsDataUpdated] = useState(false);

  const handleFormSubmit = () => {
    setIsDataUpdated((prev) => !prev);
  };

  return (
    <div className="">
      <FormUnitOfMeasurement onCreated={handleFormSubmit} />
      <br />
      <br />
      <Heading1 text={"Daftar Satuan Sampah"} className="mb-7" />
      <TableUnitOfMeasurement isDataUpdated={isDataUpdated} />
    </div>
  );
}
