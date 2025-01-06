"use client";

import { useState, useEffect } from "react";
import Heading1 from "../../components/heading1";
import FormWastePrice from "./form";
import TableWastePrice from "./table";
import { useRouter } from "next/navigation";

export default function WastePricePage() {
  const [isDataUpdated, setIsDataUpdated] = useState(false);
  const [wasteType, setWasteType] = useState([]);
  const [wasteUnit, setWasteUnit] = useState([]);
  const [userStatus, setUserStatus] = useState();
  const router = useRouter();

  const checkUser = async () => {
    const response = await fetch('/api/checkUser/auth', { method: "GET" });
    const authentication = await response.json();

    if(!authentication.login) {
      return router.push('/signin');
    } else {
      setUserStatus(authentication.user);
    }
  }
  
  useEffect(() => {
    const checkMiddleware = () => {
      if(userStatus) {
        if(userStatus === 'educator') router.push('/content-management/article')
      } else {
        checkUser();
      }
    }
    checkMiddleware();
  }, [userStatus]);


  const handleFormSubmit = () => {
    setIsDataUpdated((prev) => !prev);
  };

  if(!userStatus) return <div>Tunggu</div>
  else return (
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
