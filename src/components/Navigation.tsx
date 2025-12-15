import { Home, Search, PlusSquare, Heart, MessageCircle, User } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  userType: 'baby' | 'daddy';
}

export default function Navigation({ activeTab, onTabChange, userType }: NavigationProps) {
  const tabs = [
    { id: 'feed', icon: Home, label: 'Feed' },
    { id: 'activities', icon: Search, label: userType === 'baby' ? 'Activities' : 'Post Activity' },
    { id: 'messages', icon: MessageCircle, label: 'Messages' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0D0D0D] border-t border-gray-800 z-50">
      <div className="max-w-md mx-auto flex justify-around items-center h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center justify-center flex-1 h-full"
            >
              <Icon
                className={`w-6 h-6 ${
                  isActive ? 'text-[#E7C3C9]' : 'text-gray-400'
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
