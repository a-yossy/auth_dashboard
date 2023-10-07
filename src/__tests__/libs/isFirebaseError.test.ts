import { AuthErrorCodes } from 'firebase/auth';
import { isFirebaseError } from 'src/libs/isFirebaseError';

describe('isFirebaseError', () => {
  it('FirebaseError の場合は true になること', () => {
    const error = {
      name: 'FirebaseError',
      code: 'auth/invalid-email',
      message: 'Firebase: Error (auth/invalid-email).',
    };
    expect(isFirebaseError(error)).toBe(true);
  });

  it('FirebaseError ではない場合は false になること', () => {
    const error = {
      name: 'FirebaseError',
      code: 'invalid-code',
      message: 'Firebase: Error (auth/invalid-code).',
    };
    expect(isFirebaseError(error)).toBe(false);
  });
});
