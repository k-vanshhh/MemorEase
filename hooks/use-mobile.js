"use client"

import { useEffect, useState } from "react"

export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(undefined)

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    const handleChange = (e) => {
      setIsMobile(e.matches)
    }

    // Set initial value
    setIsMobile(mq.matches)

    // Listen for changes
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", handleChange)
      return () => mq.removeEventListener("change", handleChange)
    }

    // Fallback for older browsers
    if (typeof mq.addListener === "function") {
      mq.addListener(handleChange)
      return () => mq.removeListener(handleChange)
    }

    return undefined
  }, [breakpoint])

  return isMobile
}
