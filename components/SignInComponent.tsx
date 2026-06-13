"use client";

import { Button } from "./ui/button";
import { signIn, useSession } from "next-auth/react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "./ui/spinner";

const formSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 character" }),
});

const SignInComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { data: session } = useSession();

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        mode: "signin",
      });
      setIsLoading(false);
      router.push("/");
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (session?.user) router.push("/");

  return (
    <Card className="w-full max-[70%] lg:max-w-xl flex flex-col gap-4 p-4">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-sign-in" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your email..."
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-email">Password</FieldLabel>
                  <div className="flex gap-2">
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      id="form-rhf-email"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your password..."
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="cursor-pointer"
                    >
                      {showPassword ? (
                        <FaEye size={16} />
                      ) : (
                        <FaEyeSlash size={16} />
                      )}
                    </Button>
                  </div>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <Button type="submit" className="w-full my-6 shadow cursor-pointer">
            {isLoading ? (
              <span className="flex items-center gap-2">
                Signing in <Spinner />
              </span>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <div className="flex flex-col gap-2 text-xs text-zinc-500 dark:text-white py-4">
          <div className="">
            {"Don't have an account?"}{" "}
            <Link
              href="/sign-up"
              className="hover:underline font-bold text-blue-600 dark:text-white"
            >
              Sign up
            </Link>
          </div>
          <Link href="/forgot-password">
            <span className="cursor-pointer hover:underline">
              Forgotten password?
            </span>
          </Link>
        </div>
      </CardContent>

      <div className="flex items-center justify-between">
        <hr className="w-[45%]" />
        <span className="font-semibold">OR</span>
        <hr className="w-[45%]" />
      </div>

      <Button onClick={() => signIn("google")} className="cursor-pointer">
        <FaGoogle /> Sign in with Google
      </Button>
    </Card>
  );
};

export default SignInComponent;
