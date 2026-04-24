"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import z from "zod";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import Image from "next/image";
import { Command, CommandInput, CommandItem } from "./ui/command";
import { User } from "@/lib/types/users";
import { useUsers } from "@/hooks/useUser";
import { Article } from "@/lib/types/article";
import { useCreateArticle, useEditArticle } from "@/hooks/useCreatedArticles";
import { useArticle } from "@/hooks/useArticle";

const EditorComponent = dynamic(() => import("./SlateEditor"), {
  ssr: false,
});

export const imageSchema = z.object({
  file: z.union([z.instanceof(File), z.string().url()]),
  title: z.string().min(1, "Title required"),
});

const formSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title must be at least 2 characters." })
    .max(250, {
      message: "TItle must be less than 250 characters.",
    }),
  image: z.union([
    z
      .custom<File>((file) => file instanceof File, "Image is required")
      .nullable(),
    z.string(),
  ]),
  imageTitle: z
    .string()
    .min(2, { message: "Image title must be at least 2 characters" }),
  category: z.string(),
  story: z
    .string()
    .transform((value) => {
      if (!value || value.trim() === "") {
        return JSON.stringify([{ type: "p", children: [{ text: "" }] }]);
      }
      return value;
    })
    .refine(
      (value) => {
        try {
          const parsed = JSON.parse(value);
          return Array.isArray(parsed);
        } catch {
          return false;
        }
      },
      { message: "Invalid content format" },
    ),
  tags: z.array(z.string()).nonempty(),
  images: z.array(imageSchema).optional(),
  authors: z.array(z.string()).min(1, "Select at least one author"),
});

export type ArticleFormData = z.infer<typeof formSchema>;

