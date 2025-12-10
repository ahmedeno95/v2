"use client";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function PixelTracker() {
  const pathname = usePathname();
  const search = useSearchParams();

  useEffect(() => {
    try {
      const fbqFn = (window as any)?.fbq;
      if (typeof fbqFn === "function") {
        fbqFn("track", "PageView");
      }
    } catch {}
  }, [pathname, search]);

  return null;
}
