"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "framer-motion";

const cornerSVG = (
  <svg className="pointer-events-none absolute inset-0 z-20 h-full w-full" aria-hidden>
    <rect x="0" y="0" width="100%" height="100%" rx="4" ry="4"
      fill="none" stroke="rgba(121,187,195,0.15)" strokeWidth="0.5" opacity="0.4" />
    <line x1="0" y1="0" x2="24" y2="0" stroke="rgba(121,187,195,0.6)" strokeWidth="1" opacity="0.6" />
    <line x1="0" y1="0" x2="0" y2="24" stroke="rgba(121,187,195,0.6)" strokeWidth="1" opacity="0.6" />
    <line x1="100%" y1="0" x2="calc(100% - 24px)" y2="0" stroke="rgba(121,187,195,0.6)" strokeWidth="1" opacity="0.6" />
    <line x1="100%" y1="0" x2="100%" y2="24" stroke="rgba(121,187,195,0.6)" strokeWidth="1" opacity="0.6" />
    <line x1="0" y1="100%" x2="24" y2="100%" stroke="rgba(121,187,195,0.6)" strokeWidth="1" opacity="0.6" />
    <line x1="0" y1="100%" x2="0" y2="calc(100% - 24px)" stroke="rgba(121,187,195,0.6)" strokeWidth="1" opacity="0.6" />
    <line x1="100%" y1="100%" x2="calc(100% - 24px)" y2="100%" stroke="rgba(121,187,195,0.6)" strokeWidth="1" opacity="0.6" />
    <line x1="100%" y1="100%" x2="100%" y2="calc(100% - 24px)" stroke="rgba(121,187,195,0.6)" strokeWidth="1" opacity="0.6" />
  </svg>
);

type BentoCardVariant = "glass" | "elevated" | "flat" | "compact" | "danger" | "success" | "warning";
type HoverEffect = "lift" | "glow" | "scale" | "none";

type BentoCardProps = React.ComponentProps<"div"> & {
  children: React.ReactNode;
  variant?: BentoCardVariant;
  hoverEffect?: HoverEffect;
};

const variantStyles: Record<BentoCardVariant, {
  container: string;
  hoverBorderColor: string;
  hoverBg: string;
}> = {
  glass: {
    container:
      "rounded-[4px] border border-[rgba(121,187,195,0.12)] bg-[rgba(5,14,18,0.75)] p-6",
    hoverBorderColor: "rgba(121,187,195,0.40)",
    hoverBg: "rgba(5,14,18,0.85)",
  },
  elevated: {
    container:
      "rounded-[4px] border border-[rgba(121,187,195,0.15)] bg-[rgba(5,14,18,0.75)] p-6",
    hoverBorderColor: "rgba(121,187,195,0.40)",
    hoverBg: "rgba(5,14,18,0.85)",
  },
  flat: {
    container:
      "rounded-[4px] border-0 bg-[rgba(5,14,18,0.5)] p-6",
    hoverBorderColor: "transparent",
    hoverBg: "rgba(5,14,18,0.6)",
  },
  compact: {
    container:
      "rounded-[4px] border border-[rgba(121,187,195,0.12)] bg-[rgba(5,14,18,0.75)] p-6",
    hoverBorderColor: "rgba(121,187,195,0.40)",
    hoverBg: "rgba(5,14,18,0.85)",
  },
  danger: {
    container:
      "rounded-[4px] border border-[rgba(239,68,68,0.25)] bg-[rgba(5,14,18,0.75)] p-6",
    hoverBorderColor: "rgba(239,68,68,0.5)",
    hoverBg: "rgba(5,14,18,0.85)",
  },
  success: {
    container:
      "rounded-[4px] border border-[rgba(34,197,94,0.25)] bg-[rgba(5,14,18,0.75)] p-6",
    hoverBorderColor: "rgba(34,197,94,0.5)",
    hoverBg: "rgba(5,14,18,0.85)",
  },
  warning: {
    container:
      "rounded-[4px] border border-[rgba(245,158,11,0.25)] bg-[rgba(5,14,18,0.75)] p-6",
    hoverBorderColor: "rgba(245,158,11,0.5)",
    hoverBg: "rgba(5,14,18,0.85)",
  },
};

function getHoverVariant(hoverEffect: HoverEffect) {
  switch (hoverEffect) {
    case "lift":
      return { y: -2 };
    case "glow":
      return { y: 0 };
    case "scale":
      return { scale: 1.02 };
    case "none":
      return { y: 0 };
  }
}

export function BentoCard({ children, className, variant = "glass", hoverEffect = "lift", ...props }: BentoCardProps) {
  const v = variantStyles[variant];
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ borderColor: v.hoverBorderColor, backgroundColor: v.hoverBg, ...getHoverVariant(hoverEffect) }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn(
        "group relative overflow-hidden transition-colors duration-250",
        v.container,
        className,
      )}
      {...(props as React.ComponentProps<typeof motion.div>)}
    >
      {cornerSVG}

      <div className="pointer-events-none absolute inset-0 z-10 rounded-[4px]"
        style={{
          boxShadow: "inset 0 0 0 0.5px rgba(121,187,195,0.06)",
        }}
      />

      <div className="relative z-20">{children}</div>
    </motion.div>
  );
}

export function FeatureCard({ feature, className, ...props }: {
  feature: { title: string; icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; description: string };
} & React.ComponentProps<"div">) {
  const Icon = feature.icon;
  return (
    <BentoCard className={cn("flex flex-col", className)} {...props}>
      <Icon className="text-[var(--teal-light)] size-6 mb-4" strokeWidth={1} aria-hidden />
      <h3 className="text-sm md:text-base text-[var(--foreground)] font-light">{feature.title}</h3>
      <p className="text-[var(--teal-muted)] mt-2 text-xs font-light">{feature.description}</p>
    </BentoCard>
  );
}

export { BentoCard as GridCard };
