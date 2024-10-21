import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { Nunito } from "@next/font/google";

const nunito = Nunito({
  subsets: ["latin"], // Pilih subset yang dibutuhkan
  weight: ["200", "300", "400", "500", "600", "700", "800"], // Atur berat font sesuai kebutuhan
});

export default function MainLayout({ children }) {
  return <main className={`${nunito.className}`}>{children}</main>;
}
