export const RoutePaths = Object.freeze({
  HOME: '/',

  // auth
  LOGIN: '/auth/login',
  FORGOT_PASSWORD: '/auth/forgot-password',
  CHECK_EMAIL: '/auth/check-email',
  RESET_PASSWORD: '/auth/reset-password',
  PASSWORD_SUCCESS: '/auth/password-success',
  ACCEPT_INVITE: '/admin/accept-invite',

  // dashboard
  DASHBOARD: '/dashboard',
  LEARNING_PATHS: '/dashboard/learning-paths',
  LEARNING_PATHS_COURSES: '/dashboard/learning-paths/courses',
  LEARNING_PATHS_SECTIONS: '/dashboard/learning-paths/sections',
  SECTION_QUIZZES: '/dashboard/learning-paths/sections/quizzes',
  LEARNING_PATHS_LESSONS: '/dashboard/learning-paths/lessons',
  LEARNERS: '/dashboard/learners',
  MENTORS: '/dashboard/mentors',
  CERTIFICATES: '/dashboard/certificates',
  LEADERBOARD: '/dashboard/leaderboard',
  TEAMS: '/dashboard/teams',
  SETTINGS: '/dashboard/settings',
  NOTIFICATIONS: '/dashboard/notifications',
  PROJECTS: '/dashboard/projects',
  PROJECT_MENTORS: '/dashboard/projects/mentors',
  PROJECT_SUBMISSIONS: '/dashboard/projects/submissions',
});
