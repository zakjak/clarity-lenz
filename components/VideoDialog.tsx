import { User } from "@/lib/types/users";
import React, { useState } from "react";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "./ui/dialog";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

const formSchema = z.object({
  videoUrl: z.string().min(1, { message: "Field Cannot be empty" }),
  title: z.string().min(1, { message: "Field Cannot be empty" }),
  platform: z.string().optional(),
  description: z.string().optional(),
});

const VideoDialog = ({ user }: { user: User }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoUrl: "",
      title: "",
      description: "",
      platform: "",
    },
  });

  const onSubmuit = (values: z.infer<typeof formSchema>) => {};
  return (
    <DialogContent
      className="overflow-y-scroll h-190 z-999 w-[90%]"
      role="dialog"
      aria-describedby={undefined}
      onOpenAutoFocus={(e) => {
        e.preventDefault();
        document.getElementById("title-input")?.focus();
      }}
    >
      <form id="form-video" onSubmit={form.handleSubmit(onSubmuit)}>
        <DialogTitle>Publish Live Video</DialogTitle>
        <FieldGroup>
          <Controller
            name="videoUrl"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-title">Video Link:</FieldLabel>
                <Input
                  {...field}
                  id="form-link"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter Video Link..."
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-title">Title:</FieldLabel>
                <Input
                  {...field}
                  id="form-title"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter Title..."
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-title">
                  Description (optional):
                </FieldLabel>
                <Textarea
                  {...field}
                  id="form-description"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter Description..."
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="platform"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-platofmr">
                  Platform (optional, example Zoom meeting):
                </FieldLabel>
                <Textarea
                  {...field}
                  id="form-platform"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter Platform..."
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <div className="mt-8">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default VideoDialog;
