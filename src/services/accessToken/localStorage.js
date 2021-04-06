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

export {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
};
