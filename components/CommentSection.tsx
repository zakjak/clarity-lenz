import { useAddComment, useComments } from "@/hooks/useComments";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, Form, useForm } from "react-hook-form";
import z from "zod";
import CommentsSkeleton from "./CommentsSkeleton";
import { Field, FieldError } from "./ui/field";
import { Textarea } from "./ui/textarea";
import { groupNumbers } from "@/lib/utils/helpers";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";
import { IoIosSend } from "react-icons/io";
import { CommentProp } from "@/lib/types/article";
import { User } from "@/lib/types/users";
import Comment from "./Comment";
import { Skeleton } from "./ui/skeleton";
import { FaArrowDown } from "react-icons/fa";

const commentSchema = z.object({
  comment: z
    .string()
    .min(1, {
      message: "Comment can not be empty",
    })
    .trim()
    .max(300, { message: "Comment must not be more than 300 characters" }),
});

export type CommentFormValues = z.infer<typeof commentSchema>;

const CommentSection = ({
  postId,
  ownerId,
  inView,
}: {
  postId: number;
  ownerId: string;
  inView: boolean;
}) => {
  const { mutate, isPending } = useAddComment();

  const {
    data: comments,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
  } = useComments(postId, inView);

  const allComments =
    comments?.pages?.flatMap((page) => page.articleComments) ?? [];

  const form = useForm<z.infer<typeof commentSchema>>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit = (values: CommentFormValues) => {
    const commentSection = {
      postId,
      ownerId,
      comment: values.comment,
    };

    mutate(commentSection);
    form.reset();
  };

  const isExisting =
    allComments &&
    allComments?.[allComments.length - 1]?.comment?.id !==
      comments?.pages[0]?.lastComment[0]?.id;

  const loadComment = () => {
    fetchNextPage();
  };

  if (!inView && isLoading) {
    return <CommentsSkeleton />;
  }

  const commentCount = comments?.pages[0]?.commentCount ?? 0;

  return (
    <div>
      <div className="flex items-center gap-2 mb-4 md:text-2xl text-lg ">
        <h2 className=" font-semibold my-2">Join the Conversation</h2>
        <span className="dark:text-white shadow-2xl font-bold">
          ({groupNumbers(commentCount)} comments )
        </span>
      </div>
      <form
        className="flex gap-2 border rounded-xl pb-5 relative"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Controller
          control={form.control}
          name="comment"
          render={({ field, fieldState }) => (
            <Field className="w-full" data-invalid={fieldState.invalid}>
              <Textarea
                className="min-h-24 max-h-24 w-[90%] bg-transparent! border-none no-scrollbar"
                placeholder="Enter comment..."
                {...field}
                aria-invalid={fieldState.invalid}
              />

              <div className="pl-2">
                <p>
                  Characters:{" "}
                  <span
                    className={`${
                      form.getValues("comment").length < 300
                        ? "dark:text-white"
                        : "text-red-500"
                    }`}
                  >
                    {300 - form.getValues("comment").length}
                  </span>
                </p>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </div>
            </Field>
          )}
        />
        <Button
          className="absolute bottom-2 right-4 rounded-full cursor-pointer"
          size="icon"
          type="submit"
          disabled={isPending}
        >
          {isPending ? <Spinner /> : <IoIosSend />}
        </Button>
      </form>

      <div className="my-2 pb-5 mt-8">
        {allComments?.map((item) => {
          if (!item) return null;
          const { comment, user }: { comment: CommentProp; user: User } = item;

          return (
            <Comment
              key={comment?.id}
              comment={comment}
              users={user}
              ownerId={ownerId}
              postId={comment?.postId}
            />
          );
        })}

        {isFetchingNextPage ? (
          <Skeleton />
        ) : isExisting ? (
          <div className=" flex items-center text-center justify-center">
            <Button
              onClick={loadComment}
              className="cursor-pointer flex items-center text-sm font-semibold"
            >
              Show more
              <FaArrowDown />
            </Button>
          </div>
        ) : (
          <p className="text-gray-400 text-center">
            {allComments?.length ? "No more comments" : "No Comments"}
          </p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
