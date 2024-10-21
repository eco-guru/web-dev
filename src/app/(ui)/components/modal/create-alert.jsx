"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

export default function CreateUserAlert({
  success = false,
  active = false,
  error = null,
  setAlert,
}) {
  const [open, setOpen] = useState(active);

  // Gunakan useEffect untuk menyinkronkan state 'open' dengan prop 'active'
  useEffect(() => {
    setOpen(active);
  }, [active]); // Efek ini akan berjalan setiap kali prop 'active' berubah

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
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
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div
                  className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${
                    success ? "bg-green-100" : "bg-red-100"
                  } sm:mx-0 sm:h-10 sm:w-10`}
                >
                  {success ? (
                    <IoMdCheckmarkCircleOutline className="h-6 w-6 text-green-600" />
                  ) : (
                    <ExclamationTriangleIcon
                      aria-hidden="true"
                      className="h-6 w-6 text-red-600"
                    />
                  )}
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    {success ? "Success Create User" : "Failed to Create User"}
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {success
                        ? "Your account has been created. Please sign in to continue."
                        : error}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <Link
                href={success ? "/signin" : "/signup"}
                type="button"
                onClick={() => {
                  setOpen(false);
                  setAlert(false);
                }}
                className={`inline-flex w-full justify-center rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto ${
                  !success
                    ? " hover:bg-red-500 bg-red-600"
                    : " hover:bg-green-500 bg-green-600"
                }`}
              >
                {success ? "SignIn" : "SignUp"}
              </Link>
              <button
                type="button"
                data-autofocus
                onClick={() => {
                  setOpen(false);
                  setAlert(false);
                }}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
