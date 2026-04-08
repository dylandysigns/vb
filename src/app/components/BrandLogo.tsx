import type { ImgHTMLAttributes } from "react";
import wordmarkLogo from "../../assets/866a497a9b00e621a1fd3a06b52178b660fb5a92.png";

type BrandLogoProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "width" | "height"> & {
  priority?: boolean;
};

export function BrandLogo({ className, alt = "Verkeersschool Beckers", priority = false, ...props }: BrandLogoProps) {
  return (
    <img
      src={wordmarkLogo}
      alt={alt}
      width={600}
      height={129}
      decoding="async"
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      draggable={false}
      className={className}
      {...props}
    />
  );
}
