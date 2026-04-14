"use client";

import { EventProp } from "@/lib/types/users";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { formatted } from "@/lib/utils/helpers";
import { IoPlayCircle } from "react-icons/io5";
import { FaBookmark, FaStopCircle } from "react-icons/fa";
import moment from "moment";
import { Button } from "./ui/button";
import { FaClock } from "react-icons/fa6";
import { useSession } from "next-auth/react";
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

const formSchema = z.object({
  email: z.email(),
});

const EventLayout = ({ event }: { event: EventProp }) => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
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
      <Image
        src={event?.image ?? ""}
        alt={`${event?.title}`}
        width={240}
        height={240}
        className="w-full h-100 object-cover rounded-xl"
      />

      <div className="mt-4 flex flex-col items-start">
        <Badge className="font-semibold text-sm md:text-md ">Online</Badge>
        <h2 className="font-bold mt-2 bg-zinc-900 py-2 px-4 rounded-xl text-white">
          {event?.platform}
        </h2>
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
      <div className="w-full bg-zinc-900 p-4 rounded-md font-semibold text-lg text-white">
        <h1>Note: All time are in {event?.timezone}</h1>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <IoPlayCircle size={40} />
          <div className="w-full">
            <h3>STARTS AT</h3>
            <div className="">
              <div className="flex gap-2">
                <h1>{moment(event?.eventStart).format("h:mm")}</h1>
                <span>
                  {Number(moment(event?.eventStart).format("h")) > 12
                    ? "PM"
                    : "AM"}
                </span>
              </div>
              <p>{moment(event?.eventEnd).format("YYYY-MM-DD")}</p>
            </div>
            <Separator className="mt-1" />
          </div>
        </div>
        <div className="flex items-center gap-4 mb-4">
          <FaStopCircle size={40} />
          <div className="w-full">
            <h3>ENDS AT</h3>
            <div className="">
              <div className="flex gap-2">
                <h1>{moment(event?.eventEnd).format("h:mm")}</h1>
                <span>
                  {Number(moment(event?.eventEnd).format("h")) > 12
                    ? "PM"
                    : "AM"}
                </span>
              </div>
              <p>{moment(event?.eventEnd).format("YYYY-MM-DD")}</p>
            </div>
            <Separator className="mt-1" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <FaClock size={40} />
          <div className="w-full">
            <h3>DURATION</h3>
            <div className="">
              <div className="flex gap-2">
                <span>{formattedDuration}</span>
              </div>
            </div>
            <Separator className="mt-1" />
          </div>
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
