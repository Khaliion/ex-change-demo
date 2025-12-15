import { useState } from 'react';
import { Activity, ActivityComment } from '../types';
import { Heart, MessageCircle, MapPin, Send, Crown } from 'lucide-react';
import { activityComments } from '../mockData';

interface ActivitiesProps {
  activities: Activity[];
}

export default function Activities({ activities }: ActivitiesProps) {
  const [localActivities, setLocalActivities] = useState(activities);
  const [showComments, setShowComments] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');

  const toggleLike = (activityId: string) => {
    setLocalActivities(prev =>
      prev.map(activity =>
        activity.id === activityId
          ? {
              ...activity,
              liked: !activity.liked,
              likes_count: activity.liked ? activity.likes_count - 1 : activity.likes_count + 1,
            }
          : activity
      )
    );
  };

  const handleAddComment = (activityId: string) => {
    if (!newComment.trim()) return;
    setNewComment('');
    setShowComments(null);
  };

  return (
    <div className="pb-20">
      <div className="px-4 py-4">
        <h2 className="text-xl font-bold text-[#F6F6F6] mb-1">Exclusive Experiences</h2>
        <p className="text-sm text-gray-400">Discover unique activities from verified Daddies</p>
      </div>

      <div className="space-y-4 px-4">
        {localActivities.map((activity) => {
          const comments = activityComments[activity.id] || [];
          const isShowingComments = showComments === activity.id;

          return (
            <div key={activity.id} className="bg-[#1C1F36] rounded-2xl overflow-hidden">
              <div className="aspect-[4/3] bg-gray-900">
                <img
                  src={activity.image_url}
                  alt={activity.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[#F6F6F6] mb-1">
                      {activity.title}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-[#E7C3C9] mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>{activity.location}</span>
                    </div>
                  </div>
                  {activity.daddy?.is_vip && (
                    <div className="bg-[#C8B6FF] px-2 py-1 rounded-full">
                      <Crown className="w-4 h-4 text-[#0D0D0D]" />
                    </div>
                  )}
                </div>

                <p className="text-sm text-gray-300 mb-4">{activity.description}</p>

                <div className="flex items-center justify-between pt-3 border-t border-gray-700">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleLike(activity.id)}
                      className="flex items-center gap-1.5"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          activity.liked ? 'text-[#E7C3C9] fill-[#E7C3C9]' : 'text-gray-400'
                        }`}
                      />
                      <span className="text-sm text-[#F6F6F6] font-medium">
                        {activity.likes_count}
                      </span>
                    </button>

                    <button
                      onClick={() => setShowComments(isShowingComments ? null : activity.id)}
                      className="flex items-center gap-1.5"
                    >
                      <MessageCircle className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-[#F6F6F6] font-medium">
                        {comments.length}
                      </span>
                    </button>
                  </div>

                  <button className="bg-[#E7C3C9] text-[#0D0D0D] px-4 py-2 rounded-full text-sm font-semibold">
                    Interested
                  </button>
                </div>

                {isShowingComments && (
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="space-y-3 mb-3">
                      {comments.map((comment) => (
                        <div key={comment.id} className="flex gap-2">
                          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-800 flex-shrink-0">
                            <img
                              src={comment.user?.avatar_url}
                              alt={comment.user?.username}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-1">
                              <span className="text-sm font-semibold text-[#F6F6F6]">
                                {comment.user?.username}
                              </span>
                              {comment.user?.verified && (
                                <Crown className="w-3 h-3 text-[#E7C3C9]" />
                              )}
                            </div>
                            <p className="text-sm text-gray-300">{comment.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="flex-1 bg-[#0D0D0D] text-[#F6F6F6] px-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#E7C3C9]"
                      />
                      <button
                        onClick={() => handleAddComment(activity.id)}
                        className="bg-[#E7C3C9] p-2 rounded-full"
                      >
                        <Send className="w-4 h-4 text-[#0D0D0D]" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
