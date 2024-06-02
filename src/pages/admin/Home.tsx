import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { BookForm } from "@/components/BookForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";

export default function HomeAdmin() {
  const { handleLogout } = useAuth();
  const queryClient = new QueryClient();

  return (
    <div className="flex flex-col max-w-[1440px] mx-auto min-h-dvh md:max-w-lg md:justify-center">
      <QueryClientProvider client={queryClient}>
        <BookForm />
        <Link
          to={"/login"}
          onClick={handleLogout}
          className="flex justify-center underline text-stone-400 hover:text-stone-500"
        >
          {" "}
          Sign out
        </Link>
        <Toaster />
      </QueryClientProvider>
    </div>
  );
}
