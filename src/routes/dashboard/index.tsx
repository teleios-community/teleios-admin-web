/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import DashboardLayout from '../../layout/dashboard-layout';
import { RoutePaths } from '../../routes/route-paths';
import { PrivateRoute } from '../../routes/utils';

const DashboardPage = lazy(() => import('../../pages/dashboard'));
const TeamsPage = lazy(() => import('../../pages/dashboard/teams'));
const SettingsPage = lazy(() => import('../../pages/dashboard/settings'));
const LearningPathsPage = lazy(() => import('../../pages/dashboard/learning-paths'));
const LearningPathsCoursesPage = lazy(
  () => import('../../pages/dashboard/learning-paths/courses')
);
const CoursesSectionsPage = lazy(
  () => import('../../pages/dashboard/learning-paths/courses/sections')
);
const LearningPathLessonsPage = lazy(
  () => import('../../pages/dashboard/learning-paths/courses/sections/lessons')
);
const SectionQuizzesPage = lazy(
  () => import('../../pages/dashboard/learning-paths/courses/sections/quizzes')
);
const LearnersPage = lazy(() => import('../../pages/dashboard/learners'));
const LearnerDetailsPage = lazy(() => import('../../pages/dashboard/learners/details'));
const MentorsPage = lazy(() => import('../../pages/dashboard/mentors'));
const CertificatesPage = lazy(() => import('../../pages/dashboard/certificates'));
const LeaderboardPage = lazy(() => import('../../pages/dashboard/leaderboard'));
const NotificationsPage = lazy(() => import('../../pages/dashboard/notifications'));
const ProjectsPage = lazy(() => import('../../pages/dashboard/projects'));
const ProjectMentorsPage = lazy(
  () => import('../../pages/dashboard/projects/project-mentors')
);
const ProjectSubmissionsPage = lazy(
  () => import('../../pages/dashboard/projects/project-submissions')
);
const TiersPage = lazy(() => import('../../pages/dashboard/tiers'));

const dashboardRoutes: RouteObject[] = [
  {
    path: RoutePaths.DASHBOARD,
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: RoutePaths.DASHBOARD,
        element: <DashboardPage />,
        index: true,
      },
      {
        path: RoutePaths.TEAMS,
        element: <TeamsPage />,
      },
      {
        path: RoutePaths.SETTINGS,
        element: <SettingsPage />,
      },
      {
        path: RoutePaths.LEARNING_PATHS,
        children: [
          { index: true, element: <LearningPathsPage /> },
          {
            path: `${RoutePaths.LEARNING_PATHS_COURSES}/:id`,
            element: <LearningPathsCoursesPage />,
          },
          {
            element: <CoursesSectionsPage />,
            path: `${RoutePaths.LEARNING_PATHS_SECTIONS}/:id`,
          },
          {
            element: <LearningPathLessonsPage />,
            path: `${RoutePaths.LEARNING_PATHS_LESSONS}/:courseId/:sectionId`,
          },
          {
            element: <SectionQuizzesPage />,
            path: `${RoutePaths.SECTION_QUIZZES}/:courseId/:sectionId`,
          },
        ],
      },
      {
        path: RoutePaths.LEARNERS,
        children: [
          {
            index: true,
            element: <LearnersPage />,
          },
          {
            path: `${RoutePaths.LEARNERS}/:id`,
            element: <LearnerDetailsPage />,
          },
        ],
      },
      {
        path: RoutePaths.MENTORS,
        element: <MentorsPage />,
      },
      {
        path: RoutePaths.PROJECTS,
        children: [
          { index: true, element: <ProjectsPage /> },
          {
            path: `${RoutePaths.PROJECT_MENTORS}/:id`,
            element: <ProjectMentorsPage />,
          },
          {
            path: `${RoutePaths.PROJECT_SUBMISSIONS}/:id`,
            element: <ProjectSubmissionsPage />,
          },
        ],
      },
      {
        path: RoutePaths.TIERS,
        element: <TiersPage />,
      },
      {
        path: RoutePaths.CERTIFICATES,
        element: <CertificatesPage />,
      },
      {
        path: RoutePaths.LEADERBOARD,
        element: <LeaderboardPage />,
      },
      {
        path: RoutePaths.NOTIFICATIONS,
        element: <NotificationsPage />,
      },
    ],
  },
];

export default dashboardRoutes;
