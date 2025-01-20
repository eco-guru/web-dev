"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import InputText from "../content-management/components/input/input";
import TextArea from "../content-management/components/input/textArea";
import InputSelect from "../content-management/components/input/inputSelect";
import InputPassword from "./components/inputPassword";
import { API_BASE_URL } from "@/app/const/const";
import { updateUser } from "./service/user.service";

const EditModal = ({ isOpen = false, userData, closeModal, onSave }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [adminRole, setAdminRole] = useState(2);  // Setel nilai default adminRole ke 2

  const roles = [
    { value: 2, label: "Admin" },
    { value: 3, label: "Waste Collector" },
    { value: 4, label: "Educator" },
  ];

  useEffect(() => {
    if (isOpen) {
      console.log(userData);
      setUsername(userData.username);
      setEmail(userData.email);
      setAdminRole(userData.role_id);
    }
  }, [isOpen]);

  const handleSave = async () => {
    const updatedData = {
      username,
      email,
      role_id: adminRole
    };

    if(password) updatedData.password = password;
    console.log(updatedData);

    try {
      const response = await updateUser(userData.username, updatedData);
      console.log("berhasil: ",response);
      if (response) {
        alert("User berhasil diperbarui!");
        onSave(response);
        closeModal();
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Terjadi kesalahan saat memperbarui user.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-1/3 bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Edit Akun Admin</h3>

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
        <InputSelect
          label={"Status Admin"}
          options={roles}
          value={adminRole}  // Menjaga nilai kategori terpilih
          onChange={(e) => { setAdminRole(e.target.value) }} // Menyimpan ID kategori yang dipilih
          placeholder={"Pilih Role Admin"} // Menampilkan placeholder jika belum ada kategori yang dipilih
          className={adminRole ? "border-gray-300" : "border-red-500"} // Menambahkan border merah jika kategori belum dipilih
        />

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
