"use client";
import { useForgotPassword } from "@/hooks/useForgotPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Field, FieldError, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.email().min(1, { message: "Field Cannot be empty" }),
});

const ForgotPasswordCard = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate, data: submittedData } = useForgotPassword();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      mutate(data.email);
      toast(submittedData?.message);
    } catch (err) {
      console.log(err);
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  console.log(submittedData);
  return (
    <Card className="flex gap-4 w-full sm:max-w-md p-6 shadow-2xl rounded-lg">
      <CardHeader className="flex flex-col gap-8">
        <CardTitle>Forgotten Password</CardTitle>
        <CardDescription>
          Please enter your email to reset your passowrd
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="flex flex-col gap-8"
          id="form-rhf-reset"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-reset-email">Email</FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-reset-email"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your email"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer"
          >
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ForgotPasswordCard;
