import { z } from "zod";

// function checkFileType(file: File) {
//   if (file?.name) {
//     const fileType = file.name.split(".").pop();
//     if (["gif", "png", "jpg"].includes(fileType as string)) return true;
//   }
//   return false;
// }

export interface IBook {
  _id?: string;
  __v?: number;
  title: string;
  desc: string;
  isbn: string;
  author: string;
  publish_date: string;
  language: string;
  cover_url: string | null | FileList | File;
  pages: number;
  is_available: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface IBorrowedBook {
  _id: string;
  borrower: string;
  book: string;
  created_at: Date;
}

export const formSchema = z.object({
  title: z.string().min(1, { message: "Name is required" }),
  desc: z.string().min(1, { message: "Description is required" }),
  isbn: z.string().min(1, { message: "ISBN is required" }),
  author: z.string().min(1, { message: "Author is required" }),
  publish_date: z.string().min(1, { message: "Publish date is required" }),
  language: z.string().min(1, { message: "Language is required" }),
  pages: z.string().min(1, { message: "Pages is required" }),
  cover_url: z
    .instanceof(FileList)
    // .min(1, { message: "Cover URL is required" }),
    .refine((file) => file?.length > 0, { message: "Cover URL is required" }),
  // .refine((img: File) => img.size < 1_000_000, {
  //   message: "Cover URL is too large",
  // })
  // .refine((img) => checkFileType(img), {
  //   message: "Cover URL is not an image",
  // }),
});
