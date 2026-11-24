"use client";

import { useState } from "react";
import { X, Star } from "lucide-react";
import { useUpdateAdminComment } from "@/src/hooks/dashboard_Admin/useUpdateAdminComment";
import type { IComment } from "@/src/types/Admin_Dashboard/Comments";

interface EditCommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  comment: IComment | null;
}

const EditCommentModal = ({
  isOpen,
  onClose,
  comment,
}: EditCommentModalProps) => {
  if (!isOpen || !comment) return null;

  return (
    <EditCommentForm key={comment.id} comment={comment} onClose={onClose} />
  );
};

interface EditCommentFormProps {
  comment: IComment;
  onClose: () => void;
}

const EditCommentForm = ({ comment, onClose }: EditCommentFormProps) => {
  const [title, setTitle] = useState(comment.title);
  const [caption, setCaption] = useState(comment.caption);
  const [rating, setRating] = useState(Number(comment.rating));

  const updateComment = useUpdateAdminComment();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    updateComment.mutate(
      {
        commentId: comment.id,
        payload: {
          title,
          caption,
          rating,
        },
      },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-xl rounded-2xl bg-surface p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">ویرایش نظر</h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-muted transition hover:bg-background hover:text-foreground"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-foreground">عنوان نظر</label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="عنوان نظر را وارد کنید"
              className="w-full rounded-xl border border-border bg-background p-3 text-foreground outline-none focus:border-[#91FF45]"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-foreground">متن نظر</label>

            <textarea
              rows={4}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="متن نظر را وارد کنید"
              className="w-full resize-none rounded-xl border border-border bg-background p-3 text-foreground outline-none focus:border-[#91FF45]"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-foreground">امتیاز</label>

            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setRating(item)}
                >
                  <Star
                    size={24}
                    className={
                      item <= rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted"
                    }
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={updateComment.isPending}
              className="flex-1 rounded-xl border border-border py-3 text-foreground transition hover:bg-background disabled:opacity-50"
            >
              انصراف
            </button>

            <button
              type="submit"
              disabled={updateComment.isPending || rating < 1 || rating > 5}
              className="flex-1 rounded-xl bg-[#91FF45] py-3 font-semibold text-black transition hover:bg-[#7de52f] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {updateComment.isPending ? "در حال ذخیره..." : "ذخیره تغییرات"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCommentModal;
