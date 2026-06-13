"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Field, FieldError, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const formSchema = z.object({
  password: z
    .string()
    .min(6, { message: "Field cannot be empty or less than 6 characters" }),
});

const ResetPassWordCard = () => {
  const [showPassword, setShowPassword] = useState(false);
  const params = useSearchParams();
  const token = params.get("token");
  const email = params.get("email");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const res = await fetch("/api/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, email, password: data.password }),
    });

    const submittedData = await res.json();
    form.reset({ password: "" });
    toast(submittedData?.message);
  };

  return (
    <Card className="w-full sm:max-w-md p-8 shadow-2xl rounded-lg">
      <CardHeader>
        <CardTitle>Reset your password</CardTitle>
      </CardHeader>
      <CardContent className="mt-4">
        <form
          className="flex flex-col gap-6"
          id="form-rhf-reset"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-reset-password">
                  Password:
                </FieldLabel>
                <Input
                  {...field}
                  type={showPassword ? "text" : "password"}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your reset password"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </Button>

          <span className="text-xs">
            After changing your password,{" "}
            <Link
              href="sign-in"
              className="font-black tracking-wide hover:underline"
            >
              Sign in
            </Link>
          </span>
          <Button className="cursor-pointer" type="submit">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ResetPassWordCard;
