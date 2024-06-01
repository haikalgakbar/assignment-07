import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { userLoginSchema } from "@/interfaces/user";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export function Login() {
  const { handleUserLogin } = useAuth();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof userLoginSchema>>({
    resolver: zodResolver(userLoginSchema),
    mode: "onChange",
    defaultValues: {
      email_or_username: "",
      password: "",
    },
  });

  async function handleOnSubmit(data: z.infer<typeof userLoginSchema>) {
    form.reset();
    const res = await handleUserLogin(data);

    res?.data?.user?.roles === "user" ? navigate("/") : navigate("/admin");
  }

  return (
    <>
      <Card className="bg-stone-900 text-stone-100 border-none m-4">
        <CardHeader className="p-4 pb-2">
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2 py-6 px-4">
          <Form {...form}>
            <form
              className="grid gap-4"
              onSubmit={form.handleSubmit(handleOnSubmit)}
            >
              <FormField
                control={form.control}
                name={"email_or_username"}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Email or username"
                        autoFocus={true}
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
                name={"password"}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        className="col-span-3 placeholder:text-stone-600 bg-stone-800 border-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full">
                <Button
                  className="bg-stone-800 w-full hover:bg-stone-700"
                  type="submit"
                >
                  Login
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="border-t-[1px] border-stone-800">
          <div className="w-full pt-6 text-center">
            <p className="text-stone-400 text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="underline text-blue-600">
                Sign up
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
