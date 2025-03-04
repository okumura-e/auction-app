import { useEffect, useState } from "react";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setPulse((prev) => !prev), 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={`${pulse ? "bg-muted" : "bg-background"} rounded-md ${
        className || ""
      }`}
      {...props}
    />
  );
}

export { Skeleton };

