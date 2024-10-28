"use client";

import React from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter

const Transaksi = () => {
  const router = useRouter(); // Inisialisasi useRouter

  // Fungsi untuk menghandle tombol klik
  const handleTambahSesi = () => {
    router.push('/home/transaksi/tambah-sesi'); // Redirect ke halaman yang diinginkan
  };

  return (
    <div className="text-black">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold">Riwayat Sesi Transaksi</h2>
        {/* Button untuk tambah sesi */}
        <button
          className="bg-green-800 text-white py-2 px-4 rounded-lg"
          onClick={handleTambahSesi} // Tambahkan event handler
        >
          Tambah Sesi
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-green-800 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Tanggal</th>
              <th className="py-3 px-6 text-left">Total Berat Setoran</th>
              <th className="py-3 px-6 text-left">Total Pengeluaran</th>
              <th className="py-3 px-6 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-3 px-6">15-10-2024</td>
              <td className="py-3 px-6">10 Kilogram</td>
              <td className="py-3 px-6">Rp 300.000</td>
              <td className="py-3 px-6 flex space-x-4">
                <button className="text-blue-500 hover:underline">Lihat</button>
                <button className="text-blue-500 hover:underline">Edit</button>
                <button className="text-red-500 hover:underline">Hapus</button>
              </td>
            </tr>
            <tr className="border-b">
              <td className="py-3 px-6">16-10-2024</td>
              <td className="py-3 px-6">5 Kilogram</td>
              <td className="py-3 px-6">Rp 100.000</td>
              <td className="py-3 px-6 flex space-x-4">
                <button className="text-blue-500 hover:underline">Lihat</button>
                <button className="text-blue-500 hover:underline">Edit</button>
                <button className="text-red-500 hover:underline">Hapus</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transaksi;
