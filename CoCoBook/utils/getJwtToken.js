import { API } from '../constants';

// 실제 서버 연동이 아니라면, 개발용 토큰을 바로 반환
export const fetchJwtToken = async () => {
  try {
    const response = await fetch(`${API.BASE_URL}:8000/api/v1/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error('토큰 발급 실패');
    const data = await response.json();
    return data.token ?? data.data?.token;
  } catch (e) {
    console.error('JWT 토큰 발급 에러:', e);
    // 실패 시 개발용 토큰 반환
    return "development_token";
  }
};
