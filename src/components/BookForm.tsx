import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../components/ui/form";
import { Button } from "../components/ui/button";
import { useMutation, QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { formSchema } from "../interfaces/book";

const queryClient = new QueryClient();

export const BookForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      desc: "",
      isbn: "",
      author: "",
      publish_date: "",
      language: "",
      pages: "",
      cover_url: undefined,
    },
  });

  const imgRef = form.register("cover_url");

  const mutation = useMutation({
    mutationFn: handleSubmit,
    onSuccess: () => {
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("desc", values.desc);
    formData.append("isbn", values.isbn);
    formData.append("author", values.author);
    formData.append("publish_date", values.publish_date);
    formData.append("language", values.language);
    formData.append("cover_url", values.cover_url[0]);
    formData.append("pages", values.pages.toString());

    const response = await fetch(
      `${import.meta.env.VITE_BASE_API_URL}/api/v1/books`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) throw new Error("Network error.");

    toast.success("Added to collection.", {
      description: values.title,
      action: {
        label: "Dismiss",
        onClick: () => toast.dismiss(),
      },
    });

    return response.json();
  }

  return (
    <Form {...form}>
      <form
        className="p-2"
        onSubmit={form.handleSubmit(() =>
          mutation.mutate({ ...form.getValues() })
        )}
        encType="multipart/form-data"
      >
        <Card className="bg-stone-900 text-stone-100 border-none">
          <CardHeader className="p-4 pb-2">
            <CardTitle>New book</CardTitle>
            <CardDescription className="text-stone-400">
              Add book to library collection
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2 py-2 px-4">
            <FormField
              control={form.control}
              name={"title"}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Title"
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
                  <FormControl>
                    <Input
                      placeholder="Description"
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
              name={"isbn"}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="ISBN"
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
              name={"author"}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Author"
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
              name={"publish_date"}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Publish date"
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
              name={"language"}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Language"
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
              name={"cover_url"}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="col-span-3 placeholder:text-stone-600 bg-stone-800 border-none"
                      type="file"
                      {...imgRef}
                      onChange={(e) => field.onChange(e.target?.files)}
                      accept="image/png, image/gif, image/jpeg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"pages"}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Pages"
                      className="col-span-3 placeholder:text-stone-600 bg-stone-800 border-none"
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="p-4">
            <div className="w-full">
              <Button
                className="bg-stone-800 w-full hover:bg-stone-700"
                type="submit"
              >
                Submit
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};
