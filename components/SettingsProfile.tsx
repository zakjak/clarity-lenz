"use client";

import { signOut, useSession } from "next-auth/react";
import { User } from "@/lib/types/users";
import { Button } from "./ui/button";
import { FiEdit } from "react-icons/fi";
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
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useEffect, useState } from "react";
import AboutUser from "./AboutUser";
import { Field, FieldError, FieldLabel } from "./ui/field";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Should be at least 2 characters" })
    .max(250, { message: "Should not be more 250 characters" }),
  email: z.email().min(1, { message: "Email cannot be empty" }),
});

const SettingsProfile = () => {
  const { data: session, update } = useSession();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  useEffect(() => {
    if (session?.user?.name) {
      form.reset({
        name: session.user.name,
        email: session.user.email as string,
      });
    }
  }, [session, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setSaving(true);
    try {
      const res = await fetch(`/api/user/${session?.user?.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: values.name, email: values.email }),
      });

      if (res.ok) {
        await update();
      }

      setSaving(false);
      setOpen(false);
    } catch (err) {
      setSaving(false);
      console.log(err);
    }
  };

  const handleDelete = async (userId: string) => {
    if (!userId) return;

    const res = await fetch(`/api/account/${userId}/delete`, {
      method: "DELETE",
    });

    if (res.ok) {
      await signOut({ callbackUrl: "/" });
    } else {
      console.log("Failed to delete account");
    }
  };

  return (
    <div>
      <AboutUser user={session?.user as User} />
      <Dialog onOpenChange={setOpen} open={open}>
        <div className="flex justify-end">
          <DialogTrigger asChild>
            <Button>
              <FiEdit />
              Edit
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-name">Name</FieldLabel>
                    <Input
                      id="form-name"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      placeholder="Enter name..."
                      {...field}
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
                    <FieldLabel htmlFor="form-name">Email</FieldLabel>
                    <Input
                      id="form-email"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      placeholder="Enter Email..."
                      {...field}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">
                  {saving ? "Saving..." : "Save changes"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </div>
      </Dialog>

      <div className="">
        <div className="border-b py-4">
          <h1>Name: {session?.user?.name}</h1>
        </div>
        <div className="border-b py-4">
          <h2>Email: {session?.user?.email}</h2>
        </div>
      </div>

      <div className="shadow-2xl rounded-sm mt-10">
        <div className="mx-auto p-8">
          <h1 className="font-semibold text-2xl py-4 border-b">
            Manage Account
          </h1>
          <div className="flex justify-between items-center py-4">
            <span>
              If you delete your account, all saved articles will be lost!!!
            </span>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Delete</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="py-4 border-b">
                    Delete profile
                  </DialogTitle>
                  <DialogDescription className="flex flex-col text-start">
                    If you are you really sure, you want to delete your account?
                    click continue
                  </DialogDescription>
                  <DialogDescription className="text-start">
                    <span className="font-bold">Note:</span> Account deleted,
                    articles saved or saved data can&apos;t be retrieved
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(session?.user?.id as string)}
                  >
                    Delete Account
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsProfile;
