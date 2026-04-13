import {
  useAddComment,
  useDeleteComment,
  useEditComment,
} from "@/hooks/useComments";
import { useAddVotes, useVotes, VoteProps } from "@/hooks/useVotes";
import { CommentProp } from "@/lib/types/article";
import { User } from "@/lib/types/users";
import { calculateTime } from "@/lib/utils/helpers";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IoIosSend, IoIosThumbsDown, IoIosThumbsUp } from "react-icons/io";
import { IoThumbsDownOutline, IoThumbsUpOutline } from "react-icons/io5";
import { MdMessage } from "react-icons/md";
import z from "zod";
import { commentSchema } from "./Comment";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CiMenuKebab } from "react-icons/ci";
import { Field, FieldError } from "./ui/field";

export type CommentFormValues = z.infer<typeof commentSchema>;

const CommentContent = ({
  users,
  comment,
  postId,
  ownerId,
  parentUser,
}: {
  users: User;
  comment: CommentProp;
  postId: number;
  ownerId: string;
  parentUser: string;
}) => {
  const [expanded, setExpanded] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { mutate: deleteComment } = useDeleteComment();
  const [needsTruncate, setNeedsTruncate] = useState(false);
  const elRef = useRef<HTMLDivElement>(null);

  const { mutate: mutateVotes, isPending: isVotesPending } = useAddVotes();
  const { mutate, isPending } = useAddComment();
  const { mutate: mutateEdit, isPending: isPendingEdit } = useEditComment();

  const { data } = useVotes(comment?.id);

  const voteComment = (data: VoteProps) => {
    mutateVotes(data);
  };

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
      parentId: comment?.id,
    };

    const commentEdit = {
      comment: values.comment,
      parentId: comment?.id,
    };

    if (isReply) {
      mutate(commentSection);
    } else {
      mutateEdit(commentEdit);
    }

    form.reset();

    if (isPending) {
      setIsReply(false);
    } else {
      setIsReply(true);
    }
  };

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const checkOverflow = () => {
      const isOverflowing = el.scrollHeight > el.clientHeight + 1;
      setNeedsTruncate(isOverflowing);
    };

    checkOverflow();

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(checkOverflow);
      ro.observe(el);
    } else {
      window.addEventListener("resize", checkOverflow);
    }

    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", checkOverflow);
    };
  }, [comment.comment, expanded]);

  useEffect(() => {
    const applyValues = () => {
      if (isEditing) {
        form.setValue("comment", comment.comment);
        setIsReply(false);
      }

      if (isReply) {
        form.setValue("comment", "");
        setIsEditing(false);
      }
    };
    applyValues();
  }, [comment.comment, isReply, form, isEditing]);

  return (
    <div className="flex gap-2">
      <Image
        className="w-8 h-8 object-cover rounded-full"
        src={users?.image || ""}
        alt={`Image of ${users?.name}`}
        height={200}
        width={2000}
      />
      <div className="flex justify-between w-full">
        <div className="w-[90%]">
          <div className="text-sm">
            <div className="flex gap-2">
              <span className="font-semibold">{users?.name}</span>
              <span className="text-zinc-400">
                {calculateTime(comment?.date)}
              </span>
            </div>
            {parentUser && (
              <p className="text-zinc-400">
                <span>Replying to </span>
                {parentUser}
              </p>
            )}
          </div>
          <div className="relative">
            <p
              ref={elRef}
              className={`${
                expanded
                  ? "whitespace-pre-line"
                  : "line-clamp-4 whitespace-pre-line"
              }`}
            >
              {comment?.comment}
            </p>
            {needsTruncate && (
              <Button variant="ghost" onClick={() => setExpanded(!expanded)}>
                {expanded ? "Read less" : "Read more..."}
              </Button>
            )}

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {data?.voteComment?.vote === 1 ? (
                  <IoIosThumbsUp
                    onClick={() =>
                      voteComment({
                        commentId: comment?.id,
                        type: 1,
                        userId: users.id,
                      })
                    }
                    className="cursor-pointer"
                  />
                ) : (
                  <IoThumbsUpOutline
                    onClick={() =>
                      voteComment({
                        commentId: comment?.id,
                        type: 1,
                        userId: users.id,
                      })
                    }
                    className="cursor-pointer"
                  />
                )}
                <span>{data?.likes}</span>
              </div>
              <div className="flex items-center gap-1">
                {data?.voteComment?.vote === -1 ? (
                  <IoIosThumbsDown
                    onClick={() =>
                      voteComment({
                        commentId: comment?.id,
                        type: -1,
                        userId: users.id,
                      })
                    }
                    className="cursor-pointer"
                  />
                ) : (
                  <IoThumbsDownOutline
                    onClick={() =>
                      voteComment({
                        commentId: comment?.id,
                        type: -1,
                        userId: users.id,
                      })
                    }
                    className="cursor-pointer"
                  />
                )}
                <span>{data?.dislikes}</span>
              </div>
              <div
                onClick={() => setIsReply(!isReply)}
                className="flex items-center gap-1 cursor-pointer"
              >
                <MdMessage /> reply
              </div>
            </div>
            {(isReply || isEditing) && (
              <div className="absolue">
                <form
                  className="flex gap-2 border rounded-xl pb-5 relative"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <Controller
                    control={form.control}
                    name="comment"
                    render={({ field, fieldState }) => (
                      <Field className="w-full">
                        <Textarea
                          className="min-h-[4em] max-h-16 w-[90%] bg-transparent! border-none! outline-none! focus:ring-0!"
                          placeholder="Enter comment..."
                          {...field}
                        />

                        <div className="pl-2">
                          <p className="text-sm">
                            Characters:{" "}
                            <span
                              className={`${
                                form.getValues("comment").length < 300
                                  ? "text-white"
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
              </div>
            )}
          </div>
        </div>
        <div className="bg-zinc-200 text-blaxk hover:bg-zinc-500 cursor-pointer w-6 h-6 text-black flex items-center rounded-full justify-center">
          {comment?.ownerId === ownerId && (
            <Popover>
              <PopoverTrigger>
                <CiMenuKebab />
              </PopoverTrigger>
              <PopoverContent className="mt-2 flex flex-col items-start mr-4">
                <AlertDialog>
                  <AlertDialogTrigger className="text-red-400 font-semibold cursor-pointer px-3">
                    Delete
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to delete this comment?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this comment?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteComment(comment?.id)}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Button
                  variant="ghost"
                  onClick={() => setIsEditing(!isEditing)}
                  className="mt-2 w-full justify-start"
                >
                  Edit
                </Button>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentContent;
