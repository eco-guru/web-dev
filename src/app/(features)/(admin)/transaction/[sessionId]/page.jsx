"use client";

import * as React from "react";
import FormAddTransactioin from "./components/form";
import Heading1 from "../../data-master/components/heading1";
import ButtonSort from "./components/button/buttonSort";
import TableTransaction from "./components/table";

export default function Page({ params }) {
  const { sessionId } = React.use(params);
  const [wasteType, setWasteType] = React.useState();
  const [isDataUpdated, setIsDataUpdated] = React.useState(false);
  const [data, setData] = React.useState({});
  const [users, setUsers] = React.useState([]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const validWasteTypeData = Object.entries(data).filter(([key, value]) => value !== '' && key !== 'name').map(value => ({[value[0]]: Number(value[1])}));
    const validTransactionData = 
    // const transactionData = {

    // }
    console.log(validWasteTypeData);
    setIsDataUpdated((prev) => !prev);
  };

  React.useEffect(() => {
    const getWasteType = async () => {
      const response = await fetch(`/api/waste-type/getAll`, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setWasteType(data.data);
      } else {
        console.log(response);
      }
    }
    const getUsers = async () => {
      const response = await fetch(`/api/user/getUser`, {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        const filteredData = data.data.filter(value => value.role_id === 1);
        setUsers(filteredData);
      } else {
        console.log(response);
      }
    }
    const getData = async () => {
      await getWasteType();
      await getUsers();
    }
    if(!isDataUpdated) {
      getData();
    }
  }, [isDataUpdated]);

  return (
    <div>
      {
        wasteType && users && <FormAddTransactioin onAdded={handleFormSubmit} wasteType={wasteType} data={data} setData={setData} users={users} />
      }
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
