import { Story } from '../types';
import { Crown } from 'lucide-react';

interface StoriesProps {
  stories: Story[];
  currentUserId: string;
}

export default function Stories({ stories, currentUserId }: StoriesProps) {
  return (
    <div className="flex gap-4 overflow-x-auto px-4 py-3 scrollbar-hide">
      {stories.map((story) => {
        const isOwn = story.user_id === currentUserId;
        const borderColor = story.is_private
          ? 'border-[#C8B6FF]'
          : 'border-[#E7C3C9]';

        return (
          <div key={story.id} className="flex flex-col items-center gap-1 min-w-fit">
            <div className={`relative p-0.5 rounded-full ${borderColor} border-2`}>
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-800">
                <img
                  src={story.user?.avatar_url}
                  alt={story.user?.username}
                  className="w-full h-full object-cover"
                />
              </div>
              {story.user?.verified && (
                <div className="absolute -bottom-1 -right-1 bg-[#E7C3C9] rounded-full p-0.5">
                  <Crown className="w-3 h-3 text-[#0D0D0D]" />
                </div>
              )}
            </div>
            <span className="text-xs text-[#F6F6F6] truncate max-w-[70px]">
              {isOwn ? 'You' : story.user?.username.split('.')[0]}
            </span>
            {story.is_private && (
              <span className="text-[10px] text-[#C8B6FF]">Private</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
