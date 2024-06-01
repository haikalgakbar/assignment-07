// import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { IBook } from "@/interfaces/book";
import {
  Card,
  CardHeader,
  // CardTitle,
  // CardDescription,
  CardContent,
  // CardFooter,
  // CardAction,
} from "./ui/card";
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuItem,
// } from "./ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { bookService } from "@/services/book";

export default function Catalog() {
  // const [params, setParams] = useState<string | null>(null);

  const navigate = useNavigate();

  const query = useQuery({
    queryKey: ["catalog"],
    queryFn: bookService.getBooks,
  });

  // console.log(query.data);

  // const { q } = useParams();

  // setParams(search);

  // async function getBooks() {
  //   const response = await fetch(
  //     `${import.meta.env.VITE_BASE_API_URL}/api/v1/books`
  //   );

  //   if (!response.ok) throw new Error("Network error.");

  //   return response.json();
  // }

  // useEffect(() => {
  //   query.refetch();
  // }, [params]);

  return (
    <div className="p-2 grid grid-cols-2 gap-2">
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
            {/* <Dialog>
              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild
                  className="absolute top-1 right-1 bg-black/20 rounded-full w-7 h-7 flex items-center justify-center hover:bg-black/40 hover:cursor-pointer"
                >
                  <span className="material-symbols-rounded text-[18px] text-stone-100">
                    more_vert
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-stone-800 text-stone-100 border-none">
                  <DialogTrigger asChild>
                    <DropdownMenuItem className="hover:bg-stone-700 hover:text-stone-100 hover:cursor-pointer">
                      Edit
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DropdownMenuItem
                    onClick={() => mutation.mutate(book._id)}
                    className="hover:bg-stone-700 hover:text-stone-100 hover:cursor-pointer"
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DialogContent className="p-4 bg-stone-900 rounded-lg border-none text-stone-100">
                <DialogHeader className=" items-start">
                  <DialogTitle>Edit book</DialogTitle>
                  <DialogDescription>
                    Make changes to your book
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form
                    className="p-2"
                    // onSubmit={form.handleSubmit(() =>
                    //   mutation.mutate({ ...form.getValues() })
                    // )}
                    onSubmit={(e) => {
                      e.preventDefault();
                      console.log("submitted");
                    }}
                  >
                    <FormField
                      control={form.control}
                      name={"name"}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="I Want To Read Your Book..."
                              className="col-span-3 placeholder:text-stone-600 bg-stone-800 border-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={"desc"}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="This book is..."
                              className="col-span-3 placeholder:text-stone-600 bg-stone-800 border-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <DialogFooter className="pt-4">
                      <Button
                        className="bg-stone-800 w-full hover:bg-stone-700"
                        type="submit"
                      >
                        Submit
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog> */}
            {/* <MenuBook id={book._id as string} /> */}
          </CardHeader>
          <CardContent className="flex flex-col p-4">
            <h1 className="text-md font-semibold line-clamp-2 text-stone-100">
              {book.title}
            </h1>
            <p className="text-sm text-slate-400 line-clamp-1">{book.author}</p>
            <BookLabel qty={book.qty} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function BookLabel({ qty }: { qty: number }) {
  if (qty > 0) {
    return <span className="text-sm font-bold text-green-500">Available</span>;
  }
  return <span className="text-sm font-bold text-red-500">Not available</span>;
}
