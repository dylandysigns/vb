import { useRef, useEffect, useState, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  duration?: number;
  once?: boolean;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  distance = 40,
  duration = 700,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && ref.current) observer.unobserve(ref.current);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [once]);

  const getTransform = () => {
    if (direction === "none") return "translate3d(0,0,0)";
    const map = {
      up: `translate3d(0, ${distance}px, 0)`,
      down: `translate3d(0, -${distance}px, 0)`,
      left: `translate3d(${distance}px, 0, 0)`,
      right: `translate3d(-${distance}px, 0, 0)`,
    };
    return map[direction];
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translate3d(0,0,0)" : getTransform(),
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

export function StaggerChildren({
  children,
  className = "",
  staggerDelay = 100,
  direction = "up" as "up" | "down" | "left" | "right" | "none",
  distance = 30,
}: {
  children: ReactNode[];
  className?: string;
  staggerDelay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
}) {
  return (
    <div className={className}>
      {(children as ReactNode[]).map((child, i) => (
        <ScrollReveal key={i} delay={i * staggerDelay} direction={direction} distance={distance}>
          {child}
        </ScrollReveal>
      ))}
    </div>
  );
}
