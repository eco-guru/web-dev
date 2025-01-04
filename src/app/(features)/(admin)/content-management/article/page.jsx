"use client";

import { useRouter } from "next/navigation";
import Heading1 from "../../data-master/components/heading1";
import UploadButton from "../components/button";
import TableArticle from "./table";

export default function ArtikelPage() {
  const router = useRouter();
  return (
    <div>
      <Heading1 text={"Konten artikel Anda"} className="mb-7" />
      <div className="flex justify-end mb-4">
        <UploadButton
          text={"Upload Artikel"}
          iconUrl="/img/admin/article.svg"
          onClick={(e) => {
            e.preventDefault();
            router.push("/content-management/article/create");
          }}
        />
      </div>
      <TableArticle />
    </div>
  );
}
