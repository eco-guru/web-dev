"use client";

import { useState, useEffect } from "react";
import Heading1 from "../../components/heading1";
import FormUnitOfMeasurement from "./form";
import TableUnitOfMeasurement from "./table";
import { useRouter } from "next/navigation";

export default function UnitOfMeasurementPage() {
  const [isDataUpdated, setIsDataUpdated] = useState(false);
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
        if(userStatus === 'wastecoll') router.push('/transaction')
        else if(userStatus === 'educator') router.push('/content-management/article')
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
    <div className="">
      <FormUnitOfMeasurement onCreated={handleFormSubmit} />
      <br />
      <br />
      <Heading1 text={"Daftar Satuan Sampah"} className="mb-7" />
      <TableUnitOfMeasurement isDataUpdated={isDataUpdated} />
    </div>
  );
}
