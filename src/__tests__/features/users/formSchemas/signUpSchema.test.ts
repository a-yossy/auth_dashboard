import { SignUpSchema } from 'src/features/users/formSchemas/signUpSchema';

describe('signUpSchema', () => {
  const validSignUpData = {
    name: '山田 太郎',
    email: 'email@example.com',
    password: 'password',
    password_confirmation: 'password',
  };

  it('パスワードと確認用パスワードが一致している場合は validation に成功すること', () => {
    expect(SignUpSchema.safeParse(validSignUpData).success).toBe(true);
  });

  it('パスワードと確認用パスワードが一致していない場合は validation に失敗すること', () => {
    const result = SignUpSchema.safeParse({
      ...validSignUpData,
      password_confirmation: 'invalid_password',
    });

    expect(result.success).toBe(false);
    // result.success が false の場合のみ result.error が存在し、型エラーになるため記述
    if (result.success) return;
    expect(result.error.issues.length).toBe(1);
    expect(result.error.issues[0].message).toBe(
      'パスワードと確認用パスワードが一致しません',
    );
    expect(result.error.issues[0].path).toEqual(['password_confirmation']);
  });
});
