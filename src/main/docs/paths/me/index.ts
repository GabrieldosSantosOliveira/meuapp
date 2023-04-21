import { deleteAuthor } from './delete';
import { get } from './get';
import { put } from './put';

export const me = {
  get,
  delete: deleteAuthor,
  put: put,
};
