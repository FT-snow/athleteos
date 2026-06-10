"use client";

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface StaggeredMenuProps {
  onNavigate?: (label: string) => void;
}

const ITEMS = [
  { label: "Profile" },
  { label: "Form IQ" },
  { label: "Rehab" },
  { label: "Recovery" },
  { label: "Sleep" },
  { label: "NutriSync" },
  { label: "AI Coach" },
  { label: "Settings" },
  { label: "Login" },
];

export function StaggeredMenu({ onNavigate }: StaggeredMenuProps) {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const busyRef = useRef(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const preLayersRef = useRef<HTMLDivElement>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);
  const navListRef = useRef<HTMLUListElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const toggleTextRef = useRef<HTMLSpanElement>(null);
  const plusHRef = useRef<HTMLSpanElement>(null);
  const plusVRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      const plusH = plusHRef.current;
      const plusV = plusVRef.current;

      if (!panel || !plusH || !plusV) return;

      let preLayers: HTMLElement[] = [];
      if (preContainer) {
        preLayers = Array.from(preContainer.querySelectorAll(".menu-prelayer"));
      }
      preLayerElsRef.current = preLayers;

      gsap.set([panel, ...preLayers], { xPercent: 100, opacity: 1 });
      gsap.set(plusH, { rotate: 0, transformOrigin: "50% 50%" });
      gsap.set(plusV, { rotate: 90, transformOrigin: "50% 50%" });
    });
    return () => ctx.revert();
  }, []);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    const navList = navListRef.current;
    const plusH = plusHRef.current;
    const plusV = plusVRef.current;
    const toggleText = toggleTextRef.current;
    if (!panel || !navList || !plusH || !plusV || !toggleText) { busyRef.current = false; return; }

    const links = Array.from(navList.querySelectorAll<HTMLElement>(".menu-link"));
    const footer = panel.querySelector<HTMLElement>(".menu-footer");

    gsap.set(links, { yPercent: 140, rotate: 10 });
    if (footer) gsap.set(footer, { opacity: 0 });

    const tl = gsap.timeline({ onComplete: () => { busyRef.current = false; } });

    layers.forEach((layer, i) => {
      tl.to(layer, { xPercent: 0, duration: 0.5, ease: "power4.out" }, i * 0.07);
    });

    const lastTime = layers.length ? (layers.length - 1) * 0.07 : 0;
    const panelInsert = lastTime + (layers.length ? 0.08 : 0);

    tl.to(panel, { xPercent: 0, duration: 0.65, ease: "power4.out" }, panelInsert)
      .to(plusH, { rotate: 45, duration: 0.5, ease: "power4.out" }, 0)
      .to(plusV, { rotate: -45, duration: 0.5, ease: "power4.out" }, 0)
      .to(toggleText, { textContent: "Close", duration: 0.3 }, 0.2)
      .to(
        links,
        {
          yPercent: 0,
          rotate: 0,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.08,
        },
        panelInsert + 0.1,
      )
      .to(footer, { opacity: 1, duration: 0.4 }, panelInsert + 0.4);
  }, []);

  const playClose = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    const plusH = plusHRef.current;
    const plusV = plusVRef.current;
    const toggleText = toggleTextRef.current;
    if (!panel || !plusH || !plusV || !toggleText) return;

    const all = [...layers, panel];

    const tl = gsap.timeline({ onComplete: () => { busyRef.current = false; } });

    tl.to(all, { xPercent: 100, duration: 0.35, ease: "power3.in" }, 0)
      .to(plusH, { rotate: 0, duration: 0.35, ease: "power3.inOut" }, 0)
      .to(plusV, { rotate: 90, duration: 0.35, ease: "power3.inOut" }, 0)
      .to(toggleText, { textContent: "Menu", duration: 0.3 }, 0.1);
  }, []);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);
    if (target) playOpen();
    else playClose();
  }, [playOpen, playClose]);

  const handleNavigate = (label: string) => {
    openRef.current = false;
    setOpen(false);
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    const plusH = plusHRef.current;
    const plusV = plusVRef.current;
    const toggleText = toggleTextRef.current;
    const all = [...layers, panel].filter(Boolean);
    gsap.set(all, { xPercent: 100 });
    if (plusH) gsap.set(plusH, { rotate: 0 });
    if (plusV) gsap.set(plusV, { rotate: 90 });
    if (toggleText) gsap.set(toggleText, { textContent: "Menu" });
    busyRef.current = false;
    onNavigate?.(label);
  };

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target as Node)
      ) {
        openRef.current = false;
        setOpen(false);
        playClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, playClose]);

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {/* Prelayers (slide in behind panel) */}
      <div
        ref={preLayersRef}
        className="absolute top-0 right-0 bottom-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="menu-prelayer absolute top-0 right-0 h-full w-full" style={{ background: "#0d2026", width: "clamp(320px, 38vw, 480px)" }} />
        <div className="menu-prelayer absolute top-0 right-0 h-full w-full" style={{ background: "#09181c", width: "clamp(320px, 38vw, 480px)" }} />
        <div className="menu-prelayer absolute top-0 right-0 h-full w-full" style={{ background: "#051016", width: "clamp(320px, 38vw, 480px)" }} />
      </div>

      {/* Panel */}
      <div
        ref={panelRef}
        className="absolute top-0 right-0 h-full flex flex-col pointer-events-auto"
        style={{
          width: "clamp(320px, 38vw, 480px)",
          background: "rgba(4,12,16,0.98)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
        aria-hidden={!open}
      >
        <div className="flex-1 flex flex-col p-[6em_3em_3em_3em]">
          <nav>
            <ul ref={navListRef} className="list-none m-0 p-0 flex flex-col gap-2">
              {ITEMS.map((it) => (
                <li key={it.label} className="overflow-hidden">
                  <button
                    onClick={() => handleNavigate(it.label)}
                    className="menu-link bg-transparent border-0 text-left font-heading-tech text-[clamp(22px,2.8vw,36px)] font-normal tracking-[0.16em] text-[#A1D7D6] leading-tight transition-colors duration-200 hover:text-[var(--teal-light)] cursor-pointer"
                  >
                    {it.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="menu-footer mt-auto pt-8">
            <p className="font-ui text-[10px] font-light tracking-[0.2em] uppercase text-[rgba(121,187,195,0.3)]">
               ATHLETEOS &middot; 2026
            </p>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        ref={toggleBtnRef}
        className="absolute right-6 top-6 z-50 inline-flex items-center gap-[0.3rem] bg-transparent border-0 cursor-pointer font-label text-xs tracking-[0.14em] text-[var(--teal-light)] pointer-events-auto"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={toggleMenu}
        type="button"
      >
        <span ref={toggleTextRef} className="inline-block">Menu</span>
        <span className="relative inline-flex items-center justify-center w-[14px] h-[14px] shrink-0 will-change-transform">
          <span ref={plusHRef} className="absolute left-1/2 top-1/2 w-full h-[2px] bg-current rounded-[2px] -translate-x-1/2 -translate-y-1/2 will-change-transform" />
          <span ref={plusVRef} className="absolute left-1/2 top-1/2 w-full h-[2px] bg-current rounded-[2px] -translate-x-1/2 -translate-y-1/2 will-change-transform" />
        </span>
      </button>
    </div>
  );
}
