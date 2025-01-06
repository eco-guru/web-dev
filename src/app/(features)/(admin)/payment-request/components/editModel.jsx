"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Image from "next/image";
import Color from "../../const/color";

export default function EditModal({ openModal, closeModal, item, fetchPaymentRequests }) {
  const [open, setOpen] = useState(openModal);
  const [isNext, setIsNext] = useState();
  const [newRequestPayment, setNewRequestPayment] = useState(null);
  const [photo, setPhoto] = useState();

  const closeModalHandler = (e) => {
    closeModal(e);
    setOpen(false);
  };

  useEffect(() => {
    setIsNext(item.confirmation_status === "Ambil_uang");
  }, [item])

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if(isNext) {
        const response = await fetch('/api/payment-request/accept/', {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            payment_request_id: item.payment_request_id,
            ...photo
          }),
        });
      } else {
        const response = await fetch(`/api/payment-request/update/${item.payment_request_id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            payment_request_id: item.payment_request_id,
            amount: newRequestPayment,
          }),
        });

        const data = await response.json();

        alert(data.message);
      }
      fetchPaymentRequests();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setOpen(openModal);
  }, [openModal]);

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    console.log(e.target.files);
    if(file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;
        setPhoto({
          uri: base64String,
          name: file.name.split('.')[0],
          type: file.type
        });
      }
      reader.readAsDataURL(file);
    }
  }

  return (
    <Dialog open={open} onClose={closeModalHandler} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <form action="" onSubmit={onSubmit}>
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center w-full sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold text-gray-900"
                    >
                      {isNext
                        ? "Detail pencairan saldo"
                        : "Pengajuan pencairan saldo"}
                    </DialogTitle>
                    <hr className="mt-5" />
                    <div className="mt-6">
                      {isNext ? (
                        <>
                          <table>
                            <tbody>
                              <tr>
                                <td>Penarikan saldo oleh</td>
                                <td>: {item.user_name}</td>
                              </tr>
                              <tr>
                                <td>Status</td>
                                <td>: {item.confirmation_status}</td>
                              </tr>
                              <tr>
                                <td>Tanggal pengajuan</td>
                                <td>: {item.request_date && new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" }).format(new Date(item.request_date))}</td>
                              </tr>
                              <tr>
                                <td>Tanggal disetujui</td>
                                <td>: {item.confirmation_date && new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" }).format(new Date(item.confirmation_date))}</td>
                              </tr>
                              <tr>
                                <td>Nominal penukaran saldo</td>
                                <td>: Rp {item.request_amount && item.request_amount.toLocaleString("id-ID")}</td>
                              </tr>
                              <tr>
                                <td>Nominal saldo yang disetujui</td>
                                <td>: Rp {item.accepted_amount && item.accepted_amount.toLocaleString("id-ID")}</td>
                              </tr>
                            </tbody>
                          </table>
                          <br />
                          <label
                            htmlFor="evidence"
                            className={`border rounded-sm flex flex-col gap-4 justify-center items-center ${photo ? "" : "py-4 px-10"} cursor-pointer w-[320px] mx-auto`}
                          >
                            {photo && photo.uri
                              ? <>
                                <img
                                  src={photo.uri}
                                  className="w-full h-full"
                                  alt=""
                                />
                              </>
                              : <>
                                  <img
                                    src={"/img/waste-collector/camera.svg"}
                                    width={65}
                                    height={65}
                                    alt=""
                                  />
                                  <p>Lampirkan bukti pengambilan</p>
                              </>
                            }
                          </label>
                          <input
                            hidden
                            type="file"
                            name="evidence"
                            id="evidence"
                            onChange={handlePhoto}
                          />
                        </>
                      ) : (
                        <>
                          <div className="flex flex-col gap-4 items-center">
                            <Image
                              src={"/img/waste-collector/money.png"}
                              width={228}
                              height={158}
                              alt=""
                            />
                            <p className="text-center">
                              <span
                                className="font-bold"
                                style={{ color: Color.primary }}
                              >
                                {item.payer_name}
                              </span>{" "}
                              telah mengajukan pencairan saldo <br /> sebesar{" "}
                              <span
                                className="font-bold"
                                style={{ color: Color.primary }}
                              >
                                Rp {item.request_amount?.toLocaleString("id-ID")}
                              </span>
                            </p>
                          </div>
                          <br />
                          <div className="flex justify-between gap-10">
                            <label
                              className="font-bold"
                              htmlFor="request-payment"
                            >
                              Nominal Pencairan
                            </label>

                            <input
                              id="request-payment"
                              type="text"
                              placeholder="Pastikan nominal sesuai dengan dana tersedia"
                              onChange={(e) =>
                                setNewRequestPayment(e.target.value)
                              }
                              className="w-full outline-none border border-[#276561] py-[10px] px-6 rounded-lg font-bold"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={async (e) => {
                    if (isNext) {
                      onSubmit(e);
                      // closeModalHandler(e);
                      // setIsNext(false);
                    } else {
                      if (newRequestPayment) {
                        onSubmit(e);
                        setIsNext(true);
                      } else {
                        alert(
                          "Nominal pencairannyya diisi dulu!" +
                            newRequestPayment
                        );
                      }
                    }
                  }}
                  className="inline-flex w-full justify-center rounded-md bg-[#236152] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#236151de] sm:ml-3 sm:w-auto"
                >
                  Konfirmasi
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={(e) => {
                    closeModalHandler(e);
                  }}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Batal
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
