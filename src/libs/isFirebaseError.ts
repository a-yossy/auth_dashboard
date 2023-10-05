import { FirebaseErrorSchema } from 'src/types/firebaseErrorSchema';
import { FirebaseError } from 'firebase/app';

export const isFirebaseError = (error: unknown): error is FirebaseError =>
  FirebaseErrorSchema.safeParse(error).success;
