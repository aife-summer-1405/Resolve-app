"use client";

import { Copy, Heart, Share2 } from "lucide-react";

interface IHeaderButtonsProps {
  isFavo: boolean;
}

const HeaderButtons = ({ isFavo }: IHeaderButtonsProps) => {
  return (
    <div className="flex gap-2">
      <button
        type="button"
        className="rounded-md bg-primary p-1"
        aria-label="Copy"
      >
        <Copy />
      </button>

      <button
        type="button"
        className="rounded-md bg-card p-1"
        aria-label="Share"
      >
        <Share2 />
      </button>

      <button
        type="button"
        className="rounded-md bg-card p-1"
        aria-label={isFavo ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart
          className={isFavo ? "fill-current text-primary" : ""}
        />
      </button>
    </div>
  );
};

export default HeaderButtons;