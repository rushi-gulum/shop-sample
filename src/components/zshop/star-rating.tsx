"use client";

import { Star, StarHalf } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: number;
  className?: string;
}

export function StarRating({ rating, size = 14, className }: StarRatingProps) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i - 0.25) {
      stars.push(
        <Star key={i} size={size} className="fill-amber-400 text-amber-400" strokeWidth={1.5} />
      );
    } else if (rating >= i - 0.75) {
      stars.push(
        <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
          <Star size={size} className="absolute inset-0 text-muted-foreground/40" strokeWidth={1.5} />
          <StarHalf
            size={size}
            className="absolute inset-0 fill-amber-400 text-amber-400"
            strokeWidth={1.5}
          />
        </span>
      );
    } else {
      stars.push(
        <Star key={i} size={size} className="text-muted-foreground/40" strokeWidth={1.5} />
      );
    }
  }
  return (
    <span className={`inline-flex items-center gap-[1px] ${className ?? ""}`} aria-label={`Rated ${rating} out of 5`}>
      {stars}
    </span>
  );
}
