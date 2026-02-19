import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  cn(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium font-mono uppercase tracking-wide",
    "ring-offset-background transition-all duration-300",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-95"
  ),
  {
    variants: {
      variant: {
        default: cn(
          "bg-primary text-primary-foreground",
          "hover:bg-primary/90 hover:shadow-[0_0_20px_hsl(var(--primary)/0.4)]"
        ),
        outline: cn(
          "border border-primary/50 bg-transparent text-primary",
          "hover:bg-primary/10 hover:border-primary hover:shadow-[0_0_15px_hsl(var(--primary)/0.2)]"
        ),
        ghost: cn(
          "text-muted-foreground",
          "hover:bg-muted/50 hover:text-foreground"
        ),
        destructive: cn(
          "border border-red-500/50 bg-red-500/10 text-red-400",
          "hover:bg-red-500/20 hover:border-red-500 hover:shadow-[0_0_15px_hsl(0_90%_55%/0.3)]"
        ),
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-12 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
