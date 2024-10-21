import { Nunito } from "@next/font/google";

const nunito = Nunito({
  subsets: ["latin"], // Pilih subset yang dibutuhkan
  weight: ["200", "300", "400", "500", "600", "700", "800"], // Atur berat font sesuai kebutuhan
});

export default function AuthLayout({ children }) {
  return <section className={`${nunito.className} flex items-center`}>{children}</section>;
}
