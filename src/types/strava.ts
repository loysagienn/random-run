export type AthleteId = number;

export type StravaClub = {
  id: number;
  resourceState: number;
  name: string;
  profileMedium: string;
  profile: string;
  coverPhoto: string;
  coverPhotoSmall: string;
  sportType: string;
  city: string;
  state: string;
  country: string;
  private: boolean;
  memberCount: number;
  featured: boolean;
  verified: boolean;
  url: string;
};

export type Athlete = {
  id: AthleteId;
  username: string;
  resourceState: number;
  firstname: string;
  lastname: string;
  bio: string;
  city: string;
  state: string;
  country: string;
  sex: string;
  premium: boolean;
  summit: boolean;
  createdAt: string;
  updatedAt: string;
  badgeTypeId: number;
  weight: number;
  profileMedium: string;
  profile: string;
  blocked: boolean;
  canFollow: boolean;
  followerCount: number;
  friendCount: number;
  athleteType: number;
  datePreference: string;
  measurementPreference: string;
  clubs: StravaClub[];
};

export enum StravaScope {
  Read = "read",
  ReadAll = "read_all",
  ProfileReadAll = "profile:read_all",
  ActivityRead = "activity:read",
  ActivityReadAll = "activity:read_all",
}

export type StravaCredentials = {
  tokenType: string;
  expiresAt: number;
  expiresIn: number;
  refreshToken: string;
  accessToken: string;
};
