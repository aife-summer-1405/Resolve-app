"use client";

import { FC, ReactNode, useRef } from "react";

enum RADIUS_SIZE {
  sm = "14px",
  md = "24px",
  lg = "40px",
}

interface ClassNames {
  base: string;
  innerLabel: string;
  wrapperLabel: string;
  wrapperTag: string;
  coverHollow: string;
}

export interface FileContainerProps {
  children: ReactNode;
  background: string;
  radius: "sm" | "md" | "lg";
  size: "lg" | "md";
  width?: string;
  height?: string;
  label?: ReactNode;
  tag?: ReactNode;
  labelWidth?: string;
  labelHeight?: string;
  tagHeight?: string;
  direction?: "rtl" | "ltr";
  classNames?: Partial<ClassNames>;
}

interface IHollowProps {
  background: string;
  direction: "rtl" | "ltr";
  className?: string;
}

const HollowSizeMD: FC<IHollowProps> = ({
  background,
  direction,
  className,
}) => {
  return (
    <div
      style={{
        boxShadow:
          direction === "rtl"
            ? `4px 6px ${background}`
            : `-4px 6px ${background}`,
        color: background,
        pointerEvents: "none",
      }}
      className={`absolute bottom-0 z-10 h-5 w-5 ${
        direction === "rtl"
          ? "left-[-19px] rounded-br-full"
          : "right-[-19px] rounded-bl-full"
      } ${className ?? ""}`}
    />
  );
};

interface IHollowSizeLGProps extends IHollowProps {
  radius: string;
  labelHeight?: string;
}

const HollowSizeLG: FC<IHollowSizeLGProps> = ({
  background,
  radius,
  labelHeight,
  direction,
  className,
}) => {
  return (
    <div
      className={`absolute bottom-0 ${
        direction === "rtl"
          ? "-left-6 skew-x-[-45deg]"
          : "-right-6 skew-x-[45deg]"
      }`}
      style={{
        backgroundColor: background,
        height: labelHeight,
        width: "80%",
        borderTopLeftRadius: direction === "rtl" ? radius : "0",
        borderTopRightRadius: direction === "ltr" ? radius : "0",
      }}
    >
      <div
        className={`absolute bottom-0 z-10 h-5 w-5 ${
          direction === "rtl"
            ? "left-[-19px] rounded-br-full"
            : "right-[-19px] rounded-bl-full"
        } ${className ?? ""}`}
        style={{
          boxShadow:
            direction === "rtl"
              ? `4px 6px ${background}`
              : `-4px 6px ${background}`,
        }}
      />
    </div>
  );
};

const FileContainer: FC<FileContainerProps> = ({
  children,
  background,
  radius,
  size,
  width,
  height,
  label,
  tag,
  labelWidth,
  labelHeight,
  tagHeight,
  direction = "rtl",
  classNames,
}) => {
  const labelRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);

  return (
    <div
      dir={direction}
      className={`relative z-30 h-fit ${classNames?.base ?? ""}`}
      style={{
        width,
        height,
        borderRadius: RADIUS_SIZE[radius],
        borderTopRightRadius: direction === "rtl" ? "0px" : RADIUS_SIZE[radius],
        borderTopLeftRadius: direction === "ltr" ? "0px" : RADIUS_SIZE[radius],
        backgroundColor: background,
        marginTop: labelHeight,
      }}
    >
      <div
        ref={labelRef}
        className={`absolute z-30 ${
          direction === "rtl" ? "right-0" : "left-0"
        } ${classNames?.wrapperLabel ?? ""}`}
        style={{
          borderTopRightRadius:
            direction === "rtl"
              ? RADIUS_SIZE[radius]
              : size === "lg"
                ? "30%"
                : RADIUS_SIZE[radius],
          borderTopLeftRadius:
            direction === "ltr"
              ? RADIUS_SIZE[radius]
              : size === "lg"
                ? "30%"
                : RADIUS_SIZE[radius],
          backgroundColor: background,
          height: labelHeight,
          width: labelWidth,
          top: `-${labelHeight}`,
        }}
      >
        <div
          className={`relative z-40 w-full p-4 ${classNames?.innerLabel ?? ""}`}
        >
          {label}
        </div>

        {size === "lg" ? (
          <HollowSizeLG
            background={background}
            radius={RADIUS_SIZE[radius]}
            labelHeight={labelHeight}
            direction={direction}
            className={classNames?.coverHollow}
          />
        ) : (
          <HollowSizeMD
            background={background}
            direction={direction}
            className={classNames?.coverHollow}
          />
        )}
      </div>

      <div
        ref={tagRef}
        className={`absolute flex h-fit items-start ${
          direction === "rtl" ? "left-0 justify-end" : "right-0 justify-start"
        } ${classNames?.wrapperTag ?? ""}`}
        style={{
          width: `calc(95% - ${labelWidth})`,
          height: tagHeight || labelHeight,
          top: `-${tagHeight || labelHeight}`,
          pointerEvents: "none",
        }}
      >
        {tag}
      </div>

      {children}
    </div>
  );
};

export default FileContainer;
