'use client';

import React, { useState } from 'react';
import InputVersiDua from '../../components/input/input-versi-2/inputv2.jsx';

const HargaSampah = () => {
  const [jenisSampah, setJenisSampah] = useState('');
  const [satuanSampah, setSatuanSampah] = useState('');
  const [hargaSampah, setHargaSampah] = useState('');
  const [daftarHarga, setDaftarHarga] = useState([
    { id: 1, jenis: 'Botol Plastik', satuan: 'Kilogram', harga: 'Rp 4.000' }
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (jenisSampah && satuanSampah && hargaSampah) {
      setDaftarHarga([...daftarHarga, {
        id: daftarHarga.length + 1,
        jenis: jenisSampah,
        satuan: satuanSampah,
        harga: `Rp ${hargaSampah}`
      }]);
      setJenisSampah('');
      setSatuanSampah('');
      setHargaSampah('');
    }
  };

  const handleDelete = (id) => {
    setDaftarHarga(daftarHarga.filter(item => item.id !== id));
  };

  return (
    <div className="text-black">
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Daftarkan harga sampah kamu</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
        <InputVersiDua label={`Jenis Sampah`} id={`jenisSampah`}>
          <select
            id="jenisSampah"
            value={jenisSampah}
            onChange={(e) => setJenisSampah(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg w-full">
            <option value="">Pilih jenis sampah kamu</option>
            <option value="Plastik">Plastik</option>
            <option value="Kertas">Kertas</option>
            <option value="Logam">Logam</option>
          </select>
        </InputVersiDua>

        <InputVersiDua label={`Satuan Sampah`} id={`satuanSampah`}>
          <select
            id="satuanSampah"
            value={satuanSampah}
            onChange={(e) => setSatuanSampah(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg w-full">
            <option value="">Pilih satuan sampah kamu</option>
            <option value="Kilogram">Kilogram</option>
            <option value="Gram">Gram</option>
            <option value="Liter">Liter</option>
          </select>
        </InputVersiDua>

        <InputVersiDua label={`Harga Sampah`} id={`hargaSampah`}>
          <input
            type="text"
            id="hargaSatuan"
            value={hargaSampah}
            onChange={(e) => setHargaSampah(e.target.value)}
            className="border border-gray-300 p-2 rounded-lg w-full"
            placeholder="Masukan harga sampah"
          />
        </InputVersiDua>
        <div className="flex w-full justify-end">
          <button type="submit" className="self-end bg-green-900 text-white px-4 py-2 rounded hover:bg-green-900">Simpan</button>
        </div>
        </form>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Daftar Harga Sampah</h2>
        <table className="w-full border border-gray-200">
          <thead>
            <tr className="bg-green-900 text-center text-white">
              <th className="p-2 border-b">Jenis Sampah</th>
              <th className="p-2 border-b">Satuan Sampah</th>
              <th className="p-2 border-b">Harga Sampah (Satuan)</th>
              <th className="p-2 border-b">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {daftarHarga.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="p-2 text-center">{item.jenis}</td>
                <td className="p-2 text-center">{item.satuan}</td>
                <td className="p-2 text-center">{item.harga}</td>
                <td className="p-2 text-center">
                  <button className="text-blue-600 hover:underline mr-2">Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:underline">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
  );
};

export default HargaSampah;