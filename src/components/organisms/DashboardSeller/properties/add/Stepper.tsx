"use client";

import { useTranslations } from "next-intl";
import {
  CheckCircle2,
  MapPin,
  Images,
  SlidersHorizontal,
  Info,
} from "lucide-react";

type Props = {
  currentStep: number; // از ۰ شروع می‌شود
  maxStep?: number; // دورترین مرحله مجاز
  onStepClick?: (index: number) => void;
};

const Stepper = ({ currentStep, maxStep = currentStep, onStepClick }: Props) => {
  const t = useTranslations("addProperty");

  const steps = [
    { title: t("initialInfo"), icon: <Info size={17} /> },
    { title: t("address"), icon: <MapPin size={17} /> },
    { title: t("facilities"), icon: <SlidersHorizontal size={17} /> },
    { title: t("images"), icon: <Images size={17} /> },
    { title: t("finalApproval"), icon: <CheckCircle2 size={17} /> },
  ];

  return (
    <div className="my-5 flex items-center justify-between gap-2 overflow-x-auto rounded-2xl bg-background px-4 py-4">
      {steps.map((step, index) => {
        const status =
          index < currentStep ? "done" : index === currentStep ? "active" : "todo";

        const textClass = {
          done: "font-medium text-primary",
          active: "font-semibold text-foreground",
          todo: "text-muted",
        }[status];

        const circleClass = {
          done: "border-primary text-primary",
          active: "border-foreground text-foreground",
          todo: "border-border text-muted",
        }[status];

        const clickable = !!onStepClick && index <= maxStep && index !== currentStep;

        return (
          <div key={index} className="flex min-w-max flex-1 items-center gap-2">
            <button
              type="button"
              disabled={!clickable}
              onClick={() => onStepClick?.(index)}
              className={`flex shrink-0 items-center gap-2 text-[10px] ${textClass} ${
                clickable ? "cursor-pointer hover:opacity-70" : "cursor-default"
              }`}
            >
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full border ${circleClass}`}
              >
                {step.icon}
              </span>
              {step.title}
            </button>

            {index !== steps.length - 1 && (
              <div
                className={`h-px min-w-4 flex-1 border-t border-dashed ${
                  index < currentStep ? "border-primary" : "border-border"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;