const ArticleDialog = ({
  user,
  openEdit,
  setOpenEdit,
  articleId,
  setOpen,
}: {
  user: User;
  openEdit?: boolean;
  setOpenEdit: Dispatch<SetStateAction<boolean>>;
  articleId?: number;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const inputTagRef = useRef<HTMLInputElement | null>(null);
  const [inputTagValue, setInputTagValue] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const { data: users, isLoading } = useUsers();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data } = useArticle(articleId as number);

  const { mutate } = useCreateArticle(user?.id);
  const { mutate: mutateEditArticle } = useEditArticle();

  const form = useForm<ArticleFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      image: undefined,
      imageTitle: "",
      category: "",
      story: "",
      tags: [],
      images: [],
      authors: [],
    },
  });

  const convertDbImages = (urls: string[], titles: string[]) => {
    return urls.map((url, i) => ({
      file: url, // <-- URL, not File
      title: titles?.[i] || "",
    }));
  };

  useEffect(() => {
    if (openEdit && data?.article[0]) {
      const article = data.article[0];

      const dbImages = convertDbImages(article.images, article.imagesTitle);

      form.reset({
        ...article,
        images: dbImages,
      });
      setImagePreview(article?.image);
      setTags(article?.tags);
    } else {
      form.reset({
        title: "",
        image: "",
        category: "",
        authors: [],
        imageTitle: "",
        story: "",
        tags: [],
        images: [],
      });
    }
  }, [openEdit, data, form]);

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

  const addTag = () => {
    if (inputTagValue.trim() && !tags.includes(inputTagValue.trim())) {
      const newTags = [...tags, inputTagValue.trim()];
      setTags(newTags);
      form.setValue("tags", newTags);
    }
    setInputTagValue("");
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter((t) => t !== tagToRemove);
    setTags(newTags);
    form.setValue("tags", newTags);
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const fileArray = Array.from(e.target.files);
    fileArray.forEach((file) => append({ file, title: "" }));

    e.target.value = "";
  };

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "images",
  });

  const onSubmit = async (
    values: z.infer<typeof formSchema>,
    isDraft: boolean,
  ) => {
    const formData = new FormData();

    if (values.image && values.image instanceof File) {
      formData.append("image", values?.image);
    }

    values?.images?.forEach((file) => {
      if (file.file instanceof File) {
        formData.append("images", file.file);
      }
    });

    try {
      const responseUpload = await fetch(`/api/uploadImages`, {
        method: "POST",
        body: formData,
      });

      if (!responseUpload.ok) {
        throw new Error("Upload failed");
      }
      const resultUploads = await responseUpload.json();
      console.log(resultUploads);

      if (resultUploads) {
        if (imagePreview?.startsWith("https")) {
          const images = resultUploads;

          const imagesUrl: string[] = [];

          for (let i = 0; i < images.length; i++) {
            imagesUrl.push(images[i].result.variants[1]);
          }

          values?.images?.forEach((image) => {
            if (!(image.file instanceof File)) {
              imagesUrl.push(image.file);
            }
          });

          const imagesTitle: string[] = [];

          values?.images?.forEach((image) => imagesTitle.push(image.title));

          if (!openEdit) {
            const { title, imageTitle, tags, authors, story, image, category } =
              values;

            const article = {
              title,
              category,
              tags,
              authors,
              story,
              image,
              imageTitle,
              images: imagesUrl,
              isDraft,
              imagesTitle,
            };

            mutate(article as Article);
            form.reset({
              title: "",
              image: undefined,
              category: "",
              authors: [],
              imageTitle: "",
              story: "",
              tags: [],
              images: [],
            });

            setIsSubmitting(false);
            setOpenEdit(false);
          } else {
            const { title, imageTitle, category, tags, authors, image, story } =
              values;

            const article = {
              title,
              category,
              tags,
              authors,
              story: story,
              image: image,
              imageTitle,
              images: imagesUrl,
              isDraft,
              imagesTitle,
              articleId,
            };

            mutateEditArticle(article as Article);
            setIsSubmitting(false);
            setOpenEdit(false);
          }
        } else {
          const image = resultUploads[0].result.variants[0];

          const images = resultUploads.slice(1);

          const imagesUrl: string[] = [];

          for (let i = 0; i < images.length; i++) {
            imagesUrl.push(images[i].result.variants[0]);
          }

          values?.images?.forEach((image) => {
            if (!(image.file instanceof File)) {
              imagesUrl.push(image.file);
            }
          });

          const imagesTitle: string[] = [];

          values?.images?.forEach((image) => imagesTitle.push(image.title));

          if (!openEdit) {
            const { title, imageTitle, category, tags, authors, story } =
              values;

            const article = {
              title,
              category,
              tags,
              authors,
              story: story,
              image: image,
              imageTitle,
              images: imagesUrl,
              isDraft,
              imagesTitle,
            };

            mutate(article);
            form.reset({
              title: "",
              image: "",
              category: "",
              authors: [],
              imageTitle: "",
              story: "",
              tags: [],
              images: [],
            });

            setIsSubmitting(false);
            setOpen(false);
          } else {
            const { title, imageTitle, category, tags, authors, story } =
              values;
            const article = {
              title,
              category,
              tags,
              authors,
              story: story,
              image: image,
              imageTitle,
              images: imagesUrl,
              isDraft,
              imagesTitle,
              articleId,
            };

            mutateEditArticle(article);
            setIsSubmitting(false);
            setOpenEdit(false);
          }
        }
      }
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
      setOpenEdit(false);
      setOpen(false);
    } finally {
      setIsSubmitting(false);
      setOpen(false);
      setOpenEdit(false);
    }
  };

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
      <form id="form-article">
        <DialogTitle>Create an article</DialogTitle>
        <FieldGroup>
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-title">Title</FieldLabel>
                <Input
                  {...field}
                  id="form-title"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter title..."
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
            name="imageTitle"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-title">Image Title:</FieldLabel>
                <Input
                  {...field}
                  id="form-image-title"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter Image title..."
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="category"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-title">
                  Category (Keyword):
                </FieldLabel>
                <Input
                  {...field}
                  id="form-category"
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter Category or Keyword..."
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="story"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-story">Story</FieldLabel>
                <EditorComponent value={field.value} setValue={form.setValue} />
              </Field>
            )}
          />
          <Controller
            name="tags"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-tags">Tags:</FieldLabel>
                <Input
                  {...form.register("tags")}
                  value={inputTagValue}
                  placeholder="Press enter to add Tags"
                  ref={inputTagRef}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                  onChange={(e) => setInputTagValue(e.target.value)}
                />
                <div className="mt-2 flex gap-2">
                  {tags?.map((tag: string, idx: number) => (
                    <Button key={idx} variant="outline" type="button">
                      {tag}
                      <span
                        onClick={() => removeTag(tag)}
                        aria-label={`Remove ${tag}`}
                      >
                        x
                      </span>
                    </Button>
                  ))}
                </div>
              </Field>
            )}
          />
          <Controller
            name="images"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Images</FieldLabel>
                <Input
                  type="file"
                  accept="images/*"
                  multiple
                  onChange={handleImagesChange}
                />
                <div className="">
                  {fields.map((field, index) => {
                    const file = form.watch(`images.${index}.file`);
                    let preview: string | null = null;

                    if (file instanceof File) {
                      preview = URL.createObjectURL(file);
                    } else if (typeof file === "string") {
                      preview = file;
                    }

                    const fallbackPreview =
                      !preview &&
                      imagesPreview?.[index] &&
                      imagesPreview[index].trim() !== ""
                        ? imagesPreview[index]
                        : null;

                    const finalPreview = preview || fallbackPreview;
                    return (
                      <div className="pb-4" key={field.id}>
                        {preview ? (
                          <div className="relative w-64! h-40">
                            <Image
                              key={index}
                              src={preview}
                              alt="Preview"
                              width={240}
                              height={240}
                              className="object-cover rounded-lg w-full h-full"
                            />

                            <Button
                              variant="secondary"
                              className="text-lg cursor-pointer w-4 h-4 p-4 flex items-center 
                            justify-center font-bold  absolute right-2 top-2 rounded-full shadow"
                              onClick={() => remove(index)}
                            >
                              X
                            </Button>
                          </div>
                        ) : (
                          finalPreview && (
                            <div className="relative w-[70%]">
                              <Image
                                src={finalPreview}
                                alt="Preview"
                                width={240}
                                height={240}
                                className="object-cover rounded-lg w-full h-full"
                              />
                              <Button
                                variant="secondary"
                                className="absolute right-2 top-2 w-6 h-6 p-1"
                                onClick={() => remove(index)}
                                type="button"
                              >
                                X
                              </Button>
                            </div>
                          )
                        )}
                        <Controller
                          control={form.control}
                          name={`images.${index}.title`}
                          render={({ field, fieldState }) => (
                            <Field
                              data-invalid={fieldState.invalid}
                              className="pt-2"
                            >
                              <FieldLabel>
                                Title for Image {index + 1}
                              </FieldLabel>
                              <Input
                                placeholder={`Enter image title ${index + 1}`}
                                {...field}
                              />
                            </Field>
                          )}
                        />
                      </div>
                    );
                  })}
                </div>
              </Field>
            )}
          />
          <Controller
            name="authors"
            control={form.control}
            render={({ field, fieldState }) => (
              <Command>
                <CommandInput placeholder="Select authors" />
                {users?.map((user: User) => (
                  <CommandItem
                    key={user?.id}
                    onSelect={() => {
                      const newSelection = field?.value?.includes(user.id)
                        ? field.value.filter((a) => a !== user.id)
                        : [...field.value, user.id];
                      field.onChange(newSelection);
                    }}
                  >
                    <Image
                      src={user?.image as string}
                      alt={`${user?.name} Profile`}
                      height={100}
                      width={100}
                      className="h-8 w-8 rounded-2xl object-cover cursor-pointer"
                    />
                    <span className="cursor-pointer">{user?.name}</span>
                    {field?.value?.includes(user?.id) && (
                      <span className="cursor-pointer">✅</span>
                    )}
                  </CommandItem>
                ))}
              </Command>
            )}
          />
        </FieldGroup>

        <div className="flex gap-2">
          <Button
            type="button"
            onClick={form.handleSubmit((v) => onSubmit(v, true))}
            disabled={isSubmitting}
            className="cursor-pointer"
          >
            {isSubmitting ? "Saving Draft..." : "Save Draft"}
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            onClick={form.handleSubmit((v) => onSubmit(v, false))}
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

export default ArticleDialog;
