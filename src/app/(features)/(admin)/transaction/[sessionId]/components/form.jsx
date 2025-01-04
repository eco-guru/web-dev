"use client";

import { useState, useEffect } from "react";
import FormContainer from "../../../data-master/components/formContainer";
import { API_BASE_URL } from "@/app/const/const";
import Cookies from "js-cookie";
import Heading1 from "../../../data-master/components/heading1";
import InputSubmit from "../../../data-master/components/input/inputSubmit";
import InputText from "../../../data-master/components/input/inputText";
import Divider from "../../../components/divider";

export default function FormAddTransactioin({ onAdded, wasteType, data, setData, users, formId }) {
  const [token, setToken] = useState(null);

  return (
    <FormContainer onSubmit={onAdded}>
      <Heading1 text={"Form Tambah Transaksi"} />
      <div className="flex flex-col gap-6">
        {
          users && <InputText
          id={"nasabah"}
          label={"Nama Nasabah"}
          placeholder={"Masukan nama nasabah"}
          value={data.name}
          onChange={(e) => {
            setData({
              ...data,
              name: e.target.value
            });
          }}
          list={users.map(value => value.username)}
          formId={"users"}
        />
        }
        <Divider />
        <div
          className="flex flex-col gap-6 shrink-0"
          style={{ maxHeight: "414px", overflowY: "auto" }}
        >
          {
            wasteType.map((value, index) => (<InputText
                key={index}
                id={""}
                label={value.type}
                placeholder={"Masukan berat sampah"}
                value={data[value]}
                onChange={(e) => {
                  setData({...data, [value.type]: e.target.value});
                }}
              />))
          }
        </div>
      </div>

      <div className="flex justify-end">
        <InputSubmit text={"Simpan"} />
      </div>
    </FormContainer>
  );
}
