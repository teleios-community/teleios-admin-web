export type UserType = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  profile_picture_url: string;
  work_experiences: [];
  social_links: [];
  has_completed_onboarding: false;
  onboarding_completed_at: Date;
};

export type TokenType = {
  access_token: string;
  refresh_token: string;
};