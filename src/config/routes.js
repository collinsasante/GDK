/**
 * Route Configuration
 */

import { lazy } from 'react';

// Lazy load pages
const Home = lazy(() => import('../pages/home'));
const About = lazy(() => import('../pages/about'));
const Course = lazy(() => import('../pages/course'));
const CourseDetails = lazy(() => import('../pages/course/course-details'));
const MyLessons = lazy(() => import('../pages/my-lessons'));
const Checkout = lazy(() => import('../pages/checkout'));
const Contact = lazy(() => import('../pages/contact'));
const Login = lazy(() => import('../pages/authentication/login'));
const Signup = lazy(() => import('../pages/authentication/signup'));
const Admin = lazy(() => import('../pages/admin'));
const NotFound = lazy(() => import('../pages/404'));

export const routes = [
  {
    path: '/',
    element: Home,
    exact: true,
    protected: false,
    title: 'Home'
  },
  {
    path: '/about',
    element: About,
    protected: false,
    title: 'About Us'
  },
  {
    path: '/course',
    element: Course,
    exact: true,
    protected: false,
    title: 'Lessons'
  },
  {
    path: '/course/:id',
    element: CourseDetails,
    protected: false,
    title: 'Lesson Details'
  },
  {
    path: '/my-lessons',
    element: MyLessons,
    protected: true,
    title: 'My Lessons'
  },
  {
    path: '/checkout',
    element: Checkout,
    protected: true,
    title: 'Checkout'
  },
  {
    path: '/contact',
    element: Contact,
    protected: false,
    title: 'Contact Us'
  },
  {
    path: '/login',
    element: Login,
    protected: false,
    guestOnly: true,
    title: 'Login'
  },
  {
    path: '/signup',
    element: Signup,
    protected: false,
    guestOnly: true,
    title: 'Sign Up'
  },
  {
    path: '/admin',
    element: Admin,
    protected: true,
    adminOnly: true,
    title: 'Admin Dashboard'
  },
  {
    path: '*',
    element: NotFound,
    protected: false,
    title: 'Page Not Found'
  }
];

export default routes;
