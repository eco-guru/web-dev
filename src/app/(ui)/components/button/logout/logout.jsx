import { useRouter } from "next/navigation";
import { logOut } from "../../../../lib/services/api/user/user-api-service.js";

export default function ButtonLogout({ className = "", token }) {
  console.log("token kuh: ", token);

  const router = useRouter();
  return (
    <button
      type="submit"
      className={`w-[320px] h-[60px] flex justify-center items-center text-white text-2xl font-bold bg-red-600 hover:bg-red-500 rounded-lg ${className}`}
      onClick={async (e) => {
        e.preventDefault();
        const response = await logOut({ token });
      }}
    >
      Logout
    </button>
  );
}
