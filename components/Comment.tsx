import { CommentProp, ReplyProps } from "@/lib/types/article";
import { User } from "@/lib/types/users";
import { useReplyComments } from "@/hooks/useComments";
import z from "zod";
import { FaArrowDown } from "react-icons/fa6";
import { Skeleton } from "./ui/skeleton";
import CommentContent from "./CommentContent";
import CommentThread from "./CommentThread";

export const commentSchema = z.object({
  comment: z
    .string()
    .min(1, {
      message: "Comment can not be empty",
    })
    .trim()
    .max(300, { message: "Comment must not be more than 300 characters" }),
});

const Comment = ({
  comment,
  users,
  ownerId,
  postId,
}: {
  comment: CommentProp;
  users: User;
  ownerId: string;
  postId: number;
}) => {
  const {
    data: replies,
    fetchNextPage,
    isFetchingNextPage,
  } = useReplyComments(comment?.id);

  const loadReplies = () => {
    fetchNextPage();
  };

  const allReplies = replies?.pages?.flatMap((page) => page?.replies) ?? [];

  const isExisting =
    allReplies &&
    allReplies?.[allReplies?.length - 1]?.comment?.id !==
      replies?.pages[0]?.lastComment[0]?.id;

  const totalReplies =
    replies?.pages?.reduce(
      (acc, page) => acc + (page.replies?.length || 0),
      0,
    ) ?? 0;

  return (
    <div className="h-full border-b-2 mb-4">
      <div className="mb-2 pb-4 relative overflow-hidden">
        {/* {!!replies?.pages[0]?.replies?.length && (
          <div
            style={{ height: Math.max(0, lineHeight * allReplies?.length) }}
            className="w-[2px] top-8 bg-gray-300 absolute left-[15px]"
          />
        )} */}
        <div className="">
          <CommentContent
            users={users}
            comment={comment}
            postId={postId}
            ownerId={ownerId}
            parentUser=""
          />
        </div>

        {replies?.pages && (
          <div className="ml-6 mt-3  pl-4 relative">
            {allReplies?.map((reply: ReplyProps) => (
              <div key={reply?.comment?.id} className="relative">
                {/* <div
                  className="absolute 
          } top-2 w-5 h-3 border-l border-b border-gray-300 rounded-bl-md left-[-25px]"
                /> */}

                <CommentThread
                  comment={reply?.comment}
                  ownerId={ownerId}
                  users={reply?.user}
                  depth={0}
                />
              </div>
            ))}
            {isFetchingNextPage ? (
              <Skeleton />
            ) : (
              isExisting && (
                <div className=" flex items-center text-center justify-center my-2">
                  <div
                    onClick={loadReplies}
                    className="cursor-pointer flex items-center text-sm font-semibold"
                  >
                    Show {replies?.pages[0]?.repliesCount - totalReplies} more
                    replies
                    <FaArrowDown />
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
