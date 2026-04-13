"use client";

import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import z from "zod";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Textarea } from "./ui/textarea";
import { useCreateEvent } from "@/hooks/useCreateEvent";
import { User } from "@/lib/types/users";

const formSchema = z
  .object({
    title: z
      .string()
      .min(1, { message: "Title must be at least 2 characters." })
      .max(250, {
        message: "Title must be less than 250 characters.",
      }),
    link: z.url({ protocol: /^https$/ }).optional(),
    platform: z
      .string()
      .min(1, { message: "Platform can't be empty" })
      .max(250, { message: "Platform must be less than 250 characters." }),
    meetingId: z.string().optional(),
    password: z.string().optional(),
    image: z.union([
      z
        .custom<File>((file) => file instanceof File, "Image is required")
        .nullable(),
      z.string(),
    ]),
    description: z.string().min(2, "Position must be at last 2 characters"),
    eventDate: z.date({ message: "Event date is required" }),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
    timezone: z.string().min(1, "Time zone is required"),
  })
  .refine((data) => data.endTime > data.startTime, {
    message: "End time must be after start time",
    path: ["endTime"],
  });

const EventsForm = ({
  user,
  setOpen,
}: {
  user: User;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      image: undefined,
      meetingId: "",
      eventDate: new Date(),
      startTime: "",
      endTime: "",
      link: "",
      password: "",
      platform: "",
      timezone: "",
    },
  });

  const { mutate } = useCreateEvent(user?.id);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file, { shouldValidate: true });
      setImagePreview(URL.createObjectURL(file));
    }
    e.target.value = "";
  };

  const removeImagePreview = () => {
    form.setValue("image", null);
    setImagePreview(null);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    const formData = new FormData();

    if (values.image && values.image instanceof File) {
      const bytes = await values.image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      formData.append("file", new Blob([buffer]), values?.image.name);
    }

    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("startTime", values.startTime);
    formData.append("endTime", values.endTime);
    formData.append("eventDate", values.eventDate.toISOString()); // important
    formData.append("link", values.link ?? "");
    formData.append("meetingId", values.meetingId ?? "");
    formData.append("password", values.password ?? "");
    formData.append("platform", values.platform ?? "");
    formData.append("timezone", values.timezone ?? "");

    try {
      mutate(formData);
      form.reset({
        title: "",
        description: "",
        startTime: "",
        link: "",
        meetingId: "",
        endTime: "",
        eventDate: new Date(),
        password: "",
        image: "",
        platform: "",
      });
      setIsSubmitting(false);
      setImagePreview(null);
    } catch (err) {
      console.log(err);
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
      setOpen(false);
    }
  };

  return (
    <DialogContent
      className="overflow-y-scroll h-190 z-50 w-[90%]"
      role="dialog"
      aria-describedby={undefined}
      onOpenAutoFocus={(e) => {
        e.preventDefault();
        document.getElementById("title-input")?.focus();
      }}
    >
      <DialogHeader>
        <DialogTitle className="text-3xl">Add Event</DialogTitle>
      </DialogHeader>
      <form id="form-rhf" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-title">Title</FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-title"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter the title of event..."
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="image"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-title">Image</FieldLabel>
                {!imagePreview ? (
                  <Input
                    {...form.register("image")}
                    accept="image/*"
                    onChange={handleImageChange}
                    type="file"
                  />
                ) : (
                  <div className="w-54! mt-3 relative h-40">
                    <Controller
                      name="image"
                      control={form.control}
                      render={() => (
                        <Input
                          {...form.register("image")}
                          accept="image/*"
                          onChange={handleImageChange}
                          type="file"
                        />
                      )}
                    />
                    <Image
                      src={imagePreview}
                      alt="article image preview"
                      fill
                      className="object-cover rounded-xl"
                    />
                    <Button
                      variant="secondary"
                      type="button"
                      onClick={removeImagePreview}
                      className="text-xl cursor-pointer w-5 h-5 p-4 flex items-center justify-center font-bold  absolute right-2 top-2 rounded-full shadow"
                    >
                      X
                    </Button>
                  </div>
                )}

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
                <FieldLabel htmlFor="form-rhf-title">
                  Platform (eg: Zoom meeting)
                </FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-platform"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter the Platform..."
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="link"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-title">
                  Link (optional)
                </FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-link"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter the link of event..."
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="meetingId"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-title">
                  Meeting Id (optional)
                </FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-title"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter the title of event..."
                  autoComplete="off"
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
                <FieldLabel htmlFor="form-rhf-title">
                  Password (optional)
                </FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-title"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter the title of event..."
                  autoComplete="off"
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
                <FieldLabel htmlFor="form-rhf-description">
                  Description
                </FieldLabel>
                <Textarea
                  {...field}
                  id="form-rhf-description"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter the description of event..."
                  autoComplete="off"
                  className="max-h-30 min-h-30"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="eventDate"
            control={form.control}
            render={({ field, fieldState }) => {
              const timeValue = field.value
                ? format(field.value, "HH:mm:ss")
                : "10:30:00";

              return (
                <Field>
                  <FieldLabel htmlFor="date-picker-optional">
                    Date & Time
                  </FieldLabel>
                  <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="date-picker-optional"
                        className="w-32 justify-between font-normal"
                      >
                        {field.value
                          ? format(field.value, "PPP")
                          : "Select date"}
                        <ChevronDownIcon data-icon="inline-end" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={field.value}
                        captionLayout="dropdown"
                        defaultMonth={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          setOpenCalendar(false);
                        }}
                        className="z-999"
                      />
                    </PopoverContent>
                  </Popover>

                  {fieldState.error && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              );
            }}
          />
          <Controller
            name="startTime"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Start Time</FieldLabel>
                {/* Time Picker */}
                <Input
                  type="time"
                  step="60"
                  defaultValue="10:30:00"
                  {...field}
                  className="w-32 appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden"
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="endTime"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>End Time</FieldLabel>
                {/* Time Picker */}
                <Input
                  type="time"
                  step="60"
                  defaultValue="11:30:00"
                  {...field}
                  className="w-32 appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden"
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="timezone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-title">Time Zone</FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-time-zone"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter the title of Time Zone..."
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button value="outline" className="cursor-pointer">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer"
          >
            {isSubmitting ? "Saving Event..." : "Save Event"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default EventsForm;
