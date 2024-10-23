"use client";

import React, { useState } from "react";
import InputVersiDua from "../../components/input/input-versi-2/inputv2.jsx";

const JenisSampah = () => {
  const [jenis, setJenis] = useState("");
  const [kategori, setKategori] = useState("Plastik");
  const [listJenis, setListJenis] = useState([
    { kategori: "Plastik", jenis: "Botol Plastik" },
  ]);

  const handleSimpan = () => {
    if (kategori.trim() && jenis.trim()) {
      setListJenis([...listJenis, { kategori, jenis }]);
      setKategori("Plastik");
      setJenis("");
    }
  };

  const handleEdit = (index) => {
    const newJenis = prompt("Edit Jenis Sampah:", listJenis[index].jenis);
    if (newJenis) {
      const updatedList = listJenis.map((item, idx) =>
        idx === index ? { ...item, jenis: newJenis } : item
      );
      setListJenis(updatedList);
    }
  };

  const handleHapus = (index) => {
    const updatedList = listJenis.filter((_, idx) => idx !== index);
    setListJenis(updatedList);
  };

  return (
    <div className="text-black p-8">
      <div className="border border-gray-300 rounded-lg p-6 bg-white shadow-md mb-10">
        <h2 className="text-[24px] font-bold mb-4">
          Daftarkan kategori sampah kamu
        </h2>

        {/* Dropdown for Kategori */}
        <InputVersiDua label={`Kategori sampah`} id={`kategori`}>
          <select
            id="kategori"
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg w-full"
          >
            <option value="">Pilih jenis sampah kamu</option>
            <option value="Plastik">Plastik</option>
            <option value="Kertas">Kertas</option>
            <option value="Logam">Logam</option>
          </select>
        </InputVersiDua>
        {/* Input for Jenis Sampah */}
        <InputVersiDua label={`Jenis sampah`} id={`jenis`}>
          <input
            type="text"
            id="jenis"
            value={jenis}
            onChange={(e) => setJenis(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg w-full"
            placeholder="Masukan jenis sampah (contoh: botol)"
          />
        </InputVersiDua>

        <div className="flex justify-end">
          <button
            onClick={handleSimpan}
            className="bg-green-900 text-white px-4 py-2 rounded-lg"
          >
            Simpan
          </button>
        </div>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="bg-green-900 text-white px-4 py-2 border-b">
              Kategori Sampah
            </th>
            <th className="bg-green-900 text-white px-4 py-2 border-b">
              Jenis Sampah
            </th>
            <th className="bg-green-900 text-white px-4 py-2 border-b">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {listJenis.map((item, index) => (
            <tr key={index} className="text-center border-b">
              <td className="px-4 py-2 border">{item.kategori}</td>
              <td className="px-4 py-2 border">{item.jenis}</td>
              <td className="px-4 py-2 border">
                <button
                  onClick={() => handleEdit(index)}
                  className="text-blue-500 hover:underline mr-4"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleHapus(index)}
                  className="text-red-500 hover:underline"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JenisSampah;
