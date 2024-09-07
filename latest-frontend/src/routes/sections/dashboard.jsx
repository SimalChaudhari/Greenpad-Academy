import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/dashboard';
import { LoadingScreen } from 'src/components/loading-screen';
import { AuthGuard } from 'src/auth/guard';

// Overview
const IndexPage = lazy(() => import('src/pages/dashboard'));
const EmployeesPage = lazy(() => import('src/pages/employees'));
const CompaniesPage = lazy(() => import('src/pages/companies'));
const CoursesPage = lazy(() => import('src/pages/courses'));
const PlansPage = lazy(() => import('src/pages/plans'));

// Error
const Page500 = lazy(() => import('src/pages/error/500'));
const Page403 = lazy(() => import('src/pages/error/403'));
const Page404 = lazy(() => import('src/pages/error/404'));

const layoutContent = (
  <DashboardLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </DashboardLayout>
);

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      { element: <IndexPage />, index: true },
    ],
  },
  {
    path: 'employees',
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      { element: <EmployeesPage />, index: true },
    ],
  },
  {
    path: 'companies',
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      { element: <CompaniesPage />, index: true },
    ],
  },
  {
    path: 'courses',
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      { element: <CoursesPage />, index: true },
    ],
  },
  {
    path: 'plans',
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      { element: <PlansPage />, index: true },
    ],
  },
  { path: '500', element: <Page500 /> },
  { path: '404', element: <Page404 /> },
  { path: '403', element: <Page403 /> },
];
