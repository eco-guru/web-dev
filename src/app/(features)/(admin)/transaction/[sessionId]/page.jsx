"use client";

import * as React from "react";
import FormAddTransactioin from "./components/form";
import Heading1 from "../../data-master/components/heading1";
import ButtonSort from "./components/button/buttonSort";
import TableTransaction from "./components/table";
import { fetchWasteTypes } from "../../data-master/waste-type/service/wasteType";

export default function Page({ params }) {
  const { sessionId } = React.use(params);
  const [isDataUpdated, setIsDataUpdated] = React.useState(false);
  const [wasteTypes, setWasteTypes] = React.useState([]);

  const handleFormSubmit = () => {
    setIsDataUpdated((prev) => !prev);
  };

  React.useEffect(() => {
    const getWasteTypes = async () => {
      try {
        const data = await fetchWasteTypes();
        console.log(data);
        
        setWasteTypes(data.data); 
      } catch (err) {
        setError(err.message);
      }
    };

    getWasteTypes();
  }, []);

  return (
    <div>
      <FormAddTransactioin onAdded={handleFormSubmit} wasteTypes={wasteTypes} />
      <br />
      <br />
      <div className="flex justify-between mb-5">
        <Heading1 text={"Daftar transaksi sesi  17-10-2024"} />
        <ButtonSort text={"Urutkan"} onClick={() => console.log(sessionId)} />
      </div>
      <TableTransaction isDataUpdated={isDataUpdated} sessionId={sessionId} />
    </div>
  );
}
