import { useState } from 'react';
import { User, Message } from '../types';
import { Crown, Send, ArrowLeft } from 'lucide-react';

interface MessagesProps {
  currentUser: User;
  messages: Message[];
  otherUsers: User[];
}

export default function Messages({ currentUser, messages, otherUsers }: MessagesProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const conversations = otherUsers
    .map((user) => {
      const userMessages = messages.filter(
        (msg) =>
          (msg.sender_id === currentUser.id && msg.recipient_id === user.id) ||
          (msg.sender_id === user.id && msg.recipient_id === currentUser.id)
      );

      if (userMessages.length === 0) return null;

      const lastMessage = userMessages[userMessages.length - 1];
      return {
        user,
        lastMessage,
        messages: userMessages,
      };
    })
    .filter(Boolean) as Array<{
    user: User;
    lastMessage: Message;
    messages: Message[];
  }>;

  if (selectedUser) {
    const conversation = conversations.find((conv) => conv.user.id === selectedUser.id);
    if (!conversation) return null;

    return (
      <div className="pb-20 flex flex-col h-screen">
        <div className="bg-[#1C1F36] px-4 py-3 flex items-center gap-3 border-b border-gray-700">
          <button onClick={() => setSelectedUser(null)}>
            <ArrowLeft className="w-6 h-6 text-[#F6F6F6]" />
          </button>
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-800">
            <img
              src={selectedUser.avatar_url}
              alt={selectedUser.username}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-[#F6F6F6]">{selectedUser.full_name}</span>
              {selectedUser.verified && (
                <Crown className="w-4 h-4 text-[#E7C3C9]" />
              )}
            </div>
            <span className="text-xs text-gray-400">@{selectedUser.username}</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {conversation.messages.map((msg) => {
            const isSent = msg.sender_id === currentUser.id;
            return (
              <div
                key={msg.id}
                className={`flex ${isSent ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] px-4 py-2 rounded-2xl ${
                    isSent
                      ? 'bg-[#E7C3C9] text-[#0D0D0D]'
                      : 'bg-[#1C1F36] text-[#F6F6F6]'
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {new Date(msg.created_at).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="px-4 py-3 bg-[#0D0D0D] border-t border-gray-800">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-[#1C1F36] text-[#F6F6F6] px-4 py-3 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#E7C3C9]"
            />
            <button className="bg-[#E7C3C9] p-3 rounded-full">
              <Send className="w-5 h-5 text-[#0D0D0D]" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <div className="px-4 py-4 border-b border-gray-800">
        <h2 className="text-xl font-bold text-[#F6F6F6]">Messages</h2>
      </div>

      <div className="divide-y divide-gray-800">
        {conversations.map((conv) => (
          <button
            key={conv.user.id}
            onClick={() => setSelectedUser(conv.user)}
            className="w-full px-4 py-4 flex items-center gap-3 hover:bg-[#1C1F36] transition-colors"
          >
            <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-800 flex-shrink-0">
              <img
                src={conv.user.avatar_url}
                alt={conv.user.username}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 text-left">
              <div className="flex items-center gap-1 mb-1">
                <span className="font-semibold text-[#F6F6F6]">{conv.user.full_name}</span>
                {conv.user.verified && (
                  <Crown className="w-4 h-4 text-[#E7C3C9]" />
                )}
                {conv.user.is_vip && (
                  <div className="bg-[#C8B6FF] px-1.5 py-0.5 rounded text-[10px] text-[#0D0D0D] font-semibold">
                    VIP
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-400 truncate">{conv.lastMessage.content}</p>
            </div>

            <div className="text-xs text-gray-500">
              {new Date(conv.lastMessage.created_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
