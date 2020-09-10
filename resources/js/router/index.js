import Vue from 'vue';
import Router from 'vue-router';

/**
 * Layzloading will create many files and slow on compiling, so best not to use lazyloading on devlopment.
 * The syntax is lazyloading, but we convert to proper require() with babel-plugin-syntax-dynamic-import
 * @see https://doc.laravue.dev/guide/advanced/lazy-loading.html
 */

Vue.use(Router);

/* Layout */
import Layout from '@/layout';

/* Router for modules */
import salonsRoutes from './modules/salons';
import notificationsRoutes from './modules/notifications';
import ratingRoutes from './modules/rating';
import usersAndRolesRoutes from './modules/users-roles';

/**
 * Sub-menu only appear when children.length>=1
 * @see https://doc.laravue.dev/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin', 'editor']   Visible for these roles only
    permissions: ['view menu zip', 'manage user'] Visible for these permissions only
    title: 'title'               the name show in sub-menu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb (default is true)
    affix: true                  if true, the tag will affix in the tags-view
  }
**/

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/AuthRedirect'),
    hidden: true,
  },
  {
    path: '/404',
    redirect: { name: 'Page404' },
    component: () => import('@/views/error-page/404'),
    hidden: true,
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true,
  },
  {
    path: '/show-salon',
    component: Layout,
    redirect: '/show-salon',
    hidden: true,
    children: [
      {
        path: '/show-salon',
        component: () => import('@/views/salons/show'),
        name: 'ShowSalon',
        meta: { title: 'salonDetails', noCache: false },
      },
    ],
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: false },
      },
    ],
  },
  {
    path: '/category-show',
    component: Layout,
    redirect: '/category-show',
    hidden: true,
    children: [
      {
        path: '/category-show/:id',
        component: () => import('@/views/categories/show'),
        name: 'Category',
        meta: { title: 'category', noCache: false },
        props: true,
      },
    ],
  },
];

export const asyncRoutes = [
  salonsRoutes,
  {
    path: '/categories-services',
    component: Layout,
    redirect: '/categories-services',
    meta: { roles: ['admin'] },
    children: [
      {
        path: '/categories-services',
        component: () => import('@/views/categories/list'),
        name: 'CategoriesServices',
        meta: { title: 'categoriesServices', icon: 'category', noCache: true },
      },
    ],
  },
  {
    path: '/app-users',
    component: Layout,
    redirect: '/app-users',
    meta: { roles: ['admin'] },
    children: [
      {
        path: '/app-users',
        component: () => import('@/views/users/index'),
        name: 'AppUsers',
        meta: { title: 'appUsers', icon: 'users', noCache: true },
      },
    ],
  },
  {
    path: '/company-types',
    component: Layout,
    redirect: '/company-types',
    meta: { roles: ['admin'] },
    children: [
      {
        path: '/company-types',
        component: () => import('@/views/company-types/list'),
        name: 'CompanyTypes',
        meta: { title: 'companyTypes', icon: 'categories', noCache: true },
      },
    ],
  },
  usersAndRolesRoutes,
  notificationsRoutes,
  ratingRoutes,
  {
    path: '/logs',
    component: Layout,
    redirect: '/logs',
    meta: { roles: ['admin'] },
    children: [
      {
        path: '/logs',
        component: () => import('@/views/logs'),
        name: 'Logs',
        meta: { title: 'logs', icon: 'logs', noCache: true },
      },
    ],
  },
  {
    path: '/transactions',
    component: Layout,
    redirect: '/transactions',
    meta: { roles: ['admin'] },
    children: [
      {
        path: '/transactions',
        component: () => import('@/views/transactions'),
        name: 'Transactions',
        meta: { title: 'transactions', icon: 'transaction', noCache: true },
      },
    ],
  },
];

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  base: process.env.MIX_LARAVUE_PATH,
  routes: constantRoutes,
});

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
