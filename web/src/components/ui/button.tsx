import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none rounded-full",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-accent)] text-white hover:bg-red-500 focus-visible:ring-[var(--color-accent)]",
        secondary:
          "bg-white text-[var(--color-foreground)] border border-[var(--color-border)] hover:border-red-200 hover:text-[var(--color-accent)]",
        ghost:
          "text-[var(--color-foreground)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent-soft)]",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-base",
        lg: "h-12 px-7 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, type, ...props }, ref) => {
    const classNames = twMerge(buttonVariants({ variant, size }), className);

    if (asChild) {
      return <Slot className={classNames} {...props} />;
    }

    return (
      <button
        ref={ref}
        type={type ?? "button"}
        className={classNames}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { buttonVariants };
