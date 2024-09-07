import { paths } from 'src/routes/paths';
import { CONFIG } from 'src/config-global';
import { SvgColor } from 'src/components/svg-color';

const icon = (name) => <SvgColor src={`${CONFIG.site.basePath}/assets/icons/navbar/${name}.svg`} />;

const ICONS = {
  dashboard: icon('ic-dashboard'),
  employees: icon('ic-user'),
  companies: icon('ic-menu-item'),
  courses: icon('ic-course'),
  plans: icon('ic-blog'),
  settings: icon('ic-lock'),
};

export const navData = [
  /**
   * Overview
   */
  {
    subheader: 'Overview',
    items: [
      { title: 'Dashbord', path: paths.dashboard.root, icon: ICONS.dashboard },
      { title: 'Employees', path: paths.employees.root, icon: ICONS.employees },
      { title: 'Companies', path: paths.companies.root, icon: ICONS.companies },
      { title: 'Courses', path: paths.courses.root, icon: ICONS.courses },
      { title: 'Plans', path: paths.plans.root, icon: ICONS.plans },
      { title: 'Settings', path: paths.settings, icon: ICONS.settings },
    ],
  },
];
