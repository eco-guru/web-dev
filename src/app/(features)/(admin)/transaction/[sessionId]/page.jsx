"use client";

import * as React from "react";
import FormAddTransactioin from "./components/form";
import Heading1 from "../../data-master/components/heading1";
import ButtonSort from "./components/button/buttonSort";
import TableTransaction from "./components/table";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const { sessionId } = React.use(params);
  const [wasteType, setWasteType] = React.useState();
  const [isDataUpdated, setIsDataUpdated] = React.useState(false);
  const [data, setData] = React.useState({});
  const [users, setUsers] = React.useState([]);
  const router = useRouter();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const validWasteTypeData = Object.entries(data).filter(([key, value]) => value !== '' && key !== 'name');

    const response = await fetch('/api/user/current', {
      method: 'GET',
      credentials: 'include',
    });
    const dataJson = await response.json();
    const user = dataJson.data.id;

    const transactionData = validWasteTypeData.map(value => wasteType.find(v => v.type === value[0])).map((value, index) => ({
      waste_type_id: value.id,
      uom_id: value.Pricelist[0].uom_id,
      price: value.Pricelist[0].price,
      quantity: Number(validWasteTypeData[index][1]),
    }));
    
    const transaction = {
      user_id: users.find(value => value.username === data.name).id,
      transaction_date: new Date().toISOString(),
      total: transactionData.map(value => value.price * value.quantity).reduce((acc, value) => {
        acc += value;
        return acc;
      }, 0),
      approved_by: user
    };

    const transactionResponse = await fetch('/api/transaction/create', {
      method: 'POST', 
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(transaction)
    });

    const transactionJson = await transactionResponse.json();
    const transaction_id = transactionJson.data.id;

    const dataPromise = await Promise.all(transactionData.map( async value => {
      const responseTransactionData = await fetch('/api/transactionData/create', {
        method: 'POST', 
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...value,
          transaction_id: transaction_id
        })
      });
      const responseJson = await responseTransactionData.json();
      return responseJson.data;
    }));
    router.push(`/transaction/result/detail/${transaction_id}`);
    localStorage.setItem('transaction', JSON.stringify({...transaction, name: data.name}));
    
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
