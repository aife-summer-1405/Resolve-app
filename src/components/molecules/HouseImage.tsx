"use client";

import { useState } from "react";
import Image from "next/image";

const DEFAULT_IMAGE = "/images/house-default.jpg";

interface HouseImageProps {
  src?: string | null;
  alt: string;
  sizes?: string;
  className?: string;
}

export default function HouseImage({
  src,
  alt,
  sizes,
  className = "object-cover",
}: HouseImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  // اگر src عوض شد، خطای قبلی نادیده گرفته می‌شود
  const finalSrc = !src || failedSrc === src ? DEFAULT_IMAGE : src;

  return (
    <Image
      src={finalSrc}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      onError={() => {
        if (src) setFailedSrc(src);
      }}
    />
  );
}