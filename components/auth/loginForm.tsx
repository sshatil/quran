"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { login, signup } from "@/app/(auth-pages)/login/actions";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

const LoginForm = () => {
  const { toast } = useToast();
  // Define form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // submit handler
  async function onSubmit(values: z.infer<typeof formSchema>, event: any) {
    // Create a new FormData object and append the form values
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);
    const result = await login(formData);
    if (result?.error) {
      toast({
        description: result.error,
      });
    }
  }
  return (
    <div className="lg:p-8 w-1/2">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create or Login an account
          </h1>
        </div>
        <p className="px-8 text-center text-sm text-muted-foreground">
          Don&rsquo;t have an account?
          <Link
            className="text-foreground font-medium underline"
            href="/sign-up"
          >
            Sign up
          </Link>
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
