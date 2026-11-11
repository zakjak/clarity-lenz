"use client";

import { EventProp } from "@/lib/types/users";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { formatted, formattedTime } from "@/lib/utils/helpers";
import { FaBookmark } from "react-icons/fa";
import moment from "moment";
import { Button } from "./ui/button";
import { useSavedEvent, useToggleEvent } from "@/hooks/useEvents";
import { Spinner } from "./ui/spinner";
import { IoTicketOutline } from "react-icons/io5";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { CiCalendar } from "react-icons/ci";
import { LuClock5 } from "react-icons/lu";
import { BsCameraVideo } from "react-icons/bs";

const formSchema = z.object({
  email: z.email(),
});

const EventLayout = ({ event }: { event: EventProp }) => {
  const [open, setOpen] = useState(false);
  const { data: session } = authClient.useSession();
  const start = moment(event?.eventStart);
  const end = moment(event?.eventEnd);
  const duration = moment.duration(end.diff(start));
  const formattedDuration = `${duration.hours()}h:${duration.minutes()}m`;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const { data: savedEvent, isLoading } = useSavedEvent(
    session?.user?.id as string,
  );

  const { mutate, data: toggleMark } = useToggleEvent(
    session?.user?.id as string,
  );

  const isSaving =
    Array.isArray(toggleMark) &&
    toggleMark?.some((item) => item?.userId === session?.user?.id);

  const isSavedData =
    Array.isArray(savedEvent) &&
    savedEvent?.some((item) => item?.userId === session?.user?.id);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate({ eventId: event?.id ?? 0, email: values.email });
    form.reset({
      email: "",
    });
    setOpen(false);
  };

  return (
    <div className="w-full mt-8">
      <div className="relative w-full h-88">
        <Image
          src={event?.image ?? ""}
          alt={`${event?.title}`}
          className="w-full h-100 object-cover object-center rounded-xl absolute"
          fill
        />
      </div>

      <div className="mt-4 flex flex-col items-start">
        <h1 className="lg:text-3xl lg:font-semibold font-bold md:text-xl text-lg my-2">
          {event?.title}
        </h1>
      </div>
      <Separator />
      <div className="mt-4">
        <h1 className="md:text-lg text-sm font-semibold mb-2">Description:</h1>
        {formatted(event?.description)?.map((text, idx) => (
          <p key={idx} className="mb-4">
            {text}
          </p>
        ))}
      </div>
      <div className="w-full bg-blue-100 dark:bg-zinc-900 dark:text-white p-4 rounded-md font-semibold text-lg text-black">
        <h1>Note: All time are in {event?.timezone}</h1>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2 p-6">
        <div className="md:flex  mb-4 w-full">
          <div className="flex justify-between w-[90%] gap-3">
            <CiCalendar className="text-blue-800" size={40} />
            <div className="w-full">
              <h3 className="text-xs font-bold">Start Date:</h3>
              <div className="text-xs">
                <p>{moment(event?.eventEnd).format("ddd, MMM  D, YYYY")}</p>
              </div>
              <div className="text-xs">
                <h3 className="font-bold text-xs">End Date:</h3>
                <div className="flex gap-2"></div>
                <p>{moment(event?.eventEnd).format("ddd, MMM  D, YYYY")}</p>
              </div>
            </div>
            <Separator
              className="mt-1 hidden md:block w-[.02rem]! h-13!"
              orientation="vertical"
            />
          </div>

          <Separator className="mt-1 md:hidden" orientation="horizontal" />
        </div>

        <div className="md:flex">
          <div className="flex w-[90%] justify-between gap-3">
            <LuClock5 className="text-blue-800" size={40} />
            <div className="w-full">
              <h3 className="text-xs font-bold">Duration:</h3>
              <div className="">
                <div className="flex gap-2">
                  <h1 className="text-xs">
                    {formattedTime(event?.eventStart).split(",")[1]} -{" "}
                    {formattedTime(event?.eventEnd).split(",")[1]}
                  </h1>
                </div>
              </div>
            </div>
            <Separator
              className="mt-1 hidden lg:block w-[.02rem]! h-13!"
              orientation="vertical"
            />
          </div>

          <Separator className="mt-1 md:hidden" orientation="horizontal" />
        </div>

        <div className="md:flex gap-3">
          <div className="flex w-[90%] justify-between gap-3">
            <BsCameraVideo className="text-blue-800" size={40} />
            <div className="w-full">
              <h3 className="text-xs font-bold">Platform:</h3>
              <div className="">
                <div className="flex gap-2">
                  <h1 className="text-xs">{event?.platform}</h1>
                </div>
              </div>
            </div>
            <Separator
              className="mt-1 hidden md:block w-[.02rem]! h-13!"
              orientation="vertical"
            />
          </div>

          <Separator className="mt-1 md:hidden" orientation="horizontal" />
        </div>

        <div className="text-sm">
          <p>
            <span className="font-bold">Note:</span> all time are in{" "}
            {event?.timezone}
          </p>
        </div>
      </div>
      {session?.user ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              disabled={isSavedData}
              className="flex items-center gap-2 w-full my-8 cursor-pointer"
            >
              {isSavedData || isSaving ? (
                "You have already registered for this event"
              ) : (
                <span className="flex  items-center gap-2">
                  <IoTicketOutline className="w-6! h-6!" />
                  {"Register for Event"}
                  {isLoading && <Spinner />}
                </span>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            <form id="form-rhf" onSubmit={form.handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle>Register for {event?.title}</DialogTitle>
                <DialogDescription>
                  To Confirm your registration, type your email address to
                  register for this event. You will be sent an email to your
                  preferred email address
                </DialogDescription>
              </DialogHeader>
              <FieldGroup>
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-email" className="mt-4">
                        Email
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-email"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter email address..."
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
              <DialogFooter className="mt-4">
                <DialogClose asChild>
                  <Button variant="outline" className="cursor-pointer">
                    Cancel
                  </Button>
                </DialogClose>
                <Button className="cursor-pointer" type="submit">
                  Register
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      ) : (
        <span className="flex items-center gap-2 font-bold my-8">
          <FaBookmark /> Login to Register for event
        </span>
      )}
      {/* <Button className="w-full mt-6 cursor-pointer">Register for Event</Button> */}
    </div>
  );
};

export default EventLayout;
