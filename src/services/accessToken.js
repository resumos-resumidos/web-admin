import api from './api';

const ACCESS_TOKEN = 'accessToken';

const getAccessToken = () => (
  localStorage.getItem(ACCESS_TOKEN)
);

const removeAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN);
};

const setAccessToken = (accessToken) => {
  localStorage.setItem(ACCESS_TOKEN, accessToken);
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
  getAccessToken,
  removeAccessToken,
  setAccessToken,
  verifyAccessToken,
};
