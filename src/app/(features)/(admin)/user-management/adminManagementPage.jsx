"use client";

import { useState, useEffect } from "react";
import Heading1 from "../data-master/components/heading1";
import UploadButton from "../content-management/components/button";
import TableVideo from "./table";
import { useRouter } from "next/navigation";
import AddAdminModal from "./modal";

export default function AdminManagementPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
        if(userStatus === 'educator') router.push('/content-management/article')
      } else {
        checkUser();
      }
    }
    checkMiddleware();
  }, [userStatus]);

  const openModal = (event) => {
    if (event?.preventDefault) event.preventDefault();

    setIsModalOpen((prev) => !prev);
  };
  const [isDataUpdated, setIsDataUpdated] = useState(false);

  const handleFormSubmit = () => {
    setIsDataUpdated((prev) => !prev);
  };

  if(!userStatus) return <div>Tunggu</div>
  else return (
    <>
      <AddAdminModal
        openModal={isModalOpen}
        closeModal={(event) => openModal(event)}
        onSubmited={handleFormSubmit}
      />
      <div className="px-4">
        <Heading1 text={"Daftar Admin Runtah"} className="mb-7" />
        <div className="flex justify-end mb-4">
          <UploadButton
            text={"Tambah Akun"}
            iconUrl="/img/admin/user-add.svg"
            onClick={openModal}
          />
        </div>
        <TableVideo isDataUpdated={isDataUpdated} />
      </div>
    </>
  );
}
