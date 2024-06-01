import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { BookForm } from "@/components/BookForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function HomeAdmin() {
  const { handleLogout } = useAuth();
  const queryClient = new QueryClient();

  return (
    <div>
      <div>Home for admin</div>
      <Link to={"/login"} onClick={handleLogout}>
        Logout
      </Link>
      <QueryClientProvider client={queryClient}>
        <BookForm />
      </QueryClientProvider>
    </div>
  );
}
