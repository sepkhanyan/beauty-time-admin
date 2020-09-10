import Layout from '@/layout';

const salonsRoutes = {
  path: '/salons',
  component: Layout,
  name: 'Salons',
  redirect: '/salons',
  meta: {
    roles: ['admin'],
    title: 'salons',
    icon: 'salons',
    // permissions: ['view menu table'],
  },
  children: [
    {
      path: 'all',
      component: () => import('@/views/salons/list'),
      name: 'AllSalons',
      meta: { title: 'all' },
      props: { status: 'all' },
    },
    {
      path: 'active',
      component: () => import('@/views/salons/list'),
      name: 'ActiveSalons',
      meta: { title: 'active' },
      props: { status: 'active' },
    },
    {
      path: 'in-review',
      component: () => import('@/views/salons/list'),
      name: 'InReviewSalons',
      meta: { title: 'inReview' },
      props: { status: 'in review' },
    },
    {
      path: 'disabled',
      component: () => import('@/views/salons/list'),
      name: 'DisabledSalons',
      meta: { title: 'disabled' },
      props: { status: 'disabled' },
    },
  ],
};
export default salonsRoutes;
