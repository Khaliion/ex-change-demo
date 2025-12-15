import { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Feed from './components/Feed';
import Profile from './components/Profile';
import Activities from './components/Activities';
import Messages from './components/Messages';
import {
  currentBabyUser,
  currentDaddyUser,
  babyPosts,
  daddyPosts,
  activities,
  messages,
  otherUsers,
  stories,
} from './mockData';

function App() {
  const [userType, setUserType] = useState<'baby' | 'daddy'>('baby');
  const [activeTab, setActiveTab] = useState('feed');

  const currentUser = userType === 'baby' ? currentBabyUser : currentDaddyUser;
  const currentPosts = userType === 'baby' ? babyPosts : daddyPosts;

  const handleSwitchUser = () => {
    setUserType((prev) => (prev === 'baby' ? 'daddy' : 'baby'));
    setActiveTab('feed');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'feed':
        return (
          <Feed
            posts={currentPosts}
            stories={stories}
            currentUserId={currentUser.id}
          />
        );
      case 'activities':
        if (userType === 'baby') {
          return <Activities activities={activities} />;
        }
        return (
          <div className="pb-20 px-4 py-6">
            <h2 className="text-xl font-bold text-[#F6F6F6] mb-4">
              Post New Activity
            </h2>
            <div className="bg-[#1C1F36] rounded-2xl p-6 text-center">
              <p className="text-gray-400 mb-4">
                Share exclusive experiences with Babies
              </p>
              <button className="bg-[#E7C3C9] text-[#0D0D0D] px-6 py-3 rounded-full font-semibold">
                Create Activity
              </button>
            </div>
          </div>
        );
      case 'messages':
        return (
          <Messages
            currentUser={currentUser}
            messages={messages}
            otherUsers={otherUsers}
          />
        );
      case 'profile':
        return <Profile user={currentUser} posts={currentPosts} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F6F6F6]">
      <Header currentUser={currentUser} onSwitchUser={handleSwitchUser} />
      <div className="pt-14">{renderContent()}</div>
      <Navigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        userType={userType}
      />
    </div>
  );
}

export default App;
