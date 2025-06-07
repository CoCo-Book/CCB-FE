import { API } from '../constants';

export const fetchJwtToken = async () => {
  try {
    const response = await fetch(`${API.BASE_URL}:8000/api/v1/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // 필요하다면 body에 사용자 정보 등 추가
      // body: JSON.stringify({ ... })
    });
    if (!response.ok) throw new Error('토큰 발급 실패');
    const data = await response.json();
    return data.token ?? data.data?.token;
  } catch (e) {
    console.error('JWT 토큰 발급 에러:', e);
    return null;
  }
};
