import {
  MAIN_PAGE_ROUTE,
  MY_PROFILE_ROUTE,
  USERS_ROUTE,
} from '../../utils/constsRoutes';
import {
  MAIN_PAGE_TITLE,
  MY_PROFILE_TITLE,
  USERS_TITLE,
} from '../../utils/constsTitles';

export const publicLinks = [
  {
    path: MAIN_PAGE_ROUTE,
    title: MAIN_PAGE_TITLE,
  },
  {
    path: USERS_ROUTE,
    title: USERS_TITLE,
  },
];

export const authLinks = [
  {
    path: MY_PROFILE_ROUTE,
    title: MY_PROFILE_TITLE,
  },
];
