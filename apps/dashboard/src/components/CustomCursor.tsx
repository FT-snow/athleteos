"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMouse = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(
        "a, button, input, select, textarea, [role='button'], [tabindex]:not([tabindex='-1']), [data-hoverable]"
      );
      if (target) cursor.classList.add("expanded");
    };

    const onOut = () => cursor.classList.remove("expanded");

    const onDown = () => cursor.classList.add("clicking");
    const onUp = () => cursor.classList.remove("clicking");

    gsap.ticker.add(() => {
      posRef.current.x += (mouseRef.current.x - posRef.current.x) * 0.15;
      posRef.current.y += (mouseRef.current.y - posRef.current.y) * 0.15;
      gsap.set(cursor, {
        x: posRef.current.x,
        y: posRef.current.y,
      });
    });

    window.addEventListener("mousemove", onMouse);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMouse);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      gsap.ticker.lagSmoothing(0);
    };
  }, []);

  return <div id="custom-cursor" ref={cursorRef} />;
}
