"use client"

import { useReplyStore } from '@/src/store/useReplyStore';
import { Text } from 'lucide-react'

const UserReply = () => {
        const setReplyId = useReplyStore((s) => s.setReplyId);
  return (
        <button
            type="button"
            onClick={() => setReplyId(String(5))}
            className="flex items-center gap-1 rounded-2xl bg-[#7569FF] px-6 py-3 text-[16px] font-semibold"
        >
            <p>پاسخ کاربران</p>
            <span>
                <Text size={11} />
            </span>
        </button>
  )
}

export default UserReply