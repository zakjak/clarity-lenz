"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { FaRegEdit } from "react-icons/fa";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { useUpdateUserProfile } from "@/hooks/useUser";
import { UserInfo } from "@/lib/types/users";

const formSchema = z.object({
  position: z.string().min(2, "Position must be at last 2 characters"),
  bio: z.string().min(2, "Position must be at last 2 characters"),
  fb: z.string().optional(),
  twitter: z.string().optional(),
  linkedIn: z.string().optional(),
  instagram: z.string().optional(),
});

const EditProfileComponent = ({
  userId,
  userInfo,
}: {
  userId: string;
  userInfo: UserInfo;
}) => {
  const [open, setOpen] = useState(false);
  const { mutate } = useUpdateUserProfile(userId);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      position: "",
      bio: "",
      fb: "",
      twitter: "",
      linkedIn: "",
      instagram: "",
    },
  });

  useEffect(() => {
    form.reset({
      position: userInfo?.position ? userInfo?.position : "",
      bio: userInfo?.bio ? userInfo?.bio : "",
      fb: userInfo?.fb ? userInfo?.fb : "",
      twitter: userInfo?.twitter ? userInfo?.twitter : "",
      linkedIn: userInfo?.linkedIn ? userInfo?.linkedIn : "",
      instagram: userInfo?.instagram ? userInfo?.instagram : "",
    });
  }, [userInfo, form]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const userInfo = {
      position: data.position,
      bio: data.bio,
      twitter: data.twitter,
      fb: data.fb,
      linkedIn: data.linkedIn,
      instagram: data.instagram,
    };

    mutate(userInfo);
    setOpen(false);
    form.reset({
      position: "",
      bio: "",
      fb: "",
      twitter: "",
      linkedIn: "",
      instagram: "",
    });
  };

  return (
    <div className="">
      <Dialog onOpenChange={setOpen} modal={false} open={open}>
        <form onSubmit={form.handleSubmit(onSubmit)} id="form-user-info">
          <DialogTrigger asChild>
            <Button variant="outline">
              Edit Profile <FaRegEdit />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[80%] no-scrollbar -mx-4 max-h-[80vh] overflow-y-auto px-4">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <FieldSet>
              <FieldGroup>
                <Controller
                  name="position"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="position">Position:</FieldLabel>
                      <Input
                        {...field}
                        id="position"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter Position(s)"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="bio"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="bio">Bio:</FieldLabel>
                      <Textarea
                        {...field}
                        id="bio"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter Bio"
                        className="resize-none h-42"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="fb"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="fb">
                        Facebook Link (optional):
                      </FieldLabel>
                      <Input
                        {...field}
                        id="fb"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter Facebook Link"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="twitter"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="twitter">
                        X (Twitter) Link (optional):
                      </FieldLabel>
                      <Input
                        {...field}
                        id="twitter"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter X(Twitter) Link"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="linkedIn"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="linked-in">
                        LinkedIn Link (optional):
                      </FieldLabel>
                      <Input
                        {...field}
                        id="linked-in"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter LinkedIn Link"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="instagram"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="instagram">
                        Instagram Link (optional):
                      </FieldLabel>
                      <Input
                        {...field}
                        id="instagram"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter Instagram Link"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </FieldSet>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" form="form-user-info">
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
};

export default EditProfileComponent;
