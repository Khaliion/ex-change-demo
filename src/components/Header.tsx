import { User } from '../types';
import { Crown, Users } from 'lucide-react';

interface HeaderProps {
  currentUser: User;
  onSwitchUser: () => void;
}

export default function Header({ currentUser, onSwitchUser }: HeaderProps) {
  return (
    <div className="fixed top-0 left-0 right-0 bg-[#0D0D0D] border-b border-gray-800 z-50">
      <div className="max-w-md mx-auto flex items-center justify-between px-4 h-14">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-[#E7C3C9]">Ex-change</h1>
          {currentUser.is_vip && (
            <Crown className="w-4 h-4 text-[#C8B6FF]" />
          )}
        </div>

        <button
          onClick={onSwitchUser}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1C1F36] text-[#E7C3C9] text-sm font-medium"
        >
          <Users className="w-4 h-4" />
          Switch to {currentUser.user_type === 'baby' ? 'Daddy' : 'Baby'}
        </button>
      </div>
    </div>
  );
}
