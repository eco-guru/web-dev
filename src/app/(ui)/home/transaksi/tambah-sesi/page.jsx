import React from "react";
import InputVersiDua from "../../../components/input/input-versi-2/inputv2.jsx";

const TambahSesi = () => {
  return (
    <div className="text-black flex-1 p-10">
      {/* Kotak untuk seluruh form dari data nasabah hingga data berat sampah */}
      <div className="border border-gray-300 p-6 rounded mb-10">
        <h2 className="text-2xl font-bold mb-12">Masukkan data nasabah</h2>
        <form>
          <div className="grid grid-cols-1 gap-6 mb-8">
            <InputVersiDua label="Nama Nasabah" id="namaNasabah">
              <input
                type="text"
                placeholder="Masukkan nama nasabah"
                className="border border-gray-300 p-2 rounded w-full"
                id="namaNasabah"
              />
            </InputVersiDua>
          </div>

          {/* Input data berat sampah */}
          <h2 className="text-2xl font-bold mb-12">Masukkan data berat sampah</h2>
          <div className="grid grid-cols-1 gap-4 mb-6">
            {["Kantong Plastik", "Botol Plastik", "Minyak Goreng", "Gelas", "Kardus", "Kertas"].map((item) => (
              <InputVersiDua key={item} label={item} id={item}>
                <input
                  type="text"
                  placeholder={`Masukkan berat ${item}`}
                  className="border border-gray-300 p-2 rounded w-full"
                  id={item}
                />
              </InputVersiDua>
            ))}
          </div>

          {/* Button untuk menambahkan transaksi */}
          <div className="flex justify-end mb-4">
            <button type="submit" className="bg-green-900 text-white px-6 py-2 rounded">
              Tambahkan Transaksi
            </button>
          </div>
        </form>
      </div>

      {/* Daftar Transaksi Table */}
      <h2 className="text-2xl font-bold mb-6">Daftar transaksi sesi 17-10-2024</h2>
      <table className="w-full text-left table-auto border-collapse border border-gray-300">
        <thead className="bg-green-900 text-white">
          <tr>
            <th className="border border-gray-300 p-2">Nama Nasabah</th>
            <th className="border border-gray-300 p-2">Jenis Sampah</th>
            <th className="border border-gray-300 p-2">Berat Sampah</th>
            <th className="border border-gray-300 p-2">Total Harga Sampah</th>
            <th className="border border-gray-300 p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {/* Sample data */}
          {[
            { nasabah: "Euis", jenis: "Botol Plastik", berat: "2 Kilogram", harga: "Rp 5.000" },
            { nasabah: "Euis", jenis: "Kantong Plastik", berat: "1 Kilogram", harga: "Rp 5.000" },
            { nasabah: "Dadang", jenis: "Botol Plastik", berat: "2 Kilogram", harga: "Rp 5.000" },
            { nasabah: "Dudung", jenis: "Minyak Goreng", berat: "3 Liter", harga: "Rp 5.000" },
            { nasabah: "Dudung", jenis: "Kardus", berat: "5 Kilogram", harga: "Rp 5.000" },
          ].map((transaksi, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">{transaksi.nasabah}</td>
              <td className="border border-gray-300 p-2">{transaksi.jenis}</td>
              <td className="border border-gray-300 p-2">{transaksi.berat}</td>
              <td className="border border-gray-300 p-2">{transaksi.harga}</td>
              <td className="border border-gray-300 p-2">
                <button className="text-blue-500 mr-4">Edit</button>
                <button className="text-red-500">Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TambahSesi;
