import api from '../api';

async function verifyAccessToken() {
  try {
    await api.get('/auth/verify');

    return true;
  } catch (error) {
    return false;
  }
}

export default verifyAccessToken;
