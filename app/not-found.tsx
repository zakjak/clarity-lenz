import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h1 className="text-4xl font-bold">404 - Article Not Found</h1>
      <p className="mt-4 text-gray-500">
        {"The article you're looking for does not exist."}
      </p>
      <Button className="mt-2">
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
