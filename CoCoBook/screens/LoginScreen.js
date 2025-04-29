// screens/LoginScreen.js
import React, { useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { GOOGLE_CLIENT_ID, GOOGLE_IOS_CLIENT_ID } from '@env';
import { NAVER_CLIENT_ID } from '@env';
import { KAKAO_REST_API_KEY } from '@env'

// WebBrowser 세션 자동 종료 설정 (필수)
WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }) {
    // Google 로그인 훅 사용
    const [request, response, promptAsync] = Google.useAuthRequest({
      expoClientId: GOOGLE_CLIENT_ID,
      iosClientId: GOOGLE_IOS_CLIENT_ID,  // ✅ 추가
    });
    const state = 'RANDOM_STATE'; // 원하는 임의 문자열
    const redirectUri = 'https://test.cocobook.kr/naver/callback'; // 네이버 개발자 센터에 등록한 Callback URL
    const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}`;
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${encodeURIComponent('https://test.cocobook.kr/kakao/callback')}`;
    useEffect(() => {
      if (response?.type === 'success') {
        const { authentication } = response;
        console.log('구글 로그인 성공! 토큰:', authentication.accessToken);
        navigation.replace('UserInfo');
      }
    }, [response]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인</Text>

      <TextInput
        style={styles.input}
        placeholder="이메일 입력"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="비밀번호 입력"
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={() => navigation.replace('UserInfo')}>
        <Text style={styles.buttonText}>로그인하기</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signupButton} onPress={() => promptAsync()}>
        <Text style={styles.signupButtonText}>회원가입</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.googleButton} onPress={() => promptAsync()}>
        <Text style={styles.googleButtonText}>구글로 로그인</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.naverButton} onPress={() => WebBrowser.openBrowserAsync(naverAuthUrl)}>
        <Text style={styles.naverButtonText}>네이버로 로그인</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.kakaoButton} onPress={() => WebBrowser.openBrowserAsync(KAKAO_AUTH_URL)}>
        <Text style={styles.kakaoButtonText}>카카오로 로그인</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    alignSelf: 'center',
  },
  input: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: '#9ACA70',  // 초록
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  signupButton: {
    backgroundColor: '#E1EEBC',  // 연두
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  signupButtonText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 16,
  },
  googleButton: {
    backgroundColor: '#4285F4',  // 구글 블루
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  googleButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  naverButton: {
    backgroundColor: '#03C75A',  // 네이버 그린
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  naverButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  kakaoButton: {
    backgroundColor: '#FEE500',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  kakaoButtonText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 16,
  },
});
