"use client"

import Image from "next/image";
import { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import DataChart from "../../components/dataChart";
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
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Okt', 'Nov', 'Des'];
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(5);
  const [totalSavings, setTotalSavings] = useState();
  const [totalWaste, setTotalWaste] = useState();
  const [totalUsers, setTotalUsers] = useState();
  const [totalTransactions, setTotalTransactions] = useState();
  const [monthlyWaste, setMonthlyWaste] = useState();
  const [wasteTypeByMonths, setWasteTypeByMonths] = useState();
  const [graphData, setGraphData] = useState();
  const [wasteTypes, setWasteTypes] = useState();
  const [topWasteTypes, setTopWasteTypes] = useState();
  const [recentTransactions, setRecentTransactions] = useState();
  const [token, setToken] = useState();

  const fetchData = async () => {
    try {
      const response = await fetch("/api/dashboard", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch transactions data");
      }
      const data = await response.json();
      console.log(data);
      setTotalSavings(data.data.total_tabungan);
      setTotalWaste(data.data.total_sampah_terkumpul);
      setTotalUsers(data.data.total_nasabah);
      setTotalTransactions(data.data.total_transaksi);
      setMonthlyWaste(data.data.jumlah_sampah_bulanan);
      setWasteTypeByMonthsSettings(data.data.jenis_sampah_per_bulan);
      setTopWasteTypes(data.data.jenis_sampah_terbanyak);
      setRecentTransactions(data.data.transaksi_terkini);
    } catch (error) {
      console.error(error);
    }
  };

  const setWasteTypeByMonthsSettings = (graphData) => {
    const wasteType = [...new Set(graphData.map(item => item.waste_type))];
    setWasteTypes(wasteType);

    const dataPerWasteType = wasteType.map(type => months.map((_, index) => {
      const data = graphData.find(item => parseInt(item.month) === index + 1 && item.waste_type === type);
      return data ? data.total_quantity : 0;
    }));
    setWasteTypeByMonths(dataPerWasteType);
    
  }

  useEffect(() => {
    makeGraph();
  },[wasteTypes, wasteTypeByMonths])

  const makeGraph = () => {
    if(wasteTypes && wasteTypeByMonths) {
      const chartData = {
        labels: months.slice(start, end + 1),
        datasets: wasteTypes.map((type, index) => ({
          label: type,
          data: wasteTypeByMonths[index].slice(start, end + 1),
          backgroundColor: ['#74B5D5', '#DDB20D', '#236152', '#965B39'][index % 5]
        })),
      };
  
      setGraphData(chartData);
    }
  }

  useEffect(() => {
    const tokenValue = Cookies.get("token");
    setToken(tokenValue);
    fetchData();
  }, []);

  if(totalSavings && totalWaste && totalUsers && totalTransactions && monthlyWaste && wasteTypeByMonths && topWasteTypes && recentTransactions && graphData)
    return (
      <div className="grid grid-rows-10 grid-cols-12 gap-x-6 gap-y-3 charts">
        <DataChart
          label={"Total Tabungan"}
          value={`Rp ${totalSavings.toLocaleString('id-ID')}`}
          icon={"/img/admin/wallet.svg"}
        />
        <DataChart
          label={"Total Sampah Terkumpul"}
          value={`${totalWaste} Kg`}
          icon={"/img/admin/bin.svg"}
        />
        <div className="row-span-5 col-span-6 border-[3px] border-[#E5E9F1] rounded-lg chart px-[28px] py-[19px]">
          <h1 className="font-bold mb-[24px] text-xl">Pemetaan sampah</h1>
          <Bar
            data={graphData}
            options={{
              plugins: { legend: { display: true } },
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
          <div className="grid grid-cols-2 items-center justify-center justify-items-center gap-y-[20px] mt-[50px]">
            {topWasteTypes.map((value, index) => {
              const color = ['#74B5D5', '#DDB20D', '#236152', '#965B39'];
              const selectedColor = color[Math.round(Math.random() * 3)];
              return ( 
                <div key={index} className={`flex flex-col rounded-xl items-center justify-center w-[144px] h-[144px] p-3`} style={{ backgroundColor: selectedColor }}>
                  <div className="text-white font-bold text-lg flex flex-col items-center justify-end gap-[23px] text-center">
                    <p>{value.total_quantity} Kg</p>
                    <p>{value.waste_type}</p>
                  </div>
                </div>
          )})}
          </div>
        </div>
        <DataChart
          label={"Total Nasabah"}
          value={totalUsers}
          icon={"/img/admin/group.svg"}
        />
        <DataChart
          label={"Total Transaksi"}
          value={totalTransactions}
          icon={"/img/admin/transaction-dark.svg"}
        />
        <div className="row-span-3 col-span-6 border-[3px] border-[#E5E9F1] px-[24px] py-[31px] rounded-lg chart">
          <h1 className="font-bold mb-[36px] text-xl">Jumlah Sampah Terkumpul</h1>
          <Line
            data={{
              labels: months.slice(start, end + 1),
              datasets: [
                {
                  label: 'Sampah Terkumpul',
                  data: monthlyWaste.filter(value => Number(value.month) - 1 >= start && Number(value.month) - 1 <= end).map(value => value.total_quantity),
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
                {
                  recentTransactions.map((value, index) => (
                    <tr key={index} className="border-b-[3px] border-b-[#E5E9F1]">
                      <td className="ps-4 py-9">
                        <div>
                          <p className="font-semibold text-lg text-black">{value.Users.username}</p>
                          <p className="font-semibold text-sm text-[#B9B9B9]">{new Date(value.transaction_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        </div>
                      </td>
                      <td>{value.TransactionData.map(data => data.WasteType.type).join(', ')}</td>
                      <td>{value.TransactionData.reduce((acc, val) => acc + val.quantity, 0)} Kilogram</td>
                      <td className="pe-4 py-9">Rp {value.total.toLocaleString('id-ID')}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
        </div>
      </div>
    );
  else
    return <div>Loading...</div>
}
