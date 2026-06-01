"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main style={{ display: "block", width: "100%", height: "100vh" }}>
      <div
        className={cn("relative h-[100vh] w-full overflow-hidden", className)}
        {...props}
      >
        {/* Aurora layer */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className={cn(
              "absolute -inset-[10px] will-change-transform",
              "animate-aurora",
              showRadialGradient
                ? "[mask-image:radial-gradient(ellipse_at_50%_50%,black_40%,transparent_80%)]"
                : ""
            )}
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  100deg,
                  #bfdbfe 0%,
                  #c7d2fe 12%,
                  #ddd6fe 24%,
                  #e0e7ff 36%,
                  #bfdbfe 48%
                )
              `,
              backgroundSize: "400% 400%",
              filter: "blur(32px)",
              opacity: 0.35,
            }}
          />
        </div>
        {children}
      </div>
    </main>
  );
};
