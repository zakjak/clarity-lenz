export type User = {
  id: string;
  email?: string | null;
  name?: string | null;
  isAdmin?: boolean | null;
  isLeader?: boolean | null;
  image?: string | null;
  emailVerified?: boolean;
};

export type EventProp = {
  id: number;
  title: string;
  image: undefined;
  description: string;
  eventStart: string;
  eventEnd: string;
  platform: string;
  timezone: string;
};

export type Session = {
  user: User;
  userId: string;
};

export type UserInfo = {
  position?: string;
  bio: string;
  twitter?: string;
  fb?: string;
  linkedIn?: string;
  instagram?: string;
};

export type SocialProps = {
  fb: string;
  twitter: string;
  linkedIn: string;
};
