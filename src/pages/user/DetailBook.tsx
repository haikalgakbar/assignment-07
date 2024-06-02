import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BookDetail from "@/components/BookDetail";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/sonner";

export default function DetailBook() {
  const { id } = useParams();

  const queryClient = new QueryClient();

  return (
    <>
      <Header />
      <QueryClientProvider client={queryClient}>
        <BookDetail id={id as string} />
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster />
      </QueryClientProvider>
    </>
  );
}
