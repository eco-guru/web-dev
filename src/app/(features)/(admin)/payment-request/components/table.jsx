"use client";

import Color from "../../const/color";
import TdDataMaster from "../../data-master/components/table/td";
import ThDataMaster from "../../data-master/components/table/th";

export default function TablePencairan({ data }) {
  return (
    <table className="border-collapse table-fixed rounded-ss-lg w-full">
      <thead className="text-white text-left">
        <tr style={{ backgroundColor: Color.primary }}>
          <ThDataMaster text={"Nama nasabah"} />
          <ThDataMaster text={"Nominal Pencairan"} />
          <ThDataMaster text={"Status"} />
          <ThDataMaster text={"Aksi"} />
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.request_date}>
            <TdDataMaster>{item.payer_name}</TdDataMaster>
            <TdDataMaster>{item.request_amount}</TdDataMaster>
            <TdDataMaster>{item.confirmation_status}</TdDataMaster>
            <TdDataMaster>
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
            </TdDataMaster>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
