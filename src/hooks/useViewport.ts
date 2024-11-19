"use client";
import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 1024;

export function useViewport() {
  const [viewport, setViewport] = useState<"mobile" | "desktop">(
    getViewportType
  );

  function getViewportType() {
    return window.innerWidth < MOBILE_BREAKPOINT ? "mobile" : "desktop";
  }

  useEffect(() => {
    function handleWindowResize() {
      setViewport(getViewportType());
    }

    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return viewport;
}
