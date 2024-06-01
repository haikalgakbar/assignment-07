import { useAtomValue } from "jotai";
import { userAtom } from "@/context/user";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Header() {
  const user = useAtomValue(userAtom);
  const { handleLogout } = useAuth();

  return (
    <>
      <header className="sticky top-0 flex items-center justify-between p-4 bg-stone-900 z-10">
        <div>
          <Input className="bg-stone-800 border-none" />
        </div>
        <div className="flex items-center justify-center gap-1">
          <Avatar>
            <AvatarImage
              src={`${
                import.meta.env.VITE_BASE_API_URL
              }/imgs/profile/Bonbon.svg`}
            />
            <AvatarFallback>{user?.display_name?.slice(0, 1)}</AvatarFallback>
          </Avatar>

          <Link
            to={"/login"}
            onClick={handleLogout}
            className="text-stone-100 bg-stone-500 rounded-md px-3 py-2"
          >
            Logout
          </Link>
        </div>
      </header>
    </>
  );
}
