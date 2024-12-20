"use client";

import { useState, useEffect } from "react";
import Heading1 from "../../../../data-master/components/heading1";
import InputSubmit from "../../../../data-master/components/input/inputSubmit";
import InputText from "../../../components/input/inputText";
import InputSelect from "../../../components/input/inputCategory";
import { API_BASE_URL } from "@/app/const/const";
import Cookies from "js-cookie";
import Trix from "./TrixEditorComponent";
import { updateArticle } from "../../service/article.service";
import { useParams } from "next/navigation";

export default function EditArticlePage({}) {
  const [articleData, setArticleData] = useState({
    title: "",
    categoryId: "",
    content: "",
    thumbnail_url: "",
    isPublished: true,
    created_by: "",
    created_date: new Date().toISOString(),
    article_order: 1,
  });

  const [user, setUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [content, setContent] = useState("");

  const categoryOptions = [
    { value: 1, label: "Recycling Tutorials" },
    { value: 2, label: "Waste Reduction Tips" },
    { value: 3, label: "News" },
  ];

  const params = useParams();

  const fetchArticle = async (articleId) => {
    try {
      
      const response = await fetch(`/api/article/getOne/${articleId.id}`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch waste price data");
      }
      const data = await response.json();

      console.log(data);

      setArticleData(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTitleChange = (e) => {
    setArticleData({ ...articleData, title: e.target.value });
  };

  const handleCategoryChange = (e) => {
    setArticleData({ ...articleData, categoryId: Number(e) });
  };

  const handleThumbnailUrlChange = (e) => {
    setArticleData({ ...articleData, thumbnail_url: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const articlePayload = {
      ...articleData,
      created_by: user,
      content: content,
    };

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`/api/article/update/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(articlePayload),
      });

      if (!response.ok) {
        throw new Error("Failed to update article");
      }

      const result = await response.json();
      setSuccess("Article updated successfully!");

      // Reset form setelah update
      setArticleData({
        title: "",
        categoryId: "",
        content: "",
        thumbnail_url: "",
        isPublished: true,
        created_by: user,
        created_date: new Date().toISOString(),
        article_order: 1,
      });
    } catch (error) {
      setError("Error updating article: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // fetchUser(); // Ambil data user
    if (params) {
      fetchArticle(params); // Ambil artikel berdasarkan ID jika ada
    }
  }, [params]);

  return (
    <form className="px-28 py-16" onSubmit={handleSubmit}>
      <Heading1 text={"Edit Artikel"} className="mb-7" />

      {success && <div className="mb-4 text-green-500">{success}</div>}
      {error && <div className="mb-4 text-red-500">{error}</div>}

      <div className="mb-7">
        <InputText
          label={"Judul Artikel"}
          placeholder={"Masukkan judul artikel"}
          id={"title"}
          value={articleData.title}
          onChange={handleTitleChange}
        />
      </div>

      <div className="mb-7">
        <InputSelect
          label={"Kategori Artikel"}
          options={categoryOptions}
          value={articleData.categoryId}
          onChange={handleCategoryChange}
        />
      </div>

      <div className="mb-7">
        <InputText
          label={"Thumbnail URL"}
          placeholder={"Masukkan URL thumbnail"}
          id={"thumbnail_url"}
          value={articleData.thumbnail_url}
          onChange={handleThumbnailUrlChange}
        />
      </div>

      <div className="flex justify-between items-center">
        <label htmlFor="content" className="shrink-0 font-bold">
          Isi Artikel
        </label>
        <div className="w-[70%] outline-none border border-black bg-white rounded-lg py-3 px-4 text-xl font-bold">
          <Trix
            defaultValue={articleData.content}
            onChange={(e, newValue) => setContent(newValue)}
          />
        </div>
      </div>

      <div className="flex justify-end mt-7">
        <InputSubmit
          text={isSubmitting ? "Menyimpan..." : "Simpan"}
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
}