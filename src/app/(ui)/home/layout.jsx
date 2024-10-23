"use client";

import React, { useState } from "react";
import { Plus_Jakarta_Sans } from "@next/font/google";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"], // Choose the needed subset
  weight: ["200", "300", "400", "500", "600", "700", "800"], // Set the font weights as required
});

const Layout = ({ children }) => {
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  const toggleConfig = () => {
    setIsConfigOpen(!isConfigOpen);
  };

  return (
    <div className={`${plusJakartaSans.className} flex h-screen bg-gray-100`}>
      {/* Sidebar */}
      <div className="w-64 bg-green-900 text-white p-6">
        <h1 className="text-2xl font-bold mb-8">EcoGuru</h1>
        <nav>
          <ul className="space-y-2">
            <li>
              <a
                href="/dashboard"
                className="block py-2 px-4 hover:bg-green-700"
              >
                Dashboard
              </a>
            </li>
            <li>
              <div
                className="py-2 px-4 hover:bg-green-700 cursor-pointer"
                onClick={toggleConfig}
              >
                Konfigurasi Data
              </div>
              {isConfigOpen && (
                <ul className="ml-4 mt-2 space-y-2">
                  <li>
                    <a
                      href="/home/kategori-sampah"
                      className="block py-1 px-4 hover:bg-green-700"
                    >
                      Kategori Sampah
                    </a>
                  </li>
                  <li>
                    <a
                      href="/home/jenis-sampah"
                      className="block py-1 px-4 hover:bg-green-700"
                    >
                      Jenis Sampah
                    </a>
                  </li>
                  <li>
                    <a
                      href="/home/unit-pengukuran"
                      className="block py-1 px-4 hover:bg-green-700"
                    >
                      Unit Pengukuran
                    </a>
                  </li>
                  <li>
                    <a
                      href="/home/harga-sampah"
                      className="block py-1 px-4 hover:bg-green-700"
                    >
                      Harga Sampah
                    </a>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <a
                href="/transaksi"
                className="block py-2 px-4 hover:bg-green-700"
              >
                Transaksi
              </a>
            </li>
            <li>
              <a
                href="/kelola-konten"
                className="block py-2 px-4 hover:bg-green-700"
              >
                Kelola Konten
              </a>
            </li>
            <li>
              <a
                href="/pengaturan"
                className="block py-2 px-4 hover:bg-green-700"
              >
                Pengaturan
              </a>
            </li>
            <li>
              <a href="/keluar" className="block py-2 px-4 hover:bg-green-700">
                Keluar
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-10">
        <header className="flex justify-end mb-8">
          <div className="flex items-center space-x-4">
            <button className="p-2 bg-white rounded-full shadow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
            <button className="p-2 bg-white rounded-full shadow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
};

export default Layout;
