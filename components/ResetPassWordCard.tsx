"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Spinner } from "./ui/spinner";

const formSchema = z.object({
  password: z
    .string()
    .min(6, { message: "Field cannot be empty or less than 6 characters" }),
});

const ResetPassWordCard = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, email, password: data.password }),
      });

      const submittedData = await res.json();
      form.reset({ password: "" });
      toast(submittedData?.message);
      setIsSubmitting(false);
    } catch (err) {
      console.log(err);
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }
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
                <div className="flex gap-2">
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
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer"
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </Button>
                </div>
              </Field>
            )}
          />

          <span className="text-xs">
            After changing your password,{" "}
            <Link
              href="sign-in"
              className="font-black tracking-wide hover:underline"
            >
              Sign in
            </Link>
          </span>
          <Button
            disabled={isSubmitting}
            className="cursor-pointer"
            type="submit"
          >
            {!isSubmitting ? (
              <span className="flex items-center gap-2">
                <Spinner />
                Submitting...{" "}
              </span>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ResetPassWordCard;
