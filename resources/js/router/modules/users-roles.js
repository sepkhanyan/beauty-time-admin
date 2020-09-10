import Layout from '@/layout';

const usersAndRolesRoutes = {
  path: '/users-roles',
  component: Layout,
  redirect: '/users-roles',
  meta: {
    roles: ['admin'],
    title: 'usersAndRoles',
    icon: 'user-permission',
  },
  children: [
    {
      path: '/users',
      component: () => import('@/views/users/index'),
      name: 'Users',
      meta: { title: 'users' },
    },
    {
      path: '/roles-permissions',
      component: () => import('@/views/role-permission/List'),
      name: 'RolePermissions',
      meta: { title: 'rolePermission' },
    },
  ],
};
export default usersAndRolesRoutes;
