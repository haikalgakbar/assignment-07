import { Button } from "./ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { bookService } from "@/services/book";
import { useNavigate } from "react-router-dom";
import { IBook } from "@/interfaces/book";

export default function BookDetail({ id }: { id: string }) {
  const navigate = useNavigate();

  const query = useQuery<IBook>({
    queryKey: [`book-${id}`],
    queryFn: () => bookService.getBook(id as string),
    staleTime: 1000 * 60 * 5,
  });

  const mutation = useMutation({
    mutationFn: () => bookService.borrowBook(id as string, qty),
    onSuccess: () => {
      query.refetch();
    },
  });

  const qty = query.data?.qty as number;

  return (
    <div className="p-4 flex flex-col gap-4">
      <Button onClick={() => navigate(-1)} className="w-fit">
        Kembali
      </Button>
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold">{query.data?.title}</h1>
        <p className="text-sm">
          by <span className="text-blue-400">{query.data?.author}</span>
        </p>
      </div>
      <div className="flex justify-center w-full">
        <img
          src={`${import.meta.env.VITE_BASE_API_URL}/imgs/book_cover/${
            query.data?.cover_url
          }`}
          alt="book cover"
          className="rounded-md max-w-80"
        />
      </div>
      {qty > 0 ? (
        <Button onClick={() => mutation.mutate()}>Borrow</Button>
      ) : (
        <Button disabled={true} onClick={() => navigate(-1)}>
          Unavailable
        </Button>
      )}

      <p>{query.data?.desc}</p>
    </div>
  );
}
