import { useParams, useNavigate, useLoaderData } from "react-router-dom";
// import { bookService } from "@/services/book";
// import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import BookDetail from "@/components/BookDetail";
// import { IBook } from "@/interfaces/book";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function DetailBook() {
  // const navigate = useNavigate();
  const { id } = useParams();

  const queryClient = new QueryClient();

  return (
    <>
      <Header />
      <QueryClientProvider client={queryClient}>
        <BookDetail id={id as string} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
