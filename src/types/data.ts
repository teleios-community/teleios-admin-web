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
