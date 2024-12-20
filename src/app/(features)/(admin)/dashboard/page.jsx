import Image from "next/image";
import DataChart from "../components/dataChart";

export default function DashboardPage() {
  return (
    <div className="grid grid-rows-10 grid-cols-12 gap-x-6 gap-y-3">
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
      <div className="border row-span-5 col-span-6">
        <h1>Pemetaan sampah</h1>
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
      <div className="row-span-3 col-span-6 border-[3px] border-[#E5E9F1] px-2 py-6 rounded-lg ">
        <h1>Jumlah transaksi Terkumpul</h1>
      </div>
      <div className="row-span-5 col-span-12 border-[3px] border-[#E5E9F1] px-2 py-6 mt-8 rounded-lg ">
        <h1>Jumlah transaksi Terkumpul</h1>
      </div>
    </div>
  );
}
