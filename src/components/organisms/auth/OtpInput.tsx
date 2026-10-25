
"use client";

import { useRef, useState } from "react";

const OTP_LENGTH = 5;

type OtpInputProps = {
  onCompleteChange: (complete: boolean) => void;
};

export default function OtpInput({
  onCompleteChange,
}: OtpInputProps) {
  const [digits, setDigits] = useState<string[]>(
    Array(OTP_LENGTH).fill("")
  );

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  function handleChange(value: string, index: number) {
    const digit = value.replace(/\D/g, "").slice(-1);
    const nextDigits = [...digits];
    nextDigits[index] = digit;

    setDigits(nextDigits);
    onCompleteChange(nextDigits.every((item) => item !== ""));

    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) {
    if (event.key === "Backspace") {
      const nextDigits = [...digits];

      if (digits[index]) {
        nextDigits[index] = "";
        setDigits(nextDigits);
        onCompleteChange(false);
      } else if (index > 0) {
        nextDigits[index - 1] = "";
        setDigits(nextDigits);
        onCompleteChange(false);
        inputRefs.current[index - 1]?.focus();
      }
    }

    if (event.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handlePaste(
    event: React.ClipboardEvent<HTMLInputElement>
  ) {
    event.preventDefault();

    const pastedDigits = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH)
      .split("");

    const nextDigits = Array(OTP_LENGTH).fill("");

    pastedDigits.forEach((digit, index) => {
      nextDigits[index] = digit;
    });

    setDigits(nextDigits);
    onCompleteChange(nextDigits.every((item: string) => item !== ""));

    const nextIndex = Math.min(
      pastedDigits.length,
      OTP_LENGTH - 1
    );

    inputRefs.current[nextIndex]?.focus();
  }

  return (
    <div dir="ltr" className="flex justify-center gap-3 sm:gap-4">
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(element) => {
            inputRefs.current[index] = element;
          }}
          type="text"
          inputMode="numeric"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={1}
          value={digit}
          aria-label={`رقم ${index + 1} کد تأیید`}
          onChange={(event) =>
            handleChange(event.target.value, index)
          }
          onKeyDown={(event) => handleKeyDown(event, index)}
          onPaste={handlePaste}
          className="h-12 w-12 rounded-xl border border-white/20 bg-transparent text-center text-xl text-white outline-none transition focus:border-[#91FF45] sm:h-14 sm:w-14"
        />
      ))}
    </div>
  );
}
