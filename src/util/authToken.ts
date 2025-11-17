let userAccessToken: string | null = null;
let tokenPromise: Promise<string | null> | null = null;

export const setUserAccessToken = (token: string | null) => {
  userAccessToken = token;
  if (tokenPromise) {
    tokenPromise = null;
  }
};

export const getUserAccessToken = () => {
  if (userAccessToken) {
    return Promise.resolve(userAccessToken);
  } else if (!tokenPromise) {
    tokenPromise = new Promise((resolve) => {
      const interval = setInterval(() => {
        if (userAccessToken) {
          clearInterval(interval);
          resolve(userAccessToken);
        }
      }, 100);
    });
  }
  return tokenPromise;
};
