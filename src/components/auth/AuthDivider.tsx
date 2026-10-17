import React from 'react'

type AuthDividerProps = {
  text?: string;
};

export default function AuthDivider({
  text = "یا می‌توانید",
}: AuthDividerProps) {
  return (
    <div className="my-7 flex items-center gap-3 text-xs text-white/55">
      <div className="h-px flex-1 bg-white/20" />
      <span>{text}</span>
      <div className="h-px flex-1 bg-white/20" />
    </div>
  );
}



