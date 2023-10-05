import { z } from 'zod';
import { LogInForm } from 'src/features/users/types';

export const LogInSchema: z.ZodType<LogInForm> = z.object({
  email: z.string().email({ message: 'メールアドレスが不正です' }),
  password: z
    .string()
    .min(6, { message: 'パスワードは6文字以上で入力してください' }),
});
