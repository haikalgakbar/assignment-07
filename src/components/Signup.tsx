import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
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
import { userSignupSchema } from "@/interfaces/user";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const { handleUserSignup } = useAuth();

  const form = useForm<z.infer<typeof userSignupSchema>>({
    resolver: zodResolver(userSignupSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      user_name: "",
      password: "",
    },
  });

  function handleOnSubmit(data: z.infer<typeof userSignupSchema>) {
    handleUserSignup(data);
    form.reset();

    navigate("/login", { replace: true });
  }

  return (
    <div className="flex flex-col max-w-[1440px] mx-auto min-h-dvh md:max-w-lg md:justify-center">
      <Card className="bg-stone-900 text-stone-100 border-none m-4">
        <CardHeader className="p-4 pb-2">
          <CardTitle>Create your account</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 pt-2 px-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleOnSubmit)}>
              <FormField
                control={form.control}
                name={"email"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="example@mail.com"
                        className="col-span-3 placeholder:text-stone-600 bg-stone-800 border-none"
                        autoFocus={true}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"user_name"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="example"
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="************"
                        className="col-span-3 placeholder:text-stone-600 bg-stone-800 border-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-4 w-full">
                <Button
                  className="bg-stone-800 w-full hover:bg-stone-700"
                  type="submit"
                >
                  Sign up
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="border-t-[1px] border-stone-800">
          <div className="w-full pt-6 text-center">
            <p className="text-stone-400 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline text-blue-600">
                Login
              </Link>
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
