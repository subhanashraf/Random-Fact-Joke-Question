"use client"

import { useState, useCallback } from "react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { cn } from "@/lib/utils"

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  placeholder?: string
  width?: number
  height?: number
}

export function LazyImage({
  src,
  alt,
  className,
  placeholder = "/placeholder.svg?height=200&width=300",
  width,
  height,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  })

  const handleLoad = useCallback(() => {
    setIsLoaded(true)
  }, [])

  const handleError = useCallback(() => {
    setHasError(true)
  }, [])

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      {isIntersecting && (
        <>
          {!isLoaded && !hasError && (
            <img
              src={placeholder || "/placeholder.svg"}
              alt="Loading..."
              className="absolute inset-0 w-full h-full object-cover blur-sm opacity-50"
              width={width}
              height={height}
            />
          )}
          <img
            src={hasError ? placeholder : src}
            alt={alt}
            onLoad={handleLoad}
            onError={handleError}
            className={cn(
              "w-full h-full object-cover transition-opacity duration-300",
              isLoaded ? "opacity-100" : "opacity-0",
            )}
            width={width}
            height={height}
            loading="lazy"
          />
        </>
      )}
    </div>
  )
}
