"use client"

import * as React from "react"
import { cn } from "cn"
import { Slider as SliderPrimitive } from "radix-ui"

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max]
  )

  return (
   <SliderPrimitive.Root
  data-slot="slider"
  defaultValue={defaultValue}
  value={value}
  min={min}
  max={max}
  className={cn(
    "relative flex h-6 w-full touch-none items-center select-none data-[disabled]:opacity-50",
    className
  )}
  {...props}
>
  <SliderPrimitive.Track
    data-slot="slider-track"
    className="relative h-2 w-full grow overflow-hidden rounded-full bg-white/20"
  >
    <SliderPrimitive.Range
      data-slot="slider-range"
      className="absolute h-full bg-primary"
    />
  </SliderPrimitive.Track>
  {Array.from({ length: _values.length }, (_, index) => (
    <SliderPrimitive.Thumb
      data-slot="slider-thumb"
      key={index}
      className="block size-5 rounded-full border-2 border-primary bg-white shadow outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
    />
  ))}
</SliderPrimitive.Root>
  )
}

export { Slider }
