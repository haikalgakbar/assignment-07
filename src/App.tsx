import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { Input } from "./components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./components/ui/form";
import { Button } from "./components/ui/button";
import {
  useQuery,
  useMutation,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { IBook } from "./interfaces/book";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";
import { formSchema } from "./interfaces/book";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog";
import { Label } from "./components/ui/label";
import { useState } from "react";
import { SetStateAction } from "react";
import { useNavigate, useParams } from "react-router-dom";

const queryClient = new QueryClient();

// const MenuBook = ({ id }: { id: string }) => {
//   const getBookQuery = useQuery<IBook>({
//     queryKey: [`book-${id}`],
//     queryFn: () => getBook(id),
//   });

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: "",
//       desc: "",
//       isbn: "",
//       author: "",
//       cover_img: "",
//       // name: getBookQuery.data?.name as string,
//       // desc: getBookQuery.data?.desc as string,
//       // isbn: getBookQuery.data?.isbn as string,
//       // author: getBookQuery.data?.author as string,
//       // cover_img: getBookQuery.data?.cover_img as string,
//     },
//     values: {
//       name: getBookQuery.data?.name as string,
//       desc: getBookQuery.data?.desc as string,
//       isbn: getBookQuery.data?.isbn as string,
//       author: getBookQuery.data?.author as string,
//       cover_img: getBookQuery.data?.cover_img as string,
//     },
//   });

//   const mutation = useMutation({
//     mutationFn: handleDeleteBook,
//     onSuccess: () => {
//       toast.success("Book deleted.", {
//         duration: 3000,
//         action: {
//           label: "Dismiss",
//           onClick: () => toast.dismiss(),
//         },
//       });
//       queryClient.invalidateQueries({ queryKey: ["books"] });
//     },
//   });

//   async function getBook(id: string) {
//     const response = await fetch(
//       `${import.meta.env.VITE_API_URL as string}/${id}`
//     );

//     if (!response.ok) throw new Error("Network error.");

//     return response.json();
//   }

//   async function handleDeleteBook(id: string | undefined) {
//     const response = await fetch(
//       `${import.meta.env.VITE_API_URL as string}/${id}`,
//       {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (!response.ok) throw new Error("Network error.");

//     return response.json();
//   }

//   return (
//     <Dialog>
//       <DropdownMenu>
//         <DropdownMenuTrigger
//           asChild
//           className="absolute top-1 right-1 bg-black/20 rounded-full w-7 h-7 flex items-center justify-center hover:bg-black/40 hover:cursor-pointer"
//         >
//           <span className="material-symbols-rounded text-[18px] text-stone-100">
//             more_vert
//           </span>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent className="bg-stone-800 text-stone-100 border-none">
//           <DialogTrigger asChild>
//             <DropdownMenuItem className="hover:bg-stone-700 hover:text-stone-100 hover:cursor-pointer">
//               Edit
//             </DropdownMenuItem>
//           </DialogTrigger>
//           <DropdownMenuItem
//             onClick={() => mutation.mutate(id)}
//             className="hover:bg-stone-700 hover:text-stone-100 hover:cursor-pointer"
//           >
//             Delete
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//       <DialogContent className="p-4 bg-stone-900 rounded-lg border-none text-stone-100">
//         <DialogHeader className=" items-start">
//           <DialogTitle>Edit book</DialogTitle>
//           <DialogDescription>Make changes to your book</DialogDescription>
//         </DialogHeader>
//         <Form {...form}>
//           <form
//             className="p-2"
//             // onSubmit={form.handleSubmit(() =>
//             //   mutation.mutate({ ...form.getValues() })
//             // )}
//             onSubmit={(e) => {
//               e.preventDefault();
//               console.log("submitted");
//             }}
//           >
//             {getBookQuery.data && (
//               <FormField
//                 control={form.control}
//                 name={"name"}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Name</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="I Want To Read Your Book..."
//                         className="col-span-3 placeholder:text-stone-600 bg-stone-800 border-none"
//                         {...field}
//                         // value={getBookQuery.data.name}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             )}
//             <FormField
//               control={form.control}
//               name={"desc"}
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Description</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="This book is..."
//                       className="col-span-3 placeholder:text-stone-600 bg-stone-800 border-none"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <DialogFooter className="pt-4">
//               <Button
//                 className="bg-stone-800 w-full hover:bg-stone-700"
//                 type="submit"
//               >
//                 Submit
//               </Button>
//             </DialogFooter>
//           </form>
//         </Form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// const BookCard = () => {
//   const [params, setParams] = useState<string | null>(null);

//   const query = useQuery({
//     queryKey: ["books"],
//     queryFn: getBooks,
//   });

//   const { q } = useParams();

//   console.log(q);

//   // setParams(search);

//   async function getBooks() {
//     const response = await fetch(
//       `${import.meta.env.VITE_BASE_API_URL}/api/v1/books`
//     );

//     if (!response.ok) throw new Error("Network error.");

//     return response.json();
//   }

//   // useEffect(() => {
//   //   query.refetch();
//   // }, [params]);

//   return (
//     <div className="p-2 grid grid-cols-2 gap-2">
//       {query.data?.map((book: IBook) => (
//         <Card
//           key={book._id}
//           className="shadow-none border-transparent rounded-md overflow-clip bg-stone-900"
//         >
//           <CardHeader className="p-0 relative">
//             <img src={book.cover_img as string} alt="book cover" />
//             {/* <Dialog>
//               <DropdownMenu>
//                 <DropdownMenuTrigger
//                   asChild
//                   className="absolute top-1 right-1 bg-black/20 rounded-full w-7 h-7 flex items-center justify-center hover:bg-black/40 hover:cursor-pointer"
//                 >
//                   <span className="material-symbols-rounded text-[18px] text-stone-100">
//                     more_vert
//                   </span>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent className="bg-stone-800 text-stone-100 border-none">
//                   <DialogTrigger asChild>
//                     <DropdownMenuItem className="hover:bg-stone-700 hover:text-stone-100 hover:cursor-pointer">
//                       Edit
//                     </DropdownMenuItem>
//                   </DialogTrigger>
//                   <DropdownMenuItem
//                     onClick={() => mutation.mutate(book._id)}
//                     className="hover:bg-stone-700 hover:text-stone-100 hover:cursor-pointer"
//                   >
//                     Delete
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//               <DialogContent className="p-4 bg-stone-900 rounded-lg border-none text-stone-100">
//                 <DialogHeader className=" items-start">
//                   <DialogTitle>Edit book</DialogTitle>
//                   <DialogDescription>
//                     Make changes to your book
//                   </DialogDescription>
//                 </DialogHeader>
//                 <Form {...form}>
//                   <form
//                     className="p-2"
//                     // onSubmit={form.handleSubmit(() =>
//                     //   mutation.mutate({ ...form.getValues() })
//                     // )}
//                     onSubmit={(e) => {
//                       e.preventDefault();
//                       console.log("submitted");
//                     }}
//                   >
//                     <FormField
//                       control={form.control}
//                       name={"name"}
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Name</FormLabel>
//                           <FormControl>
//                             <Input
//                               placeholder="I Want To Read Your Book..."
//                               className="col-span-3 placeholder:text-stone-600 bg-stone-800 border-none"
//                               {...field}
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name={"desc"}
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Description</FormLabel>
//                           <FormControl>
//                             <Input
//                               placeholder="This book is..."
//                               className="col-span-3 placeholder:text-stone-600 bg-stone-800 border-none"
//                               {...field}
//                             />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <DialogFooter className="pt-4">
//                       <Button
//                         className="bg-stone-800 w-full hover:bg-stone-700"
//                         type="submit"
//                       >
//                         Submit
//                       </Button>
//                     </DialogFooter>
//                   </form>
//                 </Form>
//               </DialogContent>
//             </Dialog> */}
//             <MenuBook id={book._id as string} />
//           </CardHeader>
//           <CardContent className="flex flex-col p-4">
//             <h1 className="text-md font-semibold line-clamp-2 text-stone-100">
//               {book.name}
//             </h1>
//             <span className="text-sm text-slate-400 line-clamp-1">
//               {book.author}
//             </span>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// };

const SearchBook = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState<SetStateAction<string>>("");
  function handleSearch(q: React.KeyboardEvent) {
    if (q.key === "Enter") {
      console.log(value);
      navigate(`?search=${value}`);
    }
  }

  return (
    <div className="flex flex-col w-full items-start gap-1 p-4">
      <Label htmlFor="search">Search</Label>
      <Input
        id="search"
        type="text"
        placeholder="I Want To Read Your Book..."
        className="col-span-3 placeholder:text-stone-600 bg-stone-800 border-none"
        value={value as string}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleSearch}
      />
    </div>
  );
};

export function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* <BookForm /> */}
        {/* <UploadFile /> */}
        <SearchBook />
        {/* <BookCard /> */}
        <Toaster />
      </QueryClientProvider>
    </>
  );
}
