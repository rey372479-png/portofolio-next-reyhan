import Link from "next/link";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c1121f] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[#203b5d] text-white hover:bg-[#30435d] dark:bg-sky-200 dark:text-gray-900 dark:hover:bg-sky-100",
        outline:
          "border border-[#203b5d] text-[#203b5d] hover:bg-[#203b5d] hover:text-white dark:border-sky-200 dark:text-sky-200 dark:hover:bg-sky-200 dark:hover:text-gray-900",
        ghost:
          "text-[#203b5d] hover:bg-[#f1f8ed] dark:text-sky-200 dark:hover:bg-gray-800",
      },
      size: {
        default: "px-4 py-2",
        sm: "px-3 py-1 text-sm",
        lg: "px-5 py-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export function Button({ className, variant, size, asChild = false, ...props }) {
  if (asChild) {
    return (
      <Link
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }

  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { buttonVariants };
