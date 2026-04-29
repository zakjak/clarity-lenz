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
import { useToggleAdmin } from "@/hooks/useDashboard";

const UsersTable = ({ users }: { users: User[] }) => {
  const [admin, setAdmin] = useState(false);
  const [coAuthor, setCoAuthor] = useState(false);

  const { mutate, data: toggleAdmin } = useToggleAdmin(admin);

  const { data: savedEvent, isLoading } = useSavedEvent(
    session?.user?.id as string,
  );

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions: Admin</TableHead>
            <TableHead>Actions: Co-Author</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
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
                {user?.isAdmin && user?.isOwner
                  ? "Admin (Author)"
                  : !user?.isAdmin && user?.isOwner
                    ? "Co-Author"
                    : "Subscriber"}
              </TableCell>
              <TableCell className="">
                <Select
                  value={admin}
                  onValueChange={(val) => {
                    setAdmin(val === "yes");
                    mutate(user?.id);
                  }}
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
                  value={user?.isOwner ? "yes" : "no"}
                  onValueChange={(val) => setCoAuthor(val === "yes")}
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersTable;
