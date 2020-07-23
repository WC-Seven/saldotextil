import { read } from './announcement/read';
import { create } from './announcement/create';
import { update } from './announcement/update';
import { destroy } from './announcement/destroy';
import { find } from './announcement/search';

import { destroyUser } from './user/destroy';
import { detailUser } from './user/detail';
import { updateUser } from './user/update';
import { updateImage } from './user/updateImage';
import { updatePassword } from './user/updatePassword';

import { tryLogin } from './auth/login';
import { tryRegister } from './auth/register';
import { sendResetEmail } from './auth/sendResetEmail';

export const announcement = {
  read, create, update, destroy, find
};

export const user = {
  destroy: destroyUser,
  detail: detailUser,
  update: updateUser,
  updateImage,
  updatePassword,
};

export const auth = {
  login: tryLogin,
  register: tryRegister,
  sendResetEmail
};
