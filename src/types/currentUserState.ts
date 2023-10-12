import { CURRENT_USER_STATES } from 'src/const';

export type CurrentUserState =
  | {
      state: typeof CURRENT_USER_STATES.LOADING;
    }
  | {
      state: typeof CURRENT_USER_STATES.LOG_IN;
      data: {
        name: string;
        email: string;
      };
    }
  | {
      state: typeof CURRENT_USER_STATES.LOG_OUT;
    };
