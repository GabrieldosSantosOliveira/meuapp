export const refreshTokenParams = {
  type: 'object',
  properties: {
    refreshToken: {
      type: 'string',
    },
  },
  required: ['refreshToken'],
};
