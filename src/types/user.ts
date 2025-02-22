export type UserType = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  profile_picture_url: string;
  created_at: string;
  status: 'active' | 'inactive';
  role: 'super_admin' | 'admin';
};

export type TokenType = {
  access_token: string;
  refresh_token: string;
};