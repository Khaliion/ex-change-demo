import { Post, Story } from '../types';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Crown } from 'lucide-react';
import Stories from './Stories';

interface FeedProps {
  posts: Post[];
  stories: Story[];
  currentUserId: string;
}

export default function Feed({ posts, stories, currentUserId }: FeedProps) {
  return (
    <div className="pb-20">
      <Stories stories={stories} currentUserId={currentUserId} />

      <div className="divide-y divide-gray-800">
        {posts.map((post) => (
          <div key={post.id} className="bg-[#0D0D0D]">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-800">
                  <img
                    src={post.user?.avatar_url}
                    alt={post.user?.username}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold text-[#F6F6F6]">
                      {post.user?.username}
                    </span>
                    {post.user?.verified && (
                      <Crown className="w-3 h-3 text-[#E7C3C9]" />
                    )}
                  </div>
                </div>
              </div>
              <button>
                <MoreHorizontal className="w-5 h-5 text-[#F6F6F6]" />
              </button>
            </div>

            <div className="w-full aspect-square bg-gray-900">
              <img
                src={post.image_url}
                alt={post.caption}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="px-4 py-3">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4">
                  <button>
                    <Heart className="w-6 h-6 text-[#F6F6F6]" />
                  </button>
                  <button>
                    <MessageCircle className="w-6 h-6 text-[#F6F6F6]" />
                  </button>
                  <button>
                    <Send className="w-6 h-6 text-[#F6F6F6]" />
                  </button>
                </div>
                <button>
                  <Bookmark className="w-6 h-6 text-[#F6F6F6]" />
                </button>
              </div>

              <div className="text-sm text-[#F6F6F6]">
                <span className="font-semibold">{post.user?.username}</span>{' '}
                <span className="text-gray-300">{post.caption}</span>
              </div>

              <div className="text-xs text-gray-400 mt-1">
                {new Date(post.created_at).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
