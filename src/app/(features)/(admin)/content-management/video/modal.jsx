"use client"; 

import { useEffect, useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { API_BASE_URL } from "@/app/const/const";
import Cookies from "js-cookie";
import Image from "next/image";
import InputText from "../components/input/input";
import TextArea from "../components/input/textArea";
import InputSelect from "../components/input/inputSelect";

export default function UploadVideoModal({ openModal, closeModal, updateVideoList, onSubmited }) {
  const [open, setOpen] = useState(openModal);
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState("");
  const [title, setTitle] = useState(""); // State untuk menyimpan judul video
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(0);
  const [categoryId, setCategoryId] = useState(1);  // Setel nilai default categoryId ke 1
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [uploadDate, setUploadDate] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [videoOrder, setVideoOrder] = useState(1);

  const categoryOptions = [
    { value: 1, label: "Recycling Tutorials" },
    { value: 2, label: "Waste Reduction Tips" },
    { value: 3, label: "News" },
  ];

  // Daftar video (dapat diambil dari API atau state global)
  const [videos, setVideos] = useState([]);

  const fetchUser = async () => {
    try {
      const response = await fetch("/api/user/current", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      setUsername(data.data.username);
    } catch (error) {
      console.error(error);
    }
  };

  const closeModalHandler = (e) => {
    closeModal(e);
    setOpen(false);
  };

  const getVideoId = (url) => {
    const videoIdMatch = url.match(
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return videoIdMatch ? videoIdMatch[1] : null;
  };

  const fetchVideoDetails = (videoId) => {
    if (videoId) {
      const thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      setThumbnailUrl(thumbnail);
      setDuration(0);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Pastikan token ada
    if (!token) {
      alert("You are not authenticated. Please log in first.");
      return;
    }

    // Pastikan nama pengguna sudah ada
    if (!username || username === "Unknown") {
      alert("Uploaded by is required.");
      return;
    }

    // Pastikan kategori dipilih
    if (!categoryId) {
      alert("Category is required.");
      return;
    }

    // Pastikan judul diisi
    if (!title) {
      alert("Title is required.");
      return;
    }

    const currentDate = new Date().toISOString();

    try {
      const response = await fetch(`${API_BASE_URL}/videos/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        credentials: "include",
        body: JSON.stringify({
          title, // Kirim judul video yang baru ditambahkan
          description,
          duration,
          format: "mp4",
          thumbnail_url: thumbnailUrl,
          url: youtubeUrl,
          upload_date: currentDate,
          uploaded_by: username,
          isActive,
          video_order: videoOrder,
          categoryId: categoryId,
        }),
      });

      const result = await response.json();
      console.log(result);

      if (!response.ok) {
        alert(result.message || "Failed to upload video.");
      } else {
        // Jika upload berhasil, update daftar video dengan video yang baru
        const newVideo = {
          title,
          description,
          duration,
          thumbnail_url: thumbnailUrl,
          url: youtubeUrl,
          upload_date: currentDate,
          uploaded_by: username,
          isActive,
          video_order: videoOrder,
          categoryId: categoryId,
        };
        setVideos((prevVideos) => [...prevVideos, newVideo]); // Update daftar video
        alert("Video successfully uploaded!");
        onSubmited();

        // Reset form setelah berhasil upload
        setTitle("");
        setYoutubeUrl("");
        setDescription("");
        setCategoryId(1); // Reset categoryId ke default (1)
        setThumbnailUrl("");
        setDuration(0);
        setUploadDate("");
        setIsActive(true);
        setVideoOrder(1);
      }

      // Close modal only after success
      closeModalHandler(e);
    } catch (error) {
      console.error("Error uploading video:", error);
      alert(error.message);
    }
  };

  useEffect(() => {
    const tokenFromCookies = Cookies.get("token");
    setToken(tokenFromCookies);
    console.log("Token:", tokenFromCookies);
  }, []);

  useEffect(() => {
    setOpen(openModal);
  }, [openModal]);

  useEffect(() => {
    const videoId = getVideoId(youtubeUrl);
    if (videoId) {
      fetchVideoDetails(videoId);
    }
  }, [youtubeUrl]);

  useEffect(() => {
    fetchUser();
  }, []);

  const isFormValid = username && youtubeUrl && description && categoryId && title; // Tambahkan validasi untuk judul

  const getMissingFields = () => {
    const missingFields = [];

    if (!username) missingFields.push("Nama pengguna");
    if (!title) missingFields.push("Judul video"); // Cek jika judul kosong
    if (!youtubeUrl) missingFields.push("Link video YouTube");
    if (!description) missingFields.push("Deskripsi video");
    if (!categoryId) missingFields.push("Kategori video");

    return missingFields;
  };

  const missingFields = getMissingFields();

  return (
    <Dialog open={open} onClose={closeModalHandler} className="relative z-10">
      <DialogBackdrop transition className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative w-[683px] transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl"
          >
            <form onSubmit={onSubmit} className="w-full">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center w-full sm:mt-0 sm:text-left">
                    <div className="flex justify-between items-center">
                      <DialogTitle as="h3" className="text-xl font-bold">
                        Upload Video Anda
                      </DialogTitle>
                      <Image
                        src={"/img/admin/cancel.svg"}
                        alt="Cancel"
                        width={32}
                        height={32}
                        onClick={closeModalHandler}
                        className="cursor-pointer"
                      />
                    </div>
                    <div className="mt-2">
                      {/* Tambahkan field untuk judul video */}
                      <InputText
                        label={"Judul Video"}
                        placeholder={"Masukkan judul video"}
                        id={"title"}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}  // Handle perubahan judul
                      />
                      <InputText
                        label={"Link video YouTube"}
                        placeholder={"Masukkan link video YouTube"}
                        id={"youtubeUrl"}
                        value={youtubeUrl}
                        onChange={(e) => setYoutubeUrl(e.target.value)}
                      />
                      <InputSelect
                        label={"Kategori Video"}
                        options={categoryOptions}
                        value={categoryId}  // Menjaga nilai kategori terpilih
                        onChange={setCategoryId} // Menyimpan ID kategori yang dipilih
                        placeholder={"Pilih kategori"} // Menampilkan placeholder jika belum ada kategori yang dipilih
                        className={categoryId ? "border-gray-300" : "border-red-500"} // Menambahkan border merah jika kategori belum dipilih
                      />
                      <TextArea
                        label={"Deskripsi Video"}
                        placeholder={"Masukkan deskripsi video singkat yang menjelaskan video Anda"}
                        id={"description"}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                      {thumbnailUrl && (
                        <div>
                          <h4>Thumbnail</h4>
                          <Image src={thumbnailUrl} alt="Thumbnail" width={320} height={180} />
                        </div>
                      )}
                    </div>

                    {/* Display missing fields if any */}
                    {missingFields.length > 0 && (
                      <div className="mt-4 text-red-600">
                        <p><strong>Perhatian!</strong> Anda belum mengisi:</p>
                        <ul>
                          {missingFields.map((field, index) => (
                            <li key={index}>- {field}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="submit"
                  disabled={!isFormValid}  // Pastikan semua data sudah valid
                  className="inline-flex w-full justify-center rounded-md bg-[#236152] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#236151de] sm:ml-3 sm:w-auto"
                >
                  Simpan
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
