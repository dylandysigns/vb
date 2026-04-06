import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(element, { autoAlpha: 1, clearProps: "all" });
      return;
    }

    const getOffset = () => {
      if (direction === "none") return { x: 0, y: 0 };
      const map = {
        up: { x: 0, y: distance },
        down: { x: 0, y: -distance },
        left: { x: distance, y: 0 },
        right: { x: -distance, y: 0 },
      };
      return map[direction];
    };

    const { x, y } = getOffset();
    const animationDuration = Math.max(duration / 1000, 0.2);

    const ctx = gsap.context(() => {
      gsap.set(element, {
        autoAlpha: 0,
        x,
        y,
        willChange: "transform, opacity",
      });

      const tween = gsap.to(element, {
        autoAlpha: 1,
        x: 0,
        y: 0,
        duration: animationDuration,
        delay: delay / 1000,
        ease: "power3.out",
        paused: true,
        overwrite: "auto",
        onComplete: () => {
          gsap.set(element, { clearProps: "willChange" });
        },
      });

      ScrollTrigger.create({
        trigger: element,
        start: "top bottom-=48px",
        once,
        onEnter: () => tween.restart(),
        onEnterBack: () => {
          if (!once) tween.restart();
        },
        onLeaveBack: () => {
          if (!once) {
            tween.pause(0);
            gsap.set(element, {
              autoAlpha: 0,
              x,
              y,
              willChange: "transform, opacity",
            });
          }
        },
      });
    }, element);

    return () => ctx.revert();
  }, [delay, direction, distance, duration, once]);

  return (
    <div ref={ref} className={className}>
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
