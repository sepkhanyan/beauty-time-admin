import Layout from '@/layout';

const notificationsRoutes = {
  path: '/notifications',
  component: Layout,
  redirect: '/notifications',
  name: 'Notifications',
  meta: {
    roles: ['admin'],
    title: 'notifications',
    icon: 'notifications',
    // permissions: ['view menu table'],
  },
  children: [
    {
      path: '/salon-admins',
      component: () => import('@/views/notifications'),
      name: 'ToSalonAdmins',
      meta: { title: 'salonAdmins' },
    },
    {
      path: '/to-app-users',
      component: () => import('@/views/notifications'),
      name: 'ToAppUsers',
      meta: { title: 'toAppUsers' },
    },
  ],
};
export default notificationsRoutes;
