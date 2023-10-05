import { AuthErrorCodes as AuthErrorCodesBase } from 'firebase/auth';

// auth/invalid-login-credentials が存在しないため一時的に追加する
// https://github.com/firebase/firebase-js-sdk/issues/7661
export const AuthErrorCodes = {
  ...AuthErrorCodesBase,
  INVALID_LOGIN_CREDENTIALS: 'auth/invalid-login-credentials' as const,
};
