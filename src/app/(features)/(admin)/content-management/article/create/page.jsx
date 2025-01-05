import CreateArticlePage from "./components/createPage";
import { metadata } from "@/app/layout";

export default function CreateArticle() {
  metadata.title = "Tambah Artikel | Runtah";

  return <CreateArticlePage />
}