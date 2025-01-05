"use client";

import { useState } from "react";
import Heading1 from "../../data-master/components/heading1";
import UploadButton from "../components/button";
import UploadVideoModal from "./modal";
import TableVideo from "./table";

export default function VideoPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = (event) => {
    if (event?.preventDefault) event.preventDefault();

    setIsModalOpen((prev) => !prev);
  };
  const [isDataUpdated, setIsDataUpdated] = useState(false);

  const handleFormSubmit = () => {
    setIsDataUpdated((prev) => !prev);
  };

  return (
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
