// src/app/(ui)/user/profile/page.jsx
import ProfilePage from "./profilePage.jsx";
import { cookies } from "next/headers";

const ProfilePageWrapper = () => {
  const cookieStore = cookies();
  const userRole = cookieStore.get("user-role")?.value || "Unknown";
  console.log("user Role: ", userRole);

  return <ProfilePage userRole={userRole} />;
};

export default ProfilePageWrapper;
