import type { ImgHTMLAttributes } from "react";
import blackWordmarkLogo from "../../assets/logo-zwarte-letters.svg";
import whiteWordmarkLogo from "../../assets/logo-witte-letters-only.svg";

type BrandLogoProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "width" | "height"> & {
  priority?: boolean;
  variant?: "black" | "white";
};

export function BrandLogo({
  className,
  alt = "Verkeersschool Beckers",
  priority = false,
  variant = "black",
  ...props
}: BrandLogoProps) {
  const src = variant === "white" ? whiteWordmarkLogo : blackWordmarkLogo;
  const width = variant === "white" ? 860 : 4248.77;
  const height = variant === "white" ? 154 : 761.99;

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      decoding="async"
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      draggable={false}
      className={className}
      {...props}
    />
  );
}
