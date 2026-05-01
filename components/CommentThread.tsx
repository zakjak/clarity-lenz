import { useReplyComments } from "@/hooks/useComments";
import { CommentProp, ReplyProps } from "@/lib/types/article";
import { User } from "@/lib/types/users";
import CommentContent from "./CommentContent";
import { Skeleton } from "./ui/skeleton";
import { FaArrowDown } from "react-icons/fa6";
const CommentThread = ({
  comment,
  ownerId,
  users,
  depth,
}: {
  comment: CommentProp;
  ownerId: string;
  users: User;
  depth: number;
}) => {
  // const [lineHeight, setLineHeight] = useState(0);

  const {
    data: replies,
    fetchNextPage,
    isFetchingNextPage,
  } = useReplyComments(comment?.id);

  const allReplies = replies?.pages?.flatMap((page) => page.replies) ?? [];

  const showParentName = depth >= 2 ? replies?.pages[0]?.parentUser : "";

  const isExisting =
    allReplies &&
    allReplies?.[allReplies.length - 1]?.comment?.id !==
      replies?.pages[0]?.lastComment[0]?.id;

  const totalReplies =
    replies?.pages?.reduce(
      (acc, page) => acc + (page.replies?.length || 0),
      0,
    ) ?? 0;

  return (
    <div className="mt-3 relative overflow-hidden ">
      {/* {!!replies?.pages[0]?.replies?.length && (
        <div
          style={{
            height: lineHeight,
          }}
          className="w-[1px] top-8 bg-gray-300 absolute left-[15px]"
        />
      )} */}

      <div>
        <CommentContent
          key={comment?.id}
          comment={comment}
          users={users}
          ownerId={ownerId}
          postId={comment?.postId}
          parentUser={showParentName}
        />
      </div>

      {allReplies?.map((reply: ReplyProps) => (
        <div
          className={`relative ${depth >= 2 ? "" : "ml-6"} `}
          key={reply?.comment?.id}
        >
          {/* <div
            className={`absolute left-[-9px] w-3 h-6 border-l border-b border-gray-300 rounded-bl-md `}
          /> */}
          <div className={`${depth >= 1 ? "" : "ml-2"}`}>
            <CommentThread
              comment={reply?.comment}
              users={reply?.user}
              ownerId={ownerId}
              depth={depth + 1}
            />
          </div>
        </div>
      ))}

      {isFetchingNextPage ? (
        <Skeleton />
      ) : (
        isExisting && (
          <div className=" flex items-center text-center justify-center my-2">
            <div
              onClick={() => fetchNextPage()}
              className="cursor-pointer flex items-center text-sm font-semibold"
            >
              Show {replies?.pages[0]?.repliesCount - totalReplies} more replies
              <FaArrowDown />
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default CommentThread;
