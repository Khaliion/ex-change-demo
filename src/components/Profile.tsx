import { User, Post } from '../types';
import { Crown, Grid, Heart, Sparkles } from 'lucide-react';

interface ProfileProps {
  user: User;
  posts: Post[];
}

export default function Profile({ user, posts }: ProfileProps) {
  return (
    <div className="pb-20">
      <div className="px-4 py-6">
        <div className="flex items-start gap-6 mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#E7C3C9]">
              <img
                src={user.avatar_url}
                alt={user.username}
                className="w-full h-full object-cover"
              />
            </div>
            {user.verified && (
              <div className="absolute -bottom-1 -right-1 bg-[#E7C3C9] rounded-full p-1">
                <Crown className="w-4 h-4 text-[#0D0D0D]" />
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-lg font-bold text-[#F6F6F6]">{user.username}</h2>
              {user.is_vip && (
                <div className="bg-gradient-to-r from-[#C8B6FF] to-[#E7C3C9] px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#0D0D0D]" />
                  <span className="text-xs font-semibold text-[#0D0D0D]">VIP</span>
                </div>
              )}
            </div>

            <div className="flex gap-6 text-sm">
              <div className="text-center">
                <div className="font-bold text-[#F6F6F6]">{posts.length}</div>
                <div className="text-gray-400 text-xs">posts</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-[#F6F6F6]">{user.followers_count?.toLocaleString()}</div>
                <div className="text-gray-400 text-xs">followers</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-[#F6F6F6]">{user.following_count}</div>
                <div className="text-gray-400 text-xs">following</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold text-[#F6F6F6] mb-1">{user.full_name}</h3>
          <p className="text-sm text-gray-300 whitespace-pre-line">{user.bio}</p>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-[#1C1F36] rounded-lg">
            <Heart className="w-4 h-4 text-[#E7C3C9]" fill="#E7C3C9" />
            <span className="text-sm font-semibold text-[#E7C3C9]">
              {user.connections_count} {user.user_type === 'baby' ? 'Daddies' : 'Babies'}
            </span>
          </div>

          <button className="flex-1 bg-[#E7C3C9] text-[#0D0D0D] py-2 px-4 rounded-lg font-semibold text-sm">
            Edit Profile
          </button>
        </div>

        {user.is_vip && user.user_type === 'daddy' && (
          <div className="bg-gradient-to-r from-[#1C1F36] to-[#0D0D0D] border border-[#C8B6FF] rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-[#C8B6FF]" />
              <h3 className="font-semibold text-[#F6F6F6]">VIP Stats</h3>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-[#C8B6FF]">12.4K</div>
                <div className="text-xs text-gray-400">Profile Views</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#C8B6FF]">892</div>
                <div className="text-xs text-gray-400">Activity Views</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-[#C8B6FF]">94%</div>
                <div className="text-xs text-gray-400">Response Rate</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-gray-800">
        <div className="flex items-center justify-center gap-1 py-2 border-b border-[#E7C3C9]">
          <Grid className="w-5 h-5 text-[#E7C3C9]" />
        </div>

        <div className="grid grid-cols-3 gap-1 p-1">
          {posts.map((post) => (
            <div key={post.id} className="aspect-square bg-gray-900">
              <img
                src={post.image_url}
                alt={post.caption}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
