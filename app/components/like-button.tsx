'use client';

import { toggleLike } from '@/app/actions/post';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';
import { useOptimistic } from 'react';

export default function LikeButton({
  hasLike,
  id,
}: {
  hasLike: boolean;
  id: string;
}) {
  const [optimisticHasLiked, toggleOptimisticHasLiked] = useOptimistic(
    hasLike,
    (state) => !state
  );

  const action = async () => {
    toggleOptimisticHasLiked(optimisticHasLiked);
    await toggleLike(id);
  };

  return (
    <form>
      <Button
        formAction={action}
        size="icon"
        variant="ghost"
        className="rounded-full"
      >
        <Heart
          size={20}
          className={cn(optimisticHasLiked && 'fill-current text-pink-600')}
        />
        <span className="sr-only">
          お気に入り{optimisticHasLiked ? 'から削除' : 'に追加'}
        </span>
      </Button>
    </form>
  );
}
