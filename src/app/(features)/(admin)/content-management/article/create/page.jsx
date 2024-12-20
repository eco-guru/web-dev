"use client";

import { useEffect, useState } from "react";
import Heading1 from "../../../data-master/components/heading1";
import InputSubmit from "../../../data-master/components/input/inputSubmit";
import InputText from "../../components/input/inputText";
import InputSelect from "../../components/input/inputCategory";
import { API_BASE_URL } from "@/app/const/const";
import Cookies from "js-cookie";
import Trix from "./TrixEditorComponent";

export default function CreateArticlePage() {
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

  // Hardcoded category options
  const categoryOptions = [
    { value: 1, label: "Recycling Tutorials" },
    { value: 2, label: "Waste Reduction Tips" },
    { value: 3, label: "News" },
  ];

  const fetchUser = async () => {
    try {
      const response = await fetch("/api/user/current", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      setUser(data.data.username);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setError("Could not fetch user data");
    }
  };

  const handleTitleChange = (e) => {
    setArticleData({ ...articleData, title: e.target.value });
  };

  const handleCategoryChange = (e) => {
    setArticleData({ ...articleData, categoryId: Number(e) });
  };

  const handleContentChange = (content) => {
    setArticleData({ ...articleData, content });
  };

  const handleThumbnailUrlChange = (e) => {
    setArticleData({ ...articleData, thumbnail_url: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("User not authenticated. Please log in.");
      return;
    }

    const articlePayload = {
      ...articleData,
      created_by: user, content: content
    };

    console.log(articlePayload);

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${API_BASE_URL}/article/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("token"),
        },
        body: JSON.stringify(articlePayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Failed to create article.");
        return;
      }

      const result = await response.json();
      setSuccess("Article created successfully!");
      setArticleData({
        title: "",
        categoryId: "", // Reset categoryId
        content: "",
        thumbnail_url: "",
        isPublished: true,
        created_by: user,
        created_date: new Date().toISOString(),
        article_order: 1,
      });
    } catch (error) {
      setError("Error creating article: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <form className="px-28 py-16" onSubmit={handleSubmit}>
      <Heading1 text={"Tambahkan Artikel"} className="mb-7" />

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
          options={categoryOptions} // Use the category options
          // value={articleData.categoryId} // Controlled input for category
          onChange={handleCategoryChange} // Update category state when changed
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
        {" "}
        {/* Added margin-top here */}
        <InputSubmit
          text={isSubmitting ? "Menyimpan..." : "Simpan"}
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
}