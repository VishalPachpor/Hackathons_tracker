import NextLink from "next/link";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export type LinkProps = ComponentProps<typeof NextLink>;

export function Link({ className, children, ...props }: LinkProps) {
  return (
    <NextLink
      className={cn(
        "text-primary hover:text-primary/80 underline-offset-4 hover:underline",
        className
      )}
      {...props}
    >
      {children}
    </NextLink>
  );
}
