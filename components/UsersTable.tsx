"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/lib/types/users";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";
import {
  useDeleteUser,
  useToggleAdmin,
  useToggleCoAuthor,
} from "@/hooks/useDashboard";
import { Skeleton } from "./ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Badge } from "./ui/badge";
import { useSession } from "next-auth/react";

const UsersTable = ({ users }: { users: User[] }) => {
  const [admin, setAdmin] = useState(false);
  const { data: session } = useSession();
  const [coAuthor, setCoAuthor] = useState(false);
  const [activeUserId, setActiveUserId] = useState<string | null>(null);

  const { mutate: mutateAdmin, isPending: pendingAdmin } =
    useToggleAdmin(admin);

  const { mutate: mutateCoAuthor, isPending: pendingCoAuthor } =
    useToggleCoAuthor(coAuthor);

  const { mutate: deleteUser } = useDeleteUser();

  return (
    <div className="">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-25 font-bold">Name</TableHead>
            <TableHead className="font-bold">Email</TableHead>
            <TableHead className="font-bold">Status</TableHead>
            <TableHead className="font-bold">Actions: Admin</TableHead>
            <TableHead className="font-bold">Actions: Co-Author</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user) => {
            return (
              <TableRow key={user?.id}>
                <TableCell className="font-medium flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={user?.image as string} />
                    <AvatarFallback>{user?.name?.slice(1)}</AvatarFallback>
                  </Avatar>
                  {user?.name}
                </TableCell>
                <TableCell>{user?.email}</TableCell>
                <TableCell>
                  {pendingAdmin ||
                  (pendingCoAuthor && activeUserId === user.id) ? (
                    <Skeleton className="w-full h-4" />
                  ) : user?.isAdmin && user?.isOwner ? (
                    <Badge className="bg-yellow-200 text-yellow-900 uppercase">
                      Admin (Author)
                    </Badge>
                  ) : !user?.isAdmin && user?.isOwner ? (
                    <Badge
                      variant="outline"
                      className="uppercase border-amber-400"
                    >
                      Co-Author
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="opacity-60">
                      Subscriber
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="">
                  <Select
                    disabled={user?.id === session?.user?.id}
                    onValueChange={(val) => {
                      setActiveUserId(null);
                      setActiveUserId(user.id);
                      setAdmin(val === "yes");
                      mutateAdmin(user?.id);
                    }}
                    value={user?.isAdmin ? "yes" : "no"}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Change status: Admin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>
                          Status (Make Admin: Ability to have full access)
                        </SelectLabel>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="">
                  <Select
                    disabled={user?.id === session?.user?.id}
                    onValueChange={(val) => {
                      setActiveUserId(null);
                      setCoAuthor(val === "yes");
                      setActiveUserId(user.id);
                      mutateCoAuthor(user?.id);
                    }}
                    value={user?.isOwner ? "yes" : "no"}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Change status: Co-Author" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status (Co-Author)</SelectLabel>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        disabled={user?.id === session?.user?.id}
                      >
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogHeader>
                          Are you absolutely sure?
                        </AlertDialogHeader>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the user from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          variant="destructive"
                          onClick={() => deleteUser(user?.id)}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersTable;
