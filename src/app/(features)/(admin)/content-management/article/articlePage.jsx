"use client";

import { useRouter } from "next/navigation";
import Heading1 from "../../data-master/components/heading1";
import UploadButton from "../components/button";
import TableArticle from "./table";
import { useEffect, useState } from "react";

export default function ArtikelPage() {
  const [userStatus, setUserStatus] = useState();
  const router = useRouter();
  
  const checkUser = async () => {
    const response = await fetch('/api/checkUser/auth', { method: "GET" });
    const authentication = await response.json();

    if(!authentication.login) {
      return router.push('/signin');
    } else {
      setUserStatus(authentication.user);
    }
  }
    
  useEffect(() => {
    const checkMiddleware = () => {
      if(userStatus) {
        if(userStatus === 'wastecoll') router.push('/transaction')
      } else {
        checkUser();
      }
    }
    checkMiddleware();
  }, [userStatus]);

  if(!userStatus) return <div>tunggu</div>
  else return (
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
