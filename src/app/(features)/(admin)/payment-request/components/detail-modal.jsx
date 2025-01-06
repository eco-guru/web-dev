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
import { IMAGE_BASE_URL } from "@/app/const/const";

export default function DetailModal({ openModal, closeModal, item }) {
  const [open, setOpen] = useState(openModal);

  const closeModalHandler = (e) => {
    closeModal(e);
    setOpen(false);
  };

  useEffect(() => {
    setOpen(openModal);
  }, [openModal]);

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
            <form action="">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center w-full sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold text-gray-900"
                    >
                      {"Detail pencairan saldo"}
                    </DialogTitle>
                    <hr className="mt-5" />
                    <div className="mt-6">
                      <>
                        <table>
                          <tbody>
                            <tr>
                              <td>Penarikan saldo oleh</td>
                              <td className="px-2">: {item.payer_name}</td>
                            </tr>
                            <tr>
                              <td>Status</td>
                              <td className="px-2">
                                : {item.confirmation_status}
                              </td>
                            </tr>
                            <tr>
                              <td>Tanggal pengajuan</td>
                              <td className="px-2">: {item.payment_date && new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(item.payment_date))}</td>
                            </tr>
                            <tr>
                              <td>Tanggal disetujui</td>
                              <td className="px-2"> : {item.confirmation_date && new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(item.confirmation_date))}</td>
                            </tr>
                            <tr>
                              <td>Tanggal uang diterima</td>
                              <td className="px-2">: {item.payment_date && new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(item.payment_date))}</td>
                            </tr>
                            <tr>
                              <td>Nominal penukaran saldo</td>
                              <td className="px-2">: Rp {item.request_amount?.toLocaleString('id-ID')}</td>
                            </tr>
                            <tr>
                              <td>Nominal saldo yang disetujui</td>
                              <td className="px-2">: Rp {item.request_amount?.toLocaleString('id-ID')}</td>
                            </tr>
                          </tbody>
                        </table>
                        <br />
                        <label
                          htmlFor="evidence"
                          className={`border rounded-sm flex flex-col gap-4 justify-center items-center ${!item.proof_picture && "py-4 px-10" } cursor-pointer w-[320px] mx-auto`}
                        >
                          {
                            item.proof_picture 
                              ? <>
                                <img 
                                  src={`${IMAGE_BASE_URL}/proofVerificationPicture/${item.proof_picture}`}
                                  className="w-full h-full"
                                />
                              </>
                              : <>
                                <Image
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
                        />
                      </>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
