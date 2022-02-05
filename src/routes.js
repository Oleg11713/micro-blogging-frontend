import MyProfilePage from './pages/myProfilePage';
import AuthPage from './pages/authPage';
import UserProfilePage from './pages/userProfilePage';
import MainPage from './pages/mainPage';
import UsersPage from './pages/usersPage';
import PostPage from './pages/postPage';
import {
  LOGIN_ROUTE,
  MAIN_PAGE_ROUTE,
  MY_PROFILE_ROUTE,
  POST_ROUTE,
  REGISTRATION_ROUTE,
  USER_PROFILE_ROUTE,
  USERS_ROUTE,
} from './utils/constsRoutes';

export const authRoutes = [
  {
    path: MY_PROFILE_ROUTE,
    Component: MyProfilePage,
  },
  {
    path: `${USER_PROFILE_ROUTE}/:id`,
    Component: UserProfilePage,
  },
];

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: AuthPage,
  },
  {
    path: USERS_ROUTE,
    Component: UsersPage,
  },
  {
    path: MAIN_PAGE_ROUTE,
    Component: MainPage,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: AuthPage,
  },
  {
    path: `${POST_ROUTE}/:id`,
    Component: PostPage,
  },
];
