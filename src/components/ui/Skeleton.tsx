import { twMerge } from "tailwind-merge";

interface SkeletonProps {
  className?: string;
}

export function Skeleton(props: SkeletonProps) {
  const { className } = props;
  return (
    <div
      className={twMerge("animate-pulse rounded-2xl bg-surface-300", className)}
    ></div>
  );
}
