export interface User {
  id: string;
  username: string;
  full_name: string;
  user_type: 'baby' | 'daddy';
  bio: string;
  avatar_url: string;
  verified: boolean;
  is_vip: boolean;
  followers_count?: number;
  following_count?: number;
  connections_count?: number;
}

export interface Post {
  id: string;
  user_id: string;
  image_url: string;
  caption: string;
  created_at: string;
  user?: User;
}

export interface Activity {
  id: string;
  daddy_id: string;
  title: string;
  description: string;
  image_url: string;
  location: string;
  likes_count: number;
  created_at: string;
  daddy?: User;
  comments?: ActivityComment[];
  liked?: boolean;
}

export interface ActivityComment {
  id: string;
  activity_id: string;
  user_id: string;
  content: string;
  created_at: string;
  user?: User;
}

export interface Message {
  id: string;
  sender_id: string;
  recipient_id: string;
  content: string;
  created_at: string;
  sender?: User;
  recipient?: User;
}

export interface Story {
  id: string;
  user_id: string;
  image_url: string;
  is_private: boolean;
  created_at: string;
  user?: User;
}

export interface Conversation {
  user: User;
  lastMessage: Message;
}
