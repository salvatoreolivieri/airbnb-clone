"use client"

import { useFavorite } from "@/hooks/use-favorite"
import { SafeUser } from "@/types"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"

interface HeartButtonProps {
  listingId: string
  currentUser?: SafeUser | null
}

export const HeartButton = ({ listingId, currentUser }: HeartButtonProps) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId,
    currentUser,
  })

  return (
    <>
      <div
        onClick={toggleFavorite}
        className="relative hover:opacity-80 transition cursor-pointer  "
      >
        <AiOutlineHeart size={24} className="absolute  fill-white " />
        <AiFillHeart
          size={24}
          className={hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"}
        />
      </div>
    </>
  )
}
