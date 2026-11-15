"use client";

import Image, { ImageProps } from "next/image";
import { FC, useState } from "react";

interface IProps extends Omit<ImageProps, "src"> {
  src?: ImageProps["src"] | null;
  fallbackSrc?: ImageProps["src"];
}

const ImageFallback: FC<IProps> = ({
  src,
  fallbackSrc = "/images/slider.webp",
  alt,
  onError,
  ...props
}) => {
  const [failedSrc, setFailedSrc] = useState<ImageProps["src"] | null>(null);

  const hasError = !src || failedSrc === src;

  return (
    <Image
      {...props}
      alt={alt}
      src={hasError ? fallbackSrc : src}
      onError={(event) => {
        if (!hasError) {
          setFailedSrc(src ?? null);
        }

        onError?.(event);
      }}
    />
  );
};

export default ImageFallback;
