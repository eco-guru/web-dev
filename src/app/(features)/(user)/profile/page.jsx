import UserProfilePage from "./components/profilePage";
import { metadata } from "@/app/layout";

export default function UserProfile() {
  metadata.title = "Profil | Runtah";

  return <UserProfilePage />
}