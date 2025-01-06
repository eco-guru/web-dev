"use client";
import { useState, useEffect } from "react";
import Heading1 from "../../components/heading1";
import FormWasteCategory from "./form";
import TableWasteCategory from "./table";
import { useRouter } from "next/navigation";

export default function WasteCategoryPage() {
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
    <div>
      <FormWasteCategory onCreated={handleFormSubmit} />
      <br />
      <br />

      <Heading1 text={"Daftar Kategori Sampah"} className="mb-7" />
      <TableWasteCategory isDataUpdated={isDataUpdated} />
    </div>
  );
}
