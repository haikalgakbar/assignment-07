import { useAtomValue, useAtom } from "jotai";
import { userAtom } from "@/context/user";
import { searchAtom } from "@/context/book";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "./ui/input";
import { useNavigate, useLocation } from "react-router-dom";
import React from "react";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleLogout } = useAuth();
  const user = useAtomValue(userAtom);
  const [searchQuery, setSearchQuery] = useAtom(searchAtom);

  function handleOnChange(input: React.KeyboardEvent) {
    if (input.key === "Enter") {
      searchQuery ? navigate(`?q=${searchQuery}`) : navigate("");
    }
  }

  return (
    <header className="sticky top-0 flex justify-center p-4 bg-stone-900 z-10">
      <div className="flex-1 max-w-[1440px] flex gap-4 items-center justify-between">
        <Link to={"/"}>
          <h1 className="text-xl font-mono uppercase">Library</h1>
        </Link>
        {location.pathname === "/" && (
          <Input
            placeholder="Search book"
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleOnChange}
            className="w-full bg-stone-950 border-none md:w-[300px]"
          />
        )}
        <div className="flex items-center justify-center gap-1">
          <Link to={"/login"} onClick={handleLogout}>
            <Avatar>
              <AvatarImage
                src={`${
                  import.meta.env.VITE_BASE_API_URL
                }/imgs/profile/Bonbon.svg`}
              />
              <AvatarFallback>{user?.display_name?.slice(0, 1)}</AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>
    </header>
  );
}
