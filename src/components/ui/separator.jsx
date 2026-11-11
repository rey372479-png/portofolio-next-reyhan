import { cn } from "@/lib/utils";

export function Separator({ className, ...props }) {
  return (
    <div
      role="separator"
      className={cn("my-8 h-px w-full bg-gray-200 dark:bg-gray-700", className)}
      {...props}
    />
  );
}
