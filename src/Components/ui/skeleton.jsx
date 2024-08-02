import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (<div className={cn("animate-pulse bg-gray-400 rounded-none  ", className)} {...props} />);
}

export { Skeleton };
