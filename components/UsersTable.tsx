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
import { useToggleAdmin, useToggleCoAuthor } from "@/hooks/useDashboard";
import { Skeleton } from "./ui/skeleton";

const UsersTable = ({ users }: { users: User[] }) => {
  const [admin, setAdmin] = useState(false);
  const [coAuthor, setCoAuthor] = useState(false);
  const [activeUserId, setActiveUserId] = useState<string | null>(null);

  const { mutate: mutateAdmin, isPending: pendingAdmin } =
    useToggleAdmin(admin);

  const { mutate: mutateCoAuthor, isPending: pendingCoAuthor } =
    useToggleCoAuthor(coAuthor);

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions: Admin</TableHead>
            <TableHead>Actions: Co-Author</TableHead>
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
                    "Admin (Author)"
                  ) : !user?.isAdmin && user?.isOwner ? (
                    "Co-Author"
                  ) : (
                    "Subscriber"
                  )}
                </TableCell>
                <TableCell className="">
                  <Select
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
                  <Button variant="destructive">Delete</Button>
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
