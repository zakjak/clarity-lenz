"use client";

import { Button } from "./ui/button";
import { signIn, useSession } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";
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
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { Spinner } from "./ui/spinner";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    name: z.string(),
    email: z.email({
      message: "Email field can't be empty or must be an email address",
    }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 character" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 character" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const SignUpComponent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      await signIn("credentials", {
        name: data.name,
        email: data.email,
        password: data.password,
        mode: "signup",
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
    <Card className="w-full max-[70%] lg:max-w-xl flex flex-col gap-4 p-4 shadow-xl rounded-lg">
      <CardHeader>
        <CardTitle>Register your account</CardTitle>
        <CardDescription>
          Enter your email below to register your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-sign-in" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-name">Name</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your full name eg. John Doe"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
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
                  <FieldLabel htmlFor="form-rhf-password">Password</FieldLabel>
                  <div className="flex gap-2">
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      id="form-rhf-password"
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
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-confirm-password">
                    Confirm Password
                  </FieldLabel>
                  <div className="flex gap-2">
                    <Input
                      {...field}
                      type={showConfirmPassword ? "text" : "password"}
                      id="form-rhf-confirm-password"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter exact password above..."
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="cursor-pointer"
                    >
                      {showConfirmPassword ? (
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
          <Button
            disabled={isLoading}
            type="submit"
            className="w-full my-6 shadow cursor-pointer"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                Registering <Spinner />
              </span>
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>

        <div className="text-xs text-zinc-500 dark:text-white text-center py-4">
          {"Already have an account?"}{" "}
          <Link
            href="/sign-in"
            className="hover:underline font-bold text-blue-600 dark:text-white"
          >
            Sign in
          </Link>
        </div>
      </CardContent>

      <div className="flex items-center justify-between">
        <hr className="w-[45%]" />
        <span className="font-semibold">OR</span>
        <hr className="w-[45%]" />
      </div>

      <Button onClick={() => signIn("google")} className="cursor-pointer">
        <FaGoogle /> Sign up with Google
      </Button>
    </Card>
  );
};

export default SignUpComponent;
