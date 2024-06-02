import { useQuery } from "@tanstack/react-query";
import { IBook } from "@/interfaces/book";
import { Card, CardHeader, CardContent } from "./ui/card";
import { useNavigate } from "react-router-dom";
import { bookService } from "@/services/book";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export default function Catalog() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const query = useQuery({
    queryKey: ["catalog"],
    queryFn: () =>
      bookService.getBooks(
        searchParams.get("q") ? `?q=${searchParams.get("q")}` : ""
      ),
  });

  useEffect(() => {
    query.refetch();
  }, [searchParams]);

  return (
    <section className="flex justify-center">
      <div className="p-4 grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-6 max-w-[1440px] ">
        {query.data?.map((book: IBook) => (
          <Card
            key={book._id}
            onClick={() => navigate(`/book/${book._id}`)}
            className="shadow-none border-transparent rounded-md overflow-clip bg-stone-900 hover:cursor-pointer hover:bg-stone-800"
          >
            <CardHeader className="p-0 relative">
              <img
                src={`${import.meta.env.VITE_BASE_API_URL}/imgs/book_cover/${
                  book.cover_url
                }`}
                alt="book cover"
              />
            </CardHeader>
            <CardContent className="flex flex-col p-4">
              <h1 className="text-md font-semibold line-clamp-2 text-stone-100">
                {book.title}
              </h1>
              <p className="text-sm text-slate-400 line-clamp-1">
                {book.author}
              </p>
              {book.is_available ? (
                <span className="text-sm font-bold text-green-500">
                  Available
                </span>
              ) : (
                <span className="text-sm font-bold text-red-500">
                  Not available
                </span>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
