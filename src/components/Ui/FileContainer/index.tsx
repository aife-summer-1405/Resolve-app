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
  classNames?: Partial<ClassNames>;
}

interface IHollowProps {
  background: string;
  className?: string;
}

const HollowSizeMD: FC<IHollowProps> = ({ background, className }) => {
  return (
    <div
      style={{
        boxShadow: `4px 6px ${background}`,
        color: background,
        pointerEvents: "none",
      }}
      className={`absolute bottom-0 left-[-19px] z-10 h-5 w-5 rounded-br-full ${className ?? ""}`}
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
  className,
}) => {
  return (
    <div
      className="absolute -left-6 bottom-0 skew-x-[-45deg]"
      style={{
        backgroundColor: background,
        height: labelHeight,
        width: "80%",
        borderTopLeftRadius: radius,
      }}
    >
      <div
        className={`absolute bottom-0 left-[-19px] z-10 h-5 w-5 rounded-br-full ${className ?? ""}`}
        style={{ boxShadow: `4px 6px ${background}` }}
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
  classNames,
}) => {
  const labelRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={`relative z-30 h-fit ${classNames?.base ?? ""}`}
      style={{
        width,
        height,
        borderRadius: RADIUS_SIZE[radius],
        borderTopRightRadius: "0px",
        backgroundColor: background,
        marginTop: labelHeight,
      }}
    >
      <div
        ref={labelRef}
        className={`absolute right-0 z-30 ${classNames?.wrapperLabel ?? ""}`}
        style={{
          borderTopRightRadius: RADIUS_SIZE[radius],
          borderTopLeftRadius: size === "lg" ? "30%" : RADIUS_SIZE[radius],
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
            className={classNames?.coverHollow}
          />
        ) : (
          <HollowSizeMD
            background={background}
            className={classNames?.coverHollow}
          />
        )}
      </div>

      <div
        ref={tagRef}
        className={`absolute left-0 flex h-fit items-start justify-end ${classNames?.wrapperTag ?? ""}`}
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
