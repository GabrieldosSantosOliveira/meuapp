import {
  authorSingUp,
  me,
  forgotPassword,
  category,
  authorGoogle,
  login,
  notice,
  noticeByCategory,
  oneNotice,
  refreshToken,
  resetPassword,
} from './paths/index';

export default {
  '/author': authorSingUp,
  '/me': me,
  '/author/google': authorGoogle,
  '/category': category,
  '/auth/reset-password': resetPassword,
  '/auth/forgot-password': forgotPassword,
  '/login': login,
  '/notice/category/{categoryTitle}': noticeByCategory,
  '/notice': notice,
  '/refreshToken': refreshToken,
  '/notice/{id}': oneNotice,
};
