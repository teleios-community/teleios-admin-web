export type DashboardSummary = {
  user_stats: {
    total_users: number;
    verified_users: number;
    unverified_users: number;
    users_this_month: number;
    active_users_last_30_days: number;
  };
  course_stats: {
    total_courses: number;
    published_courses: number;
    draft_courses: number;
    courses_this_month: number;
    total_enrollments: number;
    popular_courses: string[];
  };
  last_updated: Date;
};

export type ProjectType = {
  id: number;
  name: string;
  description: string;
  repo_url: string;
  course_id: number;
  learning_path_id: number;
  category: string;
  difficulty_level: string;
  difficulty_level_badge: string;
  technology_tags: string;
  long_description: string;
  maximum_xp_assignable: number;
  time_estimate: number;
  created_at: string;
  updated_at: string;
  created_by: number;
  last_updated_by: string;
  slug: string;
};

export type MentorType = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  profile_picture_url: string;
  created_at: string;
  expertise_areas: string[];
  bio: string;
};
