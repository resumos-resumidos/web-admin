import api from './api';

const ACCESS_TOKEN = 'accessToken';

function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN);
}

function removeAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN);
}

function setAccessToken(accessToken) {
  localStorage.setItem(ACCESS_TOKEN, accessToken);
}

async function verifyAccessToken() {
  try {
    await api.get('/auth/verify');

    return true;
  } catch (error) {
    return false;
  }
}

export {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
  verifyAccessToken,
};
