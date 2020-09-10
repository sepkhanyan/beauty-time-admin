import Layout from '@/layout';

const ratingRoutes = {
  path: '/rating',
  component: Layout,
  redirect: '/rating',
  name: 'Rating',
  meta: {
    roles: ['admin'],
    title: 'rating',
    icon: 'review',
    // permissions: ['view menu table'],
  },
  children: [
    {
      path: '/ratings',
      component: () => import('@/views/rating'),
      name: 'rating',
      meta: { title: 'rating' },
    },
    {
      path: '/reviews',
      component: () => import('@/views/reviews'),
      name: 'Reviews',
      meta: { title: 'reviews' },
    },
  ],
};
export default ratingRoutes;
