"use client";

import React, { useState } from "react";
import { Theme } from "../../shared/theme.js";
import InputVersiDua from "../../components/input/input-versi-2/inputv2.jsx";

const KategoriSampah = () => {
  const [kategori, setKategori] = useState("");
  const [listKategori, setListKategori] = useState([{ nama: "Plastik" }]);

  const handleSimpan = () => {
    if (kategori.trim()) {
      setListKategori([...listKategori, { nama: kategori }]);
      setKategori("");
    }
  };

  const handleEdit = (index) => {
    const newKategori = prompt(
      "Edit Kategori Sampah:",
      listKategori[index].nama
    );
    if (newKategori) {
      const updatedList = listKategori.map((item, idx) =>
        idx === index ? { nama: newKategori } : item
      );
      setListKategori(updatedList);
    }
  };

  const handleHapus = (index) => {
    const updatedList = listKategori.filter((_, idx) => idx !== index);
    setListKategori(updatedList);
  };

  return (
    <div className="text-black p-8">
      <div className="border border-gray-300 rounded-lg p-6 bg-white shadow-md">
        <h2 className="text-[24px] font-bold mb-4">
          Daftarkan kategori sampah kamu
        </h2>
        <InputVersiDua label={"Kategori Sampah"} id="kategori">
          <input
            type="text"
            id="kategori"
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg w-full"
            placeholder="Masukan kategori sampah (contoh: plastik)"
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

      <div className="mt-8">
        <h3 className="text-[24px] font-bold mb-2">Daftar Kategori Sampah</h3>
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-green-900 text-white">
              <th className="px-4 py-2 border-l border-r">Kategori Sampah</th>
              <th className="px-4 py-2 border-l border-r">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {listKategori.map((item, index) => (
              <tr key={index} className="text-left border-b">
                <td className="px-4 py-2 border-l border-r">{item.nama}</td>
                <td className="px-4 py-2 border-l border-r">
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
                    {" "}
                    Hapus{" "}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default KategoriSampah;
