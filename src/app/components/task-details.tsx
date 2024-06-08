"use client";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/CSnUOLew5zf
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { PropsWithChildren } from "react";
import { Task } from "../data/schema";

export const TaskDetails = ({
  children,
  task,
}: PropsWithChildren<{ task: Task }>) => {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const query = useSearchParams();
  const router = useRouter();

  React.useEffect(() => {
    if (query.get("task") === task.id) {
      setOpen(true);
    }
  }, [query, task.id]);

  const handleOpen = (nextOpen: boolean) => {
    setOpen(nextOpen);
    const params = new URLSearchParams(query);

    if (nextOpen) {
      params.set("task", task.id);
    } else {
      params.delete("task");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Task Details - {task.id}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Task ID</Label>
              <p>{task.id}</p>
            </div>
            <div>
              <Label>Name</Label>
              <p>{task.title}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label>Label</Label>
              <Badge variant="outline" className="w-fit">
                {task.label}
              </Badge>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Status</Label>
              <Badge
                variant="outline"
                className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 w-fit"
              >
                {task.status}
              </Badge>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label>Priority</Label>
              <Badge
                variant="outline"
                className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 w-fit"
              >
                {task.priority}
              </Badge>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Assigned To</Label>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>NL</AvatarFallback>
                </Avatar>
                <p>Nicolas Lopes</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
