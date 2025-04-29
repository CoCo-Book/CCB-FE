// screens/LoginScreen.js
ns/LoginScreen.js
import React, { useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

// WebBrowser 세션 자동 종료 설정 (필수)
WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }) {
    // Google 로그인 훅 사용
    const [request, response, promptAsync] = Google.useAuthRequest({
      expoClientId: "100068670518-tod8qm70issgoc5p66cp52at808d1un1.apps.googleusercontent.com",
    });
  
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

      <TouchableOpacity style={styles.googleButton} onPress={() => promptAsync()}>
        <Text style={styles.googleButtonText}>구글로 로그인</Text>
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
    backgroundColor: '#91D7BE',  // 연한 민트
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  googleButton: {
    backgroundColor: '#4285F4',  // 구글 블루
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  googleButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
