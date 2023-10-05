import { z } from 'zod';
import { FirebaseError } from 'firebase/app';
import { AuthErrorCodes } from 'src/features/users/const';

export const FirebaseErrorSchema: z.ZodType<FirebaseError> = z.object({
  code: z
    .string()
    .refine((val) =>
      Object.values(AuthErrorCodes).some((errorCode) =>
        errorCode.includes(val),
      ),
    ),
  message: z.string(),
  name: z.string(),
});
