"use client";

import { useState, useEffect } from "react";
import Heading1 from "../../data-master/components/heading1";
import UploadButton from "../components/button";
import UploadVideoModal from "./modal";
import TableVideo from "./table";
import { useRouter } from "next/navigation";

export default function VideoPage() {
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
      <UploadVideoModal
        openModal={isModalOpen}
        closeModal={(event) => openModal(event)}
        onSubmited={handleFormSubmit}
      />
      <div className="px-4">
        <Heading1 text={"Konten video Anda"} className="mb-7" />
        <div className="flex justify-end mb-4">
          <UploadButton
            text={"Upload video"}
            iconUrl="/img/admin/video.svg"
            onClick={openModal}
          />
        </div>
        <TableVideo isDataUpdated={isDataUpdated} />
      </div>
    </>
  );
}
