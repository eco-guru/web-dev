"use client"

import Image from "next/image";
import DataChart from "../components/dataChart";
import { Line, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export default function DashboardPage() {
  return (
    <div className="grid grid-rows-10 grid-cols-12 gap-x-6 gap-y-3 charts">
      <DataChart
        label={"Total Tabungan"}
        value={"Rp 1.000.000"}
        icon={"/img/admin/wallet.svg"}
      />
      <DataChart
        label={"Total Sampah Terkumpul"}
        value={"50 Kg"}
        icon={"/img/admin/bin.svg"}
      />
      <div className="row-span-5 col-span-6 border-[3px] border-[#E5E9F1] rounded-lg chart px-[28px] py-[19px]">
        <h1 className="font-bold mb-[24px] text-xl">Pemetaan sampah</h1>
        <Bar
          data={{
            labels: [
              'Botol Plastik',
              'Minyak Goreng',
              'Kardus',
              'Gelas Kaca',
            ],
            datasets: [
              {
                label: 'Berat (Kg)',
                data: [30, 25, 10, 6],
                backgroundColor: [
                  '#4CAF50',
                  '#FF9800',
                  '#2196F3',
                  '#FF5722',
                ],
              },
            ],
          }}
          options={{
            plugins: { legend: { display: false } },
            scales: {
              x: {
                grid: {
                  display: false
                }
              },
              y: {
                grid: {
                  display: true
                }
              }
            }
          }}
        />
      </div>
      <DataChart
        label={"Total Nasabah"}
        value={"50"}
        icon={"/img/admin/group.svg"}
      />
      <DataChart
        label={"Total Transaksi"}
        value={"10"}
        icon={"/img/admin/transaction-dark.svg"}
      />
      <div className="row-span-3 col-span-6 border-[3px] border-[#E5E9F1] px-[24px] py-[31px] rounded-lg chart">
        <h1 className="font-bold mb-[36px] text-xl">Jumlah Sampah Terkumpul</h1>
        <Line
          data={{
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
              {
                label: 'Sampah Terkumpul',
                data: [10, 20, 15, 30, 25, 40],
                fill: true,
                backgroundColor: 'rgba(46, 125, 50, 0.2)',
                borderColor: 'rgba(46, 125, 50, 1)',
              },
            ],
          }}
          options={{
            plugins: { legend: { display: false } },
            scales: {
              x: {
                grid: {
                  display: false
                }
              },
              y: {
                grid: {
                  display: false
                }
              }
            }
          }}
        />
      </div>
      <div className="row-span-5 col-span-12 border-[3px] border-[#E5E9F1] mt-8 rounded-lg h-max">
        <div className="flex border-b-[3px] border-b-[#E5E9F1] p-8 items-center justify-between">
          <div className="flex flex-row gap-4">
            <Image src="/img/admin/graph.png" width={31} height={31} alt="Graph Logo" />
            <h1 className="font-semibold text-2xl">Transaksi Terkini</h1>
          </div>
        </div>
        <table className="w-full items-center justify-center">
            <thead className="border-b-[3px] border-b-[#E5E9F1]">
              <tr className="text-start">
                <th className="ps-4 py-9 text-left">Nama Nasabah</th>
                <th className="text-left">Jenis Sampah</th>
                <th className="text-left">Berat Sampah</th>
                <th className="pe-4 py-9 text-left">Total Harga Sampah</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b-[3px] border-b-[#E5E9F1]">
                <td className="ps-4 py-9">
                  <div>
                    <p className="font-semibold text-lg text-black">Euis</p>
                    <p className="font-semibold text-sm text-[#B9B9B9]">17 October 2024</p>
                  </div>
                </td>
                <td>Botol Plastik</td>
                <td>30 Kilogram</td>
                <td className="pe-4 py-9">Rp 30,000</td>
              </tr>
              <tr className="border-b-[3px] border-b-[#E5E9F1]">
                <td className="ps-4 py-9">
                  <div>
                    <p className="font-semibold text-lg text-black">Dadang</p>
                    <p className="font-semibold text-sm text-[#B9B9B9]">16 October 2024</p>
                  </div>
                </td>
                <td>Minyak Goreng</td>
                <td>30 Kilogram</td>
                <td className="pe-4 py-9">Rp 30,000</td>
              </tr>
              <tr className="border-b-[3px] border-b-[#E5E9F1]">
                <td className="ps-4 py-9">
                  <div>
                    <p className="font-semibold text-lg text-black">Dudung</p>
                    <p className="font-semibold text-sm text-[#B9B9B9]">16 October 2024</p>
                  </div>
                </td>
                <td>Kardus</td>
                <td>30 Kilogram</td>
                <td className="pe-4 py-9">Rp 30,000</td>
              </tr>
            </tbody>
          </table>
      </div>
    </div>
  );
}
