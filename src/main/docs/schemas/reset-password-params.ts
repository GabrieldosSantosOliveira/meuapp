export const resetPasswordParams = {
  type: 'object',
  properties: {
    resetPasswordToken: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    passwordReset: {
      type: 'string',
    },
  },
  required: ['resetPasswordToken', 'email', 'passwordReset'],
};
