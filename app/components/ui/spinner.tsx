import { ProgressBarRound } from "@carbon/icons-react";

import { cn } from "~/lib/utils";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    // @ts-ignore
    <ProgressBarRound
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
}

export { Spinner };
