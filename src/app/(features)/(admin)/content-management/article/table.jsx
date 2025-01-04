import Image from "next/image";
import Td from "../components/table/td";
import Thead from "../components/table/thead";
import { useEffect, useState } from "react";
import { fetchArticles, updateArticle, deleteArticle } from "./service/article.service";
import { convertDate } from "@/app/service/convertDate.service";
import Link from "next/link";

export default function TableArticle() {
  const [articles, setArticles] = useState(null);

  const fetchData = async () => {
    const response = await fetchArticles();
    setArticles(response);
  };

  const updateArticleData = async (id, data) => {
    const response = await updateArticle(id, data);
    console.log("response:", response);
  };

  const deleteArticleData = async (id, e) => {
    e.preventDefault();

    if (!id) {
      console.error("ID is required to delete the article.");
      return;
    }

    try {
      const response = await deleteArticle(id);
      console.log("delete response:", response);

      if (response) {
        alert("Article deleted successfully.");
        fetchData();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || 'Unknown error occurred.'}`);
      }
    } catch (error) {
      console.error("Error deleting article:", error.message);
      alert("Failed to delete article due to network or server error.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <table className="w-full table-fixed">
        <Thead />
        <tbody>
          {articles?.map((article, index) => (
            <tr key={article.id}>
              <Td>
                <Image
                  src={article.thumbnail_url}
                  alt=""
                  width={176}
                  height={114}
                />
              </Td>
              <Td>{article.title}</Td>
              <Td>{convertDate(article.created_date)}</Td>
              <Td>{article.views} Penayangan</Td>
              <Td>{article.category}</Td>
              <Td>
                <input
                  type="number"
                  min="1"
                  max={articles.length}
                  name="order"
                  id="order"
                  className="w-full px-3 py-2 rounded-[4px]"
                  value={article.article_order}
                  onChange={(e) => {
                    const updatedData = {
                      ...article,
                      article_order: e.target.value,
                    };
                    setArticles([ 
                      ...articles.filter((_, i) => i !== index), 
                      { 
                        ...article, 
                        article_order: e.target.value 
                      }
                    ]);
                    updateArticleData(article.id, updatedData);
                  }}
                />
              </Td>
              <Td>
                <div className="flex gap-4">
                  <Link href={`/content-management/article/edit/${article.id}`} className="text-blue-500 underline">
                    Edit
                  </Link>
                  <a
                    href=""
                    className="text-red-500 underline"
                    onClick={(e) => deleteArticleData(article.id, e)}
                  >
                    Hapus
                  </a>
                </div>
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
