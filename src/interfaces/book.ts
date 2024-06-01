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
  title: string;
  desc: string;
  isbn: string;
  author: string;
  cover_url: null | FileList | File;
  qty: number;
  created_at?: Date;
  updated_at?: Date;
}

export const formSchema = z.object({
  title: z.string().min(1, { message: "Name is required" }),
  desc: z.string().min(1, { message: "Description is required" }),
  isbn: z.string().min(1, { message: "ISBN is required" }),
  author: z.string().min(1, { message: "Author is required" }),
  // cover_url: z.string().min(1, { message: "Cover URL is required" }),
  cover_url: z
    .instanceof(FileList)
    // .min(1, { message: "Cover URL is required" }),
    .refine((file) => file?.length > 0, { message: "Cover URL is required" }),
  qty: z.string().min(1, { message: "Quantity is required" }),
  // .refine((img: File) => img.size < 1_000_000, {
  //   message: "Cover URL is too large",
  // })
  // .refine((img) => checkFileType(img), {
  //   message: "Cover URL is not an image",
  // }),
});
