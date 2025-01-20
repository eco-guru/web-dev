"use client"; 

import { useEffect, useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import Cookies from "js-cookie";
import Image from "next/image";
import InputText from "../content-management/components/input/input";
import InputSelect from "../content-management/components/input/inputSelect";
import InputPassword from "./components/inputPassword";
import { createUser } from "./service/user.service";

export default function AddAdminModal({ openModal, closeModal, updateVideoList, onSubmited }) {
  const [open, setOpen] = useState(openModal);
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminRole, setAdminRole] = useState(2);  // Setel nilai default adminRole ke 2
  const [confirmPassword, setConfirmPassword] = useState("");

  const roles = [
    { value: 2, label: "Admin" },
    { value: 3, label: "Waste Collector" },
    { value: 4, label: "Educator" },
  ];

  const closeModalHandler = (e) => {
    closeModal(e);
    setOpen(false);
  };


  const onSubmit = async (e) => {
    e.preventDefault();

    // Pastikan token ada
    if (!token) {
      alert("You are not authenticated. Please log in first.");
      return;
    }


    try {
      const response = await createUser({ username, email, password, role_id: adminRole });

      if (!response.ok) {
        alert(result.message || "Failed to create user.");
      } else {
        alert("Admin successfully created!");
        onSubmited();

        setAdminRole(2); // Reset adminRole ke default (1)
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


  const isFormValid = username && email && password && confirmPassword && adminRole; // Tambahkan validasi untuk judul

  const getMissingFields = () => {
    const missingFields = [];

    if (!username) missingFields.push("Nama pengguna");
    if (!password) missingFields.push("Password"); // Cek jika judul kosong
    if (password !== confirmPassword) missingFields.push("Konfirmasi Password dan Password berbeda");
    if (!email) missingFields.push("Email Pengguna");
    if (!adminRole) missingFields.push("Deskripsi video");

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
                        Daftarkan Admin Anda
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
                    <div className="mt-2 flex flex-col gap-5">
                      {/* Tambahkan field untuk judul video */}
                      <InputText
                        label={"Nama Admin"}
                        placeholder={"Masukkan Nama Admin"}
                        id={"username"}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}  // Handle perubahan judul
                      />
                      <InputText
                        label={"Email Admin"}
                        placeholder={"Masukkan Email Admin"}
                        id={"email"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <InputPassword
                        label={"Password"}
                        placeholder={"Masukkan Password Akun Admin"}
                        id={"password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <InputPassword
                        label={"Konfirmasi Password"}
                        placeholder={"Masukkan Kemabali Password Akun Admin"}
                        id={"password-confirm"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <InputSelect
                        label={"Status Admin"}
                        options={roles}
                        value={adminRole}  // Menjaga nilai kategori terpilih
                        onChange={(e) => { setAdminRole(e.target.value) }} // Menyimpan ID kategori yang dipilih
                        placeholder={"Pilih Role Admin"} // Menampilkan placeholder jika belum ada kategori yang dipilih
                        className={adminRole ? "border-gray-300" : "border-red-500"} // Menambahkan border merah jika kategori belum dipilih
                      />
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
