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

export type AssignedMentorType = {
  id: number;
  mentor_id: number;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  profile_picture_url: string;
  created_at: string;
  expertise_areas: string[];
  bio: string;
};

export type ProjectSubmissionType = {
  id: number;
  repo_url: string;
  project_id: number;
  mentor_id: number;
  user_id: number;
  created_at: string;
  reviewed_at: string;
  status: string;
  score: number;
  mentor_comment: string;
  project_name: string;
  project_description: string;
  project_repo_url: string;
  project_course_id: number;
  project_learning_path_id: number;
  project_category: string;
  project_difficulty_level: string;
  project_difficulty_level_badge: string;
  project_technology_tags: string;
  project_long_description: string;
  project_maximum_xp_assignable: number;
  project_time_estimate: number;
  project_slug: string;
  user_first_name: string;
  user_last_name: string;
  user_email: string;
  user_profile_picture_url: string;
  user_bio: string;
  user_learning_path: string;
  submission_history: {
    id: number;
    repo_url: string;
    user_note: string;
    time_spent: number;
    mentor_comment: string;
    status: string;
    created_at: string;
    mentor_in_review_at: string;
    mentor_reviewed_at: string;
  }[];
};

export type ProjectStatisticsType = {
  project: string;
  no_of_users_taking_the_project: number;
  no_of_mentor_assigned_to_the_project: number;
  no_of_users_who_have_completed_the_project: number;
  no_of_users_who_have_not_completed_the_project: number;
};

export type TierType = {
  id: number;
  name: string;
  description: string;
  badge_url: string;
  priority: string;
  needed_experience_points: number;
  created_at: string;
  updated_at: string;
  created_by: number;
  last_updated_by: number;
};

export type AllLearnersType = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  profile_picture_url: string;
  learning_path: string;
  phone_number: string;
  status: string;
  created_at: string;
};

export type SpecificLearnerType = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  profile_picture_url: string;
  gender: string;
  bio: string;
  status: string;
  learning_path: string;
  work_experiences: {
    id: number;
    company: string;
    position: string;
    start_date: string;
    end_date: string;
    description: string;
    skills: string[];
    employment_type: string;
    company_location: string;
    location_type: string;
    sector: string;
  }[];
  social_links: {
    id: number;
    platform: string;
    url: string;
  }[];
  has_completed_onboarding: boolean;
  onboarding_completed_at: string;
  is_verified: boolean;
  created_at: string;
  learning_path_details: {
    id: number;
    title: string;
    slug: string;
  };
};
