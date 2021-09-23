import { StravaClub } from "types";

export const readStravaClub = (data: any): StravaClub => ({
  id: data.id,
  resourceState: data.resource_state,
  name: data.name,
  profileMedium: data.profile_medium,
  profile: data.profile,
  coverPhoto: data.cover_photo,
  coverPhotoSmall: data.cover_photo_small,
  sportType: data.sport_type,
  city: data.city,
  state: data.state,
  country: data.country,
  private: data.private,
  memberCount: data.member_count,
  featured: data.featured,
  verified: data.verified,
  url: data.url,
});
