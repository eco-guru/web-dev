"use client";

import { useEffect, useState } from "react";
import Color from "../../../const/color";
import { API_BASE_URL } from "@/app/const/const";
import EditModal from "./editModal";

export default function TableWasteCategory({ isDataUpdated }) {
  const [wasteCategory, setWasteCategory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [wasteCategorySelected, setWasteCategorySelected] = useState(null);
  const [wasteCategorySelectedId, setWasteCategorySelectedId] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/waste-category/getAll", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch waste category data");
      }
      const data = await response.json();
      setWasteCategory(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteData = async (id, e) => {
    e.preventDefault();

    if (!id) {
      console.error("ID is required to delete data.");
      return;
    }

    try {
      const response = await fetch(`/api/waste-category/delete/${id}`, {
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

  const openModal = (event, category, id) => {
    if (event?.preventDefault) event.preventDefault();

    setWasteCategorySelected(category);
    setWasteCategorySelectedId(id);
    setIsModalOpen((prev) => !prev);
  };

  useEffect(() => {
    fetchData();
  }, [isDataUpdated]);

  return (
    <>
      <EditModal
        openModal={isModalOpen}
        closeModal={(event) => openModal(event)}
        category={wasteCategorySelected}
        id={wasteCategorySelectedId}
        fetchData={fetchData}
      />
      <table className="border-collapse table-auto rounded-ss-lg w-full">
        <thead className="text-white text-left">
          <tr style={{ backgroundColor: Color.primary }}>
            <th className="py-[10px] px-3 border border-black">
              Kategori Sampah
            </th>
            <th className="py-[10px] px-3 border border-black">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {wasteCategory.map((wasteCategory) => (
            <tr key={wasteCategory.id}>
              <td className="py-[10px] px-3 border border-black">
                {wasteCategory.category}
              </td>
              <td className="py-[10px] px-3 border border-black">
                <div className="flex gap-4">
                  <a
                    href=""
                    onClick={(e) =>
                      openModal(e, wasteCategory.category, wasteCategory.id)
                    }
                    className="text-blue-500 underline "
                  >
                    Edit
                  </a>
                  <a
                    href=""
                    onClick={(e) => deleteData(wasteCategory.id, e)}
                    className="text-red-500 underline "
                  >
                    Hapus
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
