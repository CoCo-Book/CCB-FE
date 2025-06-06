import { API } from '../constants';

export const fetchJwtToken = async () => {
  try {
    const response = await fetch(`${API.BASE_URL}:8000/api/test-token`);
    if (!response.ok) throw new Error('토큰 발급 실패');
    const data = await response.json();
    // 서버 응답이 { token: "..." } 형태라고 가정
    return data.token;
  } catch (e) {
    console.error('JWT 토큰 발급 에러:', e);
    return null;
  }
};
