import { LANG_EN } from "@/locale/strings";
import { string } from "yup";
import * as yup from "yup";

export const registerValidationSchema = (dic: typeof LANG_EN) => {
  return yup.object({
    userName: string()
      .required(dic.VAL_ERR_USERNAME_REQUIRED)
      .min(8, dic.VAL_ERR_USER_MIN)
      .max(16, dic.VAL_ERR_USER_MAX)
      .matches(/^[a-zA-Z0-9._-]+$/, dic.VAL_ERR_USERNAME_INVALID_CHARS),

    password: string()
      .min(8, dic.VAL_ERR_PASSWORD_MIN)
      .max(16, dic.VAL_ERR_PASSWORD_MAX)
      .matches(/^[\x20-\x7E]+$/, dic.VAL_ERR_PASSWORD_ONLY_KEYBOARD)
      .required(dic.VAL_ERR_PASSWORD_REQUIRED),

    firstName: string()
      .matches(/^[a-zA-Z]+$/, dic.VAL_ERR_FIRST_NAME_INVALID)
      .required(dic.VAL_ERR_FIRST_NAME_INVALID),

    lastName: string()
      .matches(/^[a-zA-Z]+$/, dic.VAL_ERR_LAST_NAME_INVALID)
      .required(dic.VAL_ERR_LAST_NAME_INVALID),
  });
};

export const loginValidationSchema = (dic: typeof LANG_EN) => {
  return yup.object({
    userName: string()
      .required(dic.VAL_ERR_USERNAME_REQUIRED)
      .min(8, dic.VAL_ERR_USER_MIN)
      .max(16, dic.VAL_ERR_USER_MAX)
      .matches(/^[a-zA-Z0-9._-]+$/, dic.VAL_ERR_USERNAME_INVALID_CHARS),

    password: string()
      .min(8, dic.VAL_ERR_PASSWORD_MIN)
      .max(16, dic.VAL_ERR_PASSWORD_MAX)
      .matches(/^[\x20-\x7E]+$/, dic.VAL_ERR_PASSWORD_ONLY_KEYBOARD)
      .required(dic.VAL_ERR_PASSWORD_REQUIRED),
  });
};
