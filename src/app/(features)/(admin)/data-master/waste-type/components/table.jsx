"use client";

import { useState, useEffect } from "react";
import Color from "../../../const/color";
import TdDataMaster from "../../components/table/td";
import EditModal from "./editModal";

export default function TableWasteType({ isDataUpdated, wasteCategories }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wasteType, setWasteType] = useState([]);
  const [wasteCategorySelected, setWasteCategorySelected] = useState(null);
  const [wasteTypeSelected, setWasteTypeSelected] = useState(null);
  const [wasteTypeSelectedId, setWasteTypeSelectedId] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/waste-type/getAll", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch waste type data");
      }
      const data = await response.json();
      setWasteType(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const openModal = (event, categoryId, type, id) => {
    if (event?.preventDefault) event.preventDefault();

    setWasteCategorySelected(categoryId);
    setWasteTypeSelected(type);
    setWasteTypeSelectedId(id);
    setIsModalOpen((prev) => !prev);
  };

  const deleteData = async (id, e) => {
    e.preventDefault();

    if (!id) {
      console.error("ID is required to delete data.");
      return;
    }

    try {
      const response = await fetch(`/api/waste-type/delete/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        alert(data.message);
      } else {
        alert(data.message);
      }

      fetchData();
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isDataUpdated]);

  return (
    <>
      <EditModal
        openModal={isModalOpen}
        closeModal={(e) => setIsModalOpen(false)}
        type={wasteTypeSelected}
        id={wasteTypeSelectedId}
        categoryId={wasteCategorySelected}
        wasteCategories={wasteCategories}
        fetchData={fetchData}
      />
      <table className="border-collapse table-auto rounded-ss-lg w-full">
        <thead className="text-white text-left">
          <tr style={{ backgroundColor: Color.primary }}>
            <th className="py-[10px] px-3 border border-black">
              Kategori Sampah
            </th>
            <th className="py-[10px] px-3 border border-black">Jenis Sampah</th>
            <th className="py-[10px] px-3 border border-black">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {wasteType.map((item, index) => (
            <tr key={index}>
              <TdDataMaster>{item.waste_category}</TdDataMaster>
              <TdDataMaster>{item.type}</TdDataMaster>
              <TdDataMaster>
                <div className="flex gap-4">
                  <a
                    href=""
                    className="text-blue-500 underline "
                    onClick={(e) => {
                      const wasteCategory = wasteCategories.find(
                        (category) => category.label === item.waste_category
                      );
                      const wasteCategoryId = wasteCategory
                        ? wasteCategory.value
                        : null; // Ambil ID atau null jika tidak ditemukan
                      openModal(e, wasteCategoryId, item.type, item.id);
                    }}
                  >
                    Edit
                  </a>
                  <a
                    href=""
                    className="text-red-500 underline "
                    onClick={(e) => deleteData(item.id, e)}
                  >
                    Hapus
                  </a>
                </div>
              </TdDataMaster>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
