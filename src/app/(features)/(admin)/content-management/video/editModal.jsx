"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import InputText from "../components/input/input";
import TextArea from "../components/input/textArea";
import InputSelect from "../components/input/inputSelect";
import { API_BASE_URL } from "@/app/const/const";
import { updateVideo } from "./service/video.service";

const EditModal = ({ isOpen = false, videoData, closeModal, onSave }) => {
  const [title, setTitle] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [videoOrder, setVideoOrder] = useState(1);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [isActive, setIsActive] = useState(true);

  const categoryOptions = [
    { value: "1", label: "Recycling Tutorials" },
    { value: "2", label: "Waste Reduction Tips" },
    { value: "3", label: "News" },
  ];

  useEffect(() => {
    if (videoData) {
      setTitle(videoData.title);
      setDescription(videoData.description);
      setCategoryId(videoData.categoryId);
      setVideoOrder(videoData.video_order);
      setThumbnailUrl(videoData.thumbnail_url);
      setIsActive(videoData.isActive);
      setYoutubeUrl(videoData.url);
    }
  }, [videoData]);

  const handleSave = async () => {
    const updatedData = {
      title,
      description,
      categoryId,
      video_order: videoOrder,
      thumbnail_url: thumbnailUrl,
      url: youtubeUrl,
      isActive,
    };

    try {
      const response = await updateVideo(videoData.id, updatedData);
      if (response) {
        alert("Video berhasil diperbarui!");
        onSave(response);
        closeModal();
      }
    } catch (error) {
      console.error("Error updating video:", error);
      alert("Terjadi kesalahan saat memperbarui video.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-1/3 bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Edit Video</h3>

        <InputText
          label={"Judul Video"}
          placeholder={"Masukkan judul video"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <InputText
          label={"Link Video YouTube"}
          placeholder={"Masukkan link video YouTube"}
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
        />

        <TextArea
          label={"Deskripsi Video"}
          placeholder={"Masukkan deskripsi video"}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <InputSelect
          label={"Kategori Video"}
          options={categoryOptions}
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        />

        <div className="mt-2">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="form-checkbox"
            />
            <span className="ml-2">Aktif</span>
          </label>
        </div>

        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="button"
            className="inline-flex w-full justify-center rounded-md bg-[#236152] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#236151de] sm:ml-3 sm:w-auto"
            onClick={handleSave}
          >
            Simpan Perubahan
          </button>

          <button
            type="button"
            className="inline-flex w-full justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:mt-0 sm:w-auto"
            onClick={closeModal}
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
