import { Button } from "./ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { bookService } from "@/services/book";
import { IBook, IBorrowedBook } from "@/interfaces/book";
import { useAtomValue } from "jotai";
import { userAtom } from "@/context/user";
import { toast } from "sonner";

export default function BookDetail({ id }: { id: string }) {
  const userData = useAtomValue(userAtom);
  const userId = userData?.id as string;

  const query = useQuery<IBook>({
    queryKey: [`book-${id}`],
    queryFn: () => bookService.getBook(id as string),
    staleTime: 1000 * 60 * 5,
  });

  const getBorrowedBooks = useQuery<IBorrowedBook[]>({
    queryKey: ["borrowed_books"],
    queryFn: bookService.getBorrowedBooks,
  });

  const isBookReturned = getBorrowedBooks.data?.some(
    (borrowed_book) =>
      borrowed_book.book === id && borrowed_book.borrower === userData?.id
  );

  const borrowMutation = useMutation({
    mutationFn: () => bookService.borrowBook(id, userId),
    onSuccess: () => {
      getBorrowedBooks.refetch();
      query.refetch();
      toast.success("Book borrowed.", {
        action: {
          label: "Dismiss",
          onClick: () => toast.dismiss(),
        },
      });
    },
  });

  const returnMutation = useMutation({
    mutationFn: () => bookService.returnBook(id, userId),
    onSuccess: () => {
      getBorrowedBooks.refetch();
      query.refetch();
      toast.success("Book returned.", {
        action: {
          label: "Dismiss",
          onClick: () => toast.dismiss(),
        },
      });
    },
  });

  return (
    <section className="flex justify-center">
      <div className="p-4 flex flex-col md:flex-row gap-4 items-center max-w-4xl md:p-8 md:gap-8">
        <div className="flex flex-col gap-4 items-center">
          <div className="flex justify-center w-full">
            <img
              src={`${import.meta.env.VITE_BASE_API_URL}/imgs/book_cover/${
                query.data?.cover_url
              }`}
              alt="book cover"
              className="rounded-md max-w-[200px] max-h-[300px]"
            />
          </div>
          <div className="flex flex-col items-center gap-0 md:hidden">
            <h1 className="text-3xl font-semibold text-center">
              {query.data?.title}
            </h1>
            <p className="text-sm text-blue-400">{query.data?.author}</p>
          </div>
          {isBookReturned ? (
            <Button
              onClick={() => returnMutation.mutate()}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-4 w-36 md:w-full"
            >
              Returned
            </Button>
          ) : query.data?.is_available ? (
            <Button
              onClick={() => borrowMutation.mutate()}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-4 w-36 md:w-full"
            >
              Borrow
            </Button>
          ) : (
            <Button
              disabled={true}
              className="bg-blue-500 hover:bg-blue-600 px-4 py-4 w-36 md:w-full"
            >
              Unavailable
            </Button>
          )}
        </div>
        <div className="flex flex-col gap-4 md:h-full">
          <div className="hidden md:flex flex-col items-start gap-0">
            <h1 className="text-3xl font-semibold">{query.data?.title}</h1>
            <p className="text-sm text-blue-400">{query.data?.author}</p>
          </div>
          <div className="grid grid-cols-4 gap-4 w-full">
            <div className="flex w-full flex-col items-center gap-1 border border-stone-700 rounded-md p-4">
              <h2 className="text-md font-semibold text-stone-300 text-center text-wrap">
                Publish date
              </h2>
              <p className="text-stone-400 text-center w-full h-full break-words">
                {query.data?.publish_date}
              </p>
            </div>
            <div className="flex w-full flex-col items-center gap-1 border border-stone-700 rounded-md p-4">
              <h2 className="text-md font-semibold text-stone-300 text-center text-wrap">
                ISBN
              </h2>
              <p className="text-stone-400 text-center w-full h-full break-words">
                {query.data?.isbn}
              </p>
            </div>
            <div className="flex w-full flex-col items-center gap-1 border border-stone-700 rounded-md p-4">
              <h2 className="text-md font-semibold text-stone-300 text-center">
                Language
              </h2>
              <p className="text-stone-400 text-center w-full h-full break-words">
                {query.data?.language}
              </p>
            </div>
            <div className="flex w-full flex-col items-center gap-1 border border-stone-700 rounded-md p-4">
              <h2 className="text-md font-semibold text-stone-300 text-center">
                Pages
              </h2>
              <p className="text-stone-400 text-center w-full h-full break-words">
                {query.data?.pages}
              </p>
            </div>
          </div>

          <p>{query.data?.desc}</p>
        </div>
      </div>
    </section>
  );
}
