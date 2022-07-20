export const defaultSettings: any = {
  forms: {
    login: {
      redirectDelay: 0, // delay before redirect after a successful login, while success message is shown to the user
      strategy: 'email',  // strategy id key.
      rememberMe: true,   // whether to show or not the `rememberMe` checkbox
      showMessages: {     // show/not show success/error messages
        success: true,
        error: true,
      }
    },
    register: {
      redirectDelay: 0,
      strategy: 'email',
      showMessages: {
        success: true,
        error: true,
      },
      terms: true
    },
    requestPassword: {
      redirectDelay: 0,
      strategy: 'email',
      showMessages: {
        success: true,
        error: true,
      },
    },
    resetPassword: {
      redirectDelay: 0,
      strategy: 'email',
      showMessages: {
        success: true,
        error: true,
      }
    },
    logout: {
      redirectDelay: 0,
      strategy: 'email',
    },
    validation: {
      password: {
        required: true,
        minLength: 4,
        maxLength: 50,
      },
      email: {
        required: true,
      },
      fullName: {
        required: false,
        minLength: 4,
        maxLength: 50,
      },
    },
  },
};
