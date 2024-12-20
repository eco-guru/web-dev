"use client";

import { useEffect, useState } from "react";
import Color from "../../../const/color";
import Cookies from "js-cookie";
import Td from "../../../content-management/components/table/td";
import EditModal from "./editModal";

export default function TableWastePrice({
  isDataUpdated,
  wasteTypes,
  wasteUnits,
}) {
  const [pricelist, setPricelist] = useState([]);
  const [wasteTypeSelectedId, setWasteTypeSelectedId] = useState(null);
  const [wasteUnitSelectedId, setWasteUnitSelectedId] = useState(null);
  const [priceSelectedId, setPriceSelectedId] = useState(null);
  const [price, setPrice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/waste-price/getAll", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch waste price data");
      }
      const data = await response.json();

      console.log(data);

      setPricelist(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteData = async (wasteId, unitId, e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `/api/waste-price/delete/${wasteId}/${unitId}`,
        {
          method: "DELETE",
        }
      );

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

  const openModal = (e, typeId, unitId, price, id) => {
    e.preventDefault();

    setWasteTypeSelectedId(typeId);
    setWasteUnitSelectedId(unitId);
    setPrice(price);
    setPriceSelectedId(id);
    setIsModalOpen((prev) => !prev);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [isDataUpdated]);

  return (
    <>
      <EditModal
        openModal={isModalOpen}
        closeModal={(e) => setIsModalOpen(false)}
        price={price}
        id={priceSelectedId}
        typeId={wasteTypeSelectedId}
        unitId={wasteUnitSelectedId}
        wasteTypes={wasteTypes}
        wasteUnits={wasteUnits}
        fetchData={fetchData}
      />
      <table className="border-collapse table-auto rounded-ss-lg w-full">
        <thead className="text-white text-left">
          <tr style={{ backgroundColor: Color.primary }}>
            <th className="py-[10px] px-3 border border-black">Jenis Sampah</th>
            <th className="py-[10px] px-3 border border-black">
              Satuan Sampah
            </th>
            <th className="py-[10px] px-3 border border-black">
              {"Harga Sampah (Satuan)"}
            </th>
            <th className="py-[10px] px-3 border border-black">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {pricelist.map((item, index) => (
            <tr key={index}>
              <Td>
                {wasteTypes.find((type) => type.id === item.waste_type_id)
                  ?.type || "Unknown"}
              </Td>
              <Td>
                {wasteUnits.find((unit) => unit.id === item.uom_id)?.unit ||
                  "Unknown"}
              </Td>
              <Td>{item.price}</Td>
              <Td>
                <div className="flex gap-4">
                  <a
                    href=""
                    className="text-blue-500 underline "
                    onClick={(e) =>
                      openModal(
                        e,
                        item.waste_type_id,
                        item.uom_id,
                        item.price,
                        item.id
                      )
                    }
                  >
                    Edit
                  </a>
                  <a
                    href=""
                    className="text-red-500 underline "
                    onClick={(e) =>
                      deleteData(item.waste_type_id, item.uom_id, e)
                    }
                  >
                    Hapus
                  </a>
                </div>
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
