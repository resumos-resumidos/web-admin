import api from './api';

const refreshAccessToken = async () => {
};

const verifyAccessToken = async () => {
  try {
    await api.get('/auth/verify');

    return true;
  } catch (error) {
    return false;
  }
};

export {
  refreshAccessToken,
  verifyAccessToken,
};
