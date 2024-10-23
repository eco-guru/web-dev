'use client';

import React, { useState } from 'react';
import InputVersiDua from '../../components/input/input-versi-2/inputv2.jsx';

const UnitUkuran = () => {
  const [unitSampah, setUnitSampah] = useState('');
  const [units, setUnits] = useState([{ id: 1, name: 'Kilogram' }]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (unitSampah) {
      setUnits([...units, { id: units.length + 1, name: unitSampah }]);
      setUnitSampah('');
    }
  };

  const handleDelete = (id) => {
    setUnits(units.filter(unit => unit.id !== id));
  };

  return (
    <div className="text-black">
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Daftarkan satuan sampah kamu</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
          <InputVersiDua label={"Satuan Sampah"} id="unitSampah">
          <input
              type="text"
              id="unitSampah"
              value={unitSampah}
              onChange={(e) => setUnitSampah(e.target.value)}
              placeholder="Masukan satuan sampah (contoh: Kilogram)"
              className="w-full p-2 border rounded"
            />
        </InputVersiDua>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-green-900 text-white px-4 py-2 rounded hover:bg-green-700">Simpan</button>
          </div>
        </form>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Daftar Satuan Sampah</h2>
        <table className="border-2 border-black w-full">
          <thead>
            <tr className="bg-green-900 text-white">
              <th className="p-2 text-left">Satuan Sampah</th>
              <th className="p-2 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {units.map((unit) => (
              <tr key={unit.id} className="border-b">
                <td className="p-2 border-r-2 border-black">{unit.name}</td> {/* Border di tengah */}
                <td className="p-2">
                  <button className="text-blue-600 hover:underline mr-2">Edit</button>
                  <button onClick={() => handleDelete(unit.id)} className="text-red-600 hover:underline">Hapus</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UnitUkuran;